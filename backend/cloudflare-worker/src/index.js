const BASE_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer'
};

export default {
  async fetch(request, env) {
    const allowedOrigins = parseAllowedOrigins(env.ALLOWED_ORIGINS || env.ALLOWED_ORIGIN || '');
    const origin = request.headers.get('Origin') || '';
    const cors = getCorsHeaders(origin, allowedOrigins);
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      if (!cors) return json({ error: 'Forbidden origin.' }, 403);
      return new Response(null, { status: 204, headers: { ...BASE_HEADERS, ...cors } });
    }

    if (!cors) return json({ error: 'Forbidden origin.' }, 403);
    if (url.pathname !== '/api/messages') return json({ error: 'Not found.' }, 404, cors);
    if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405, cors);

    if (!env.TURNSTILE_SECRET_KEY || !env.IP_HASH_SALT || !env.RATE_LIMIT_KV || !env.DB) {
      return json({ error: 'Service misconfigured.' }, 500, cors);
    }

    let payload;
    try {
      payload = await request.json();
    } catch (err) {
      return json({ error: 'Invalid JSON payload.' }, 400, cors);
    }

    const name = sanitizeText(payload.name, 40);
    const email = sanitizeText(payload.email, 120);
    const content = sanitizeText(payload.content, 1000);
    const website = sanitizeText(payload.website, 200);
    const captchaToken = sanitizeText(payload.captchaToken, 4096);
    const userAgent = sanitizeText(request.headers.get('User-Agent') || '', 256);
    const clientIp = request.headers.get('CF-Connecting-IP') || '';

    if (website) {
      return json({ ok: true }, 200, cors);
    }
    if (!name || !content) {
      return json({ error: 'Name and content are required.' }, 400, cors);
    }
    if (email && !isValidEmail(email)) {
      return json({ error: 'Invalid email format.' }, 400, cors);
    }
    if (!captchaToken) {
      return json({ error: 'Captcha token is required.' }, 400, cors);
    }

    const captchaValid = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, captchaToken, clientIp);
    if (!captchaValid) {
      return json({ error: 'Captcha verification failed.' }, 400, cors);
    }

    const ipHash = await hashSha256Hex(clientIp + '|' + env.IP_HASH_SALT);
    const limit = parsePositiveInt(env.RATE_LIMIT_MAX, 5);
    const windowSec = parsePositiveInt(env.RATE_LIMIT_WINDOW_SEC, 600);
    const isLimited = await isRateLimited(env.RATE_LIMIT_KV, ipHash, limit, windowSec);
    if (isLimited) {
      return json({ error: 'Too many requests. Please try again later.' }, 429, cors);
    }

    try {
      await env.DB.prepare(
        'INSERT INTO messages (name, email, content, created_at, ip_hash, user_agent) VALUES (?1, ?2, ?3, ?4, ?5, ?6)'
      )
        .bind(name, email || null, content, new Date().toISOString(), ipHash, userAgent || null)
        .run();
    } catch (err) {
      return json({ error: 'Failed to store message.' }, 500, cors);
    }

    return json({ ok: true }, 201, cors);
  }
};

function parseAllowedOrigins(raw) {
  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function getCorsHeaders(origin, allowedOrigins) {
  if (!origin || !allowedOrigins.includes(origin)) return null;
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin'
  };
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...BASE_HEADERS, ...extraHeaders }
  });
}

function sanitizeText(input, maxLen) {
  const clean = String(input || '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .trim();
  return clean.slice(0, maxLen);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parsePositiveInt(value, fallbackValue) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallbackValue;
}

async function verifyTurnstile(secret, responseToken, remoteIp) {
  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', responseToken);
  if (remoteIp) body.set('remoteip', remoteIp);

  const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body
  });
  if (!resp.ok) return false;
  const data = await resp.json();
  return !!(data && data.success === true);
}

async function hashSha256Hex(input) {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  const arr = Array.from(new Uint8Array(digest));
  return arr.map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function isRateLimited(kv, ipHash, maxRequests, windowSec) {
  const bucket = Math.floor(Date.now() / 1000 / windowSec);
  const key = 'rate:' + ipHash + ':' + bucket;
  const current = Number.parseInt((await kv.get(key)) || '0', 10) || 0;
  const next = current + 1;
  await kv.put(key, String(next), { expirationTtl: windowSec + 60 });
  return next > maxRequests;
}
