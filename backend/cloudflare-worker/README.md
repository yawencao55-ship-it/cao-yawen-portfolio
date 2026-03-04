# Cloudflare Worker Message API

This backend is for a GitHub Pages frontend. It provides:
- CAPTCHA validation (Cloudflare Turnstile)
- IP-based rate limiting (Cloudflare KV)
- Message persistence (Cloudflare D1)

## 1) Create Cloudflare resources

1. Create a Turnstile site + secret key.
2. Create a D1 database:
   - `wrangler d1 create portfolio_messages`
3. Create a KV namespace:
   - `wrangler kv namespace create RATE_LIMIT_KV`

## 2) Configure Worker

1. Copy `wrangler.toml.example` to `wrangler.toml`.
2. Fill:
   - `database_id`
   - KV namespace id
   - `ALLOWED_ORIGINS` (your GitHub Pages domain; comma-separate if multiple)
3. Set secrets:
   - `wrangler secret put TURNSTILE_SECRET_KEY`
   - `wrangler secret put IP_HASH_SALT`
4. Local debug (optional):
   - Copy `.dev.vars.example` to `.dev.vars` and fill values.

## 3) Initialize database

Run:
- `wrangler d1 execute portfolio_messages --file=./schema.sql`

## 4) Deploy Worker

Run:
- `wrangler deploy`

After deploy, your API endpoint is:
- `https://<worker-name>.<subdomain>.workers.dev/api/messages`

## 5) Connect frontend

Update the `<body>` attributes in `index.html`:
- `data-api-base="https://<worker-url>"`
- `data-turnstile-sitekey="<your-turnstile-site-key>"`

If you use a custom Worker domain (not `workers.dev`), update CSP `connect-src` in `index.html`.
