// ===== Season Config =====
var SEASONS = {
  spring: {
    months: [3, 4, 5],
    icon: '\uD83C\uDF38',
    poems: ['\u7B49\u95F2\u8BC6\u5F97\u4E1C\u98CE\u9762\uFF0C\u4E07\u7D2B\u5343\u7EA2\u603B\u662F\u6625', '\u6625\u6C34\u521D\u751F\uFF0C\u6625\u6797\u521D\u76DB\uFF0C\u6625\u98CE\u5341\u91CC', '\u4EBA\u95F4\u56DB\u6708\u82B3\u83F2\u5C3D\uFF0C\u5C71\u5BFA\u6843\u82B1\u59CB\u76DB\u5F00'],
    particles: { color: '#f8c8d4', shape: 'petal' }
  },
  summer: {
    months: [6, 7, 8],
    icon: '\uD83C\uDF3B',
    poems: ['\u63A5\u5929\u83B2\u53F6\u65E0\u7A77\u78A7\uFF0C\u6620\u65E5\u8377\u82B1\u522B\u6837\u7EA2', '\u6C34\u6676\u5E18\u52A8\u5FAE\u98CE\u8D77\uFF0C\u6EE1\u67B6\u8514\u8587\u4E00\u9662\u9999', '\u7EFF\u6811\u9634\u6D53\u590F\u65E5\u957F\uFF0C\u697C\u53F0\u5012\u5F71\u5165\u6C60\u5858'],
    particles: { color: '#bdd4e7', shape: 'circle' }
  },
  autumn: {
    months: [9, 10, 11],
    icon: '\uD83C\uDF41',
    poems: ['\u505C\u8F66\u5750\u7231\u67AB\u6797\u665A\uFF0C\u971C\u53F6\u7EA2\u4E8E\u4E8C\u6708\u82B1', '\u81EA\u53E4\u9022\u79CB\u60B2\u5BC2\u5BDE\uFF0C\u6211\u8A00\u79CB\u65E5\u80DC\u6625\u671D', '\u7A7A\u5C71\u65B0\u96E8\u540E\uFF0C\u5929\u6C14\u665A\u6765\u79CB'],
    particles: { color: '#f5cba7', shape: 'leaf' }
  },
  winter: {
    months: [12, 1, 2],
    icon: '\u2744\uFE0F',
    poems: ['\u5FFD\u5982\u4E00\u591C\u6625\u98CE\u6765\uFF0C\u5343\u6811\u4E07\u6811\u68A8\u82B1\u5F00', '\u6674\u7A7A\u4E00\u9E64\u6392\u4E91\u4E0A\uFF0C\u4FBF\u5F15\u8BD7\u60C5\u5230\u78A7\u9704', '\u5B64\u821F\u84D1\u7B20\u7FC1\uFF0C\u72EC\u9493\u5BD2\u6C5F\u96EA'],
    particles: { color: '#d4d4e8', shape: 'snow' }
  }
};

function getBeijingDate() {
  var now = new Date();
  var utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 8 * 3600000);
}

function getCurrentSeason() {
  var m = getBeijingDate().getMonth() + 1;
  if (m >= 3 && m <= 5) return 'spring';
  if (m >= 6 && m <= 8) return 'summer';
  if (m >= 9 && m <= 11) return 'autumn';
  return 'winter';
}

// ===== Lunar Festival Lookup Table (2024-2036) =====
// chunJie: 春节法定假期 [startMonth, startDay, endMonth, endDay]
// huaZhao: 花朝节 [month, day]（前后1天）
// duanWu: 端午法定假期 [startMonth, startDay, endMonth, endDay]
// zhongQiu: 中秋法定假期 [startMonth, startDay, endMonth, endDay]
var LUNAR_FESTIVALS = {
  2024: { chunJie: [2,10,2,17],  huaZhao: [3,11],  duanWu: [6,8,6,10],   zhongQiu: [9,15,9,17] },
  2025: { chunJie: [1,28,2,4],   huaZhao: [2,27],  duanWu: [5,31,6,2],   zhongQiu: [10,4,10,8] },
  2026: { chunJie: [2,15,2,21],  huaZhao: [3,18],  duanWu: [6,19,6,21],  zhongQiu: [9,25,9,27] },
  2027: { chunJie: [2,5,2,11],   huaZhao: [3,8],   duanWu: [6,9,6,11],   zhongQiu: [9,15,9,17] },
  2028: { chunJie: [1,25,1,31],  huaZhao: [2,24],  duanWu: [5,28,5,30],  zhongQiu: [10,1,10,4] },
  2029: { chunJie: [2,12,2,18],  huaZhao: [3,14],  duanWu: [6,16,6,18],  zhongQiu: [9,22,9,24] },
  2030: { chunJie: [2,2,2,8],    huaZhao: [3,4],   duanWu: [6,5,6,7],    zhongQiu: [9,12,9,14] },
  2031: { chunJie: [1,22,1,28],  huaZhao: [2,21],  duanWu: [5,26,5,28],  zhongQiu: [10,1,10,3] },
  2032: { chunJie: [2,10,2,16],  huaZhao: [3,11],  duanWu: [6,13,6,15],  zhongQiu: [9,19,9,21] },
  2033: { chunJie: [1,30,2,5],   huaZhao: [3,1],   duanWu: [6,3,6,5],    zhongQiu: [9,8,9,10] },
  2034: { chunJie: [2,18,2,24],  huaZhao: [3,20],  duanWu: [6,22,6,24],  zhongQiu: [9,27,9,29] },
  2035: { chunJie: [2,7,2,13],   huaZhao: [3,9],   duanWu: [6,11,6,13],  zhongQiu: [9,16,9,18] },
  2036: { chunJie: [1,27,2,2],   huaZhao: [2,26],  duanWu: [5,31,6,2],   zhongQiu: [10,4,10,6] }
};

function isDateInRange(beijing, startMonth, startDay, endMonth, endDay) {
  var y = beijing.getFullYear();
  var start = new Date(y, startMonth - 1, startDay);
  var end = new Date(y, endMonth - 1, endDay, 23, 59, 59);
  return beijing >= start && beijing <= end;
}

function isDateNear(beijing, targetMonth, targetDay, rangeDays) {
  var target = new Date(beijing.getFullYear(), targetMonth - 1, targetDay);
  var diff = Math.abs(beijing.getTime() - target.getTime()) / 86400000;
  return diff <= rangeDays;
}

function getTreeImage() {
  var bj = getBeijingDate();
  var m = bj.getMonth() + 1;
  var d = bj.getDate();
  var y = bj.getFullYear();

  // 生日优先：8月11日（前后1天）
  if (m === 8 && d >= 10 && d <= 12) return 'images/tree-birthday.png';

  // 圣诞节：12月24-26日
  if (m === 12 && d >= 24 && d <= 26) return 'images/tree-christmas.png';

  // 农历节日
  var lunar = LUNAR_FESTIVALS[y];
  if (lunar) {
    // 春节（法定7-8天假期）
    if (isDateInRange(bj, lunar.chunJie[0], lunar.chunJie[1], lunar.chunJie[2], lunar.chunJie[3])) return 'images/tree-chunjie.png';
    // 端午节（法定3天假期）
    if (isDateInRange(bj, lunar.duanWu[0], lunar.duanWu[1], lunar.duanWu[2], lunar.duanWu[3])) return 'images/tree-duanwu.png';
    // 中秋节（法定3天假期）
    if (isDateInRange(bj, lunar.zhongQiu[0], lunar.zhongQiu[1], lunar.zhongQiu[2], lunar.zhongQiu[3])) return 'images/tree-zhongqiu.png';
    // 花朝节（前后1天）
    if (isDateNear(bj, lunar.huaZhao[0], lunar.huaZhao[1], 1)) return 'images/tree-huazhao.png';
  }

  // 默认：按季节
  var season = getCurrentSeason();
  return 'images/tree-' + season + '.png';
}

function initTreeImages() {
  var src = getTreeImage();
  var landing = document.getElementById('landingTree');
  var hero = document.getElementById('heroTree');
  if (landing) landing.src = src;
  if (hero) hero.src = src;
}

// ===== 调试：在浏览器控制台输入 previewTree('2025-01-29') 可预览指定日期的树 =====
function previewTree(dateStr) {
  var parts = dateStr.split('-');
  var fakeDate = new Date(+parts[0], +parts[1] - 1, +parts[2], 12, 0, 0);
  // 临时替换 getBeijingDate
  var origFn = window.getBeijingDate;
  window.getBeijingDate = function() { return fakeDate; };
  var src = getTreeImage();
  window.getBeijingDate = origFn;
  // 更新页面上的树
  var landing = document.getElementById('landingTree');
  var hero = document.getElementById('heroTree');
  if (landing) landing.src = src;
  if (hero) hero.src = src;
  console.log('预览日期: ' + dateStr + ' → ' + src);
  return src;
}

// ===== Initialize =====
var currentSeason, seasonConfig;
var lightboxImages = [];
var lightboxIndex = 0;
var MESSAGE_API_TIMEOUT_MS = 12000;
var APP_CONFIG = {
  apiBase: '',
  turnstileSiteKey: ''
};
var turnstileWidgetId = null;

function readAppConfig() {
  var body = document.body;
  APP_CONFIG.apiBase = ((body.getAttribute('data-api-base') || '').trim()).replace(/\/+$/, '');
  APP_CONFIG.turnstileSiteKey = (body.getAttribute('data-turnstile-sitekey') || '').trim();
}

function bindUiEvents() {
  var enterBtn = document.getElementById('enterBtn');
  if (enterBtn) enterBtn.addEventListener('click', enterSite);

  var navToggle = document.querySelector('.nav-toggle');
  if (navToggle) navToggle.addEventListener('click', toggleMenu);

  var backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) backToTopBtn.addEventListener('click', scrollToTop);

  var messageBtn = document.querySelector('.contact-msg-btn');
  if (messageBtn) messageBtn.addEventListener('click', openMessageModal);

  var lightbox = document.getElementById('lightbox');
  if (lightbox) lightbox.addEventListener('click', closeLightbox);

  var lightboxClose = document.querySelector('.lightbox-close');
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  var lightboxPrev = document.querySelector('.lightbox-prev');
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

  var lightboxNext = document.querySelector('.lightbox-next');
  if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

  var messageModal = document.getElementById('messageModal');
  if (messageModal) messageModal.addEventListener('click', closeMessageModal);

  var messageModalContent = document.querySelector('.message-modal-content');
  if (messageModalContent) {
    messageModalContent.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  var messageModalClose = document.querySelector('.message-modal-close');
  if (messageModalClose) messageModalClose.addEventListener('click', closeMessageModal);

  var messageForm = document.getElementById('messageForm');
  if (messageForm) messageForm.addEventListener('submit', submitMessage);

  document.querySelectorAll('.work-card-img img, .work-thumbs img').forEach(function(img) {
    img.addEventListener('click', function() {
      openLightbox(img);
    });
  });

  document.querySelectorAll('.contact-card').forEach(function(card) {
    card.addEventListener('mouseenter', function() { card.classList.add('hovered'); });
    card.addEventListener('mouseleave', function() { card.classList.remove('hovered'); });
    card.addEventListener('focusin', function() { card.classList.add('hovered'); });
    card.addEventListener('focusout', function() { card.classList.remove('hovered'); });
  });
}

function init() {
  currentSeason = getCurrentSeason();
  seasonConfig = SEASONS[currentSeason];
  document.body.className = currentSeason;
  readAppConfig();

  var iconEl = document.getElementById('seasonIcon');
  if (iconEl) iconEl.textContent = seasonConfig.icon;
  updateTime();
  setInterval(updateTime, 60000);

  initParticles();
  initTreeImages();
  bindUiEvents();
  initScrollAnimations();
  initNavHighlight();
  initFilterButtons();
  initBackToTop();
  typePoem();
  setFooterQuote();
  collectLightboxImages();
}

function updateTime() {
  var now = new Date();
  var h = now.getHours().toString().padStart(2, '0');
  var m = now.getMinutes().toString().padStart(2, '0');
  var el = document.getElementById('seasonTime');
  if (el) el.textContent = h + ':' + m;
}

document.addEventListener('DOMContentLoaded', init);


// ===== Landing Page =====
function enterSite() {
  var landing = document.getElementById('landing');
  landing.classList.add('hide');
  var main = document.getElementById('mainSite');
  main.style.display = 'block';
  setTimeout(function() {
    main.style.opacity = '1';
    main.style.transition = 'opacity 0.8s ease';
    // Re-init scroll animations after main site is visible
    initScrollAnimations();
  }, 50);
  setTimeout(function() {
    landing.style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 800);
}

// Landing canvas - interactive watercolor particles
(function() {
  var canvas = document.getElementById('landingCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var mouseX = -1000, mouseY = -1000;

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  // Mouse tracking on the landing page
  var landing = document.getElementById('landing');
  if (landing) {
    landing.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    landing.addEventListener('mouseleave', function() {
      mouseX = -1000; mouseY = -1000;
    });
    canvas.style.pointerEvents = 'none';
  }

  var colors = [
    'rgba(248,200,212,0.35)', 'rgba(200,230,192,0.3)', 'rgba(189,212,231,0.3)',
    'rgba(245,203,167,0.25)', 'rgba(168,213,162,0.3)', 'rgba(232,160,191,0.25)',
    'rgba(200,200,232,0.2)', 'rgba(248,180,200,0.3)'
  ];
  var particles = [];
  var count = 60;

  for (var i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * (canvas.width || 1200),
      y: Math.random() * (canvas.height || 800),
      r: 8 + Math.random() * 18,
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6,
      color: colors[i % colors.length],
      baseR: 8 + Math.random() * 18
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connecting lines between nearby particles
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.strokeStyle = 'rgba(200,168,130,' + (0.06 * (1 - dist / 120)) + ')';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    particles.forEach(function(p) {
      // Mouse interaction - push particles away
      var mdx = p.x - mouseX;
      var mdy = p.y - mouseY;
      var mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mDist < 150 && mDist > 0) {
        var force = (150 - mDist) / 150 * 2;
        p.dx += (mdx / mDist) * force * 0.3;
        p.dy += (mdy / mDist) * force * 0.3;
        p.r = p.baseR * (1 + (150 - mDist) / 150 * 0.5);
      } else {
        p.r += (p.baseR - p.r) * 0.05;
      }

      // Dampen velocity
      p.dx *= 0.98;
      p.dy *= 0.98;

      // Add slight drift
      p.dx += (Math.random() - 0.5) * 0.05;
      p.dy += (Math.random() - 0.5) * 0.05;

      p.x += p.dx;
      p.y += p.dy;

      // Bounce off edges
      if (p.x < -p.r) p.x = canvas.width + p.r;
      if (p.x > canvas.width + p.r) p.x = -p.r;
      if (p.y < -p.r) p.y = canvas.height + p.r;
      if (p.y > canvas.height + p.r) p.y = -p.r;

      // Draw particle with glow
      var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, p.color);
      g.addColorStop(0.7, p.color.replace(/[\d.]+\)$/, '0.1)'));
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ===== Particle System =====
function initParticles() {
  var canvas = document.getElementById('particles');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  var particles = [];
  var count = Math.min(50, Math.floor(window.innerWidth / 25));

  for (var i = 0; i < count; i++) {
    particles.push(createParticle());
  }

  function createParticle() {
    var cfg = seasonConfig.particles;
    var particleColors = {
      petal: ['#f8c8d4', '#f0b8c8', '#e8a0bf', '#f5d5e0', '#fce4ec'],
      leaf: ['#f5cba7', '#e8a87c', '#d4905c', '#c0392b', '#e67e22'],
      snow: ['#ffffff', '#e8e8f5', '#d4d4e8', '#ecf0f1', '#dfe6e9'],
      circle: ['#bdd4e7', '#a0c4d8', '#88b8d0', '#c8e6c0', '#fdcb6e']
    };
    var cols = particleColors[cfg.shape] || particleColors.petal;
    return {
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height,
      size: 6 + Math.random() * 12,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: 0.4 + Math.random() * 1.0,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 3,
      opacity: 0.25 + Math.random() * 0.45,
      shape: cfg.shape,
      color: cols[Math.floor(Math.random() * cols.length)]
    };
  }

  function drawParticle(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation * Math.PI / 180);
    ctx.globalAlpha = p.opacity;

    if (p.shape === 'petal') {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.shape === 'leaf') {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.quadraticCurveTo(p.size, 0, 0, p.size);
      ctx.quadraticCurveTo(-p.size, 0, 0, -p.size);
      ctx.fill();
    } else if (p.shape === 'snow') {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function(p) {
      p.x += p.speedX + Math.sin(p.y * 0.008 + p.rotation * 0.01) * 0.4;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;
      if (p.y > canvas.height + 30) { p.y = -20; p.x = Math.random() * canvas.width; }
      if (p.x < -30) p.x = canvas.width + 30;
      if (p.x > canvas.width + 30) p.x = -30;
      drawParticle(p);
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// ===== Scroll Animations =====
function initScrollAnimations() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate numbers
        var nums = entry.target.querySelectorAll('.highlight-number');
        nums.forEach(function(el) {
          animateNumber(el);
        });
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px 0px 0px' });

  document.querySelectorAll('[data-aos], .skill-card, .intern-card, .timeline-item, .contact-card, .about-section, .highlight-item').forEach(function(el) {
    observer.observe(el);
  });

  // Fallback: force visible for elements already in viewport
  setTimeout(function() {
    document.querySelectorAll('.intern-card, .skill-card, .timeline-item, .contact-card, .about-section, .highlight-item').forEach(function(el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
        var nums = el.querySelectorAll('.highlight-number');
        nums.forEach(function(n) { animateNumber(n); });
      }
    });
  }, 1000);
}

function animateNumber(el) {
  if (el.dataset.animated) return;
  var target = parseFloat(el.getAttribute('data-target'));
  if (isNaN(target) || target === 0) return;
  el.dataset.animated = '1';
  var isFloat = target % 1 !== 0;
  var duration = 1500;
  var start = performance.now();

  function update(now) {
    var elapsed = now - start;
    var progress = Math.min(elapsed / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = eased * target;
    el.textContent = isFloat ? current.toFixed(2) : Math.floor(current);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ===== Nav Highlight =====
function initNavHighlight() {
  var sections = document.querySelectorAll('.section');
  var navLinks = document.querySelectorAll('.nav-links a');
  var navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function() {
    var scrollY = window.scrollY;

    // Navbar shadow
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active section
    var current = '';
    sections.forEach(function(section) {
      var top = section.offsetTop - 100;
      if (scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// ===== Mobile Menu =====
function toggleMenu() {
  var links = document.getElementById('navLinks');
  var toggle = document.querySelector('.nav-toggle');
  if (!links || !toggle) return;
  links.classList.toggle('open');
  toggle.classList.toggle('open');
}

// ===== Filter Buttons =====
function initFilterButtons() {
  var btns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.work-card');

  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      btns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');
      cards.forEach(function(card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s ease both';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ===== Back to Top =====
function initBackToTop() {
  var btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Poem Typewriter =====
function typePoem() {
  var el = document.getElementById('heroPoemLine');
  if (!el) return;
  var poems = seasonConfig.poems;
  var poem = poems[Math.floor(Math.random() * poems.length)];
  var i = 0;

  function type() {
    if (i <= poem.length) {
      el.textContent = poem.substring(0, i);
      i++;
      setTimeout(type, 120);
    }
  }
  type();
}

// ===== Footer Quote =====
function setFooterQuote() {
  var el = document.getElementById('footerQuote');
  if (!el) return;
  var poems = seasonConfig.poems;
  el.textContent = poems[Math.floor(Math.random() * poems.length)];
}

// ===== Lightbox =====
function collectLightboxImages() {
  lightboxImages = [];
  document.querySelectorAll('.work-card-img img, .work-thumbs img').forEach(function(img) {
    lightboxImages.push(img.src);
  });
}

function openLightbox(imgEl) {
  if (!imgEl) return;
  var src = imgEl.src;
  lightboxIndex = lightboxImages.indexOf(src);
  if (lightboxIndex === -1) lightboxIndex = 0;
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightboxImg');
  if (!lb || !lbImg) return;
  lbImg.src = src;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  var lbImg = document.getElementById('lightboxImg');
  if (e && e.target === lbImg) return;
  var lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function prevImage(e) {
  if (e) e.stopPropagation();
  if (!lightboxImages.length) return;
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  var lbImg = document.getElementById('lightboxImg');
  if (lbImg) lbImg.src = lightboxImages[lightboxIndex];
}

function nextImage(e) {
  if (e) e.stopPropagation();
  if (!lightboxImages.length) return;
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  var lbImg = document.getElementById('lightboxImg');
  if (lbImg) lbImg.src = lightboxImages[lightboxIndex];
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
  var lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox(e);
  if (e.key === 'ArrowLeft') prevImage(e);
  if (e.key === 'ArrowRight') nextImage(e);
});

// ===== Message Modal =====
function sanitizeMessageField(value, maxLen) {
  var text = (value || '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .trim();
  return text.slice(0, maxLen);
}

function isValidEmail(email) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setMessageStatus(message, type) {
  var status = document.getElementById('msgStatus');
  if (!status) return;
  status.textContent = message || '';
  status.classList.remove('error', 'success');
  if (type) status.classList.add(type);
}

function renderTurnstileWidget() {
  var box = document.getElementById('turnstileWidget');
  if (!box) return;
  if (!APP_CONFIG.turnstileSiteKey) {
    setMessageStatus('验证码未配置，请联系站点管理员。', 'error');
    return;
  }
  if (!window.turnstile || typeof window.turnstile.render !== 'function') return;
  if (turnstileWidgetId !== null) return;
  turnstileWidgetId = window.turnstile.render(box, {
    sitekey: APP_CONFIG.turnstileSiteKey,
    theme: 'light',
    action: 'message_submit',
    callback: function() { setMessageStatus('', ''); },
    'error-callback': function() { setMessageStatus('验证码加载失败，请刷新后重试。', 'error'); },
    'expired-callback': function() { setMessageStatus('验证码已过期，请重新验证。', 'error'); }
  });
}

function resetTurnstileWidget() {
  if (window.turnstile && turnstileWidgetId !== null) {
    window.turnstile.reset(turnstileWidgetId);
  }
}

function ensureTurnstileReady(retryCount) {
  renderTurnstileWidget();
  if (turnstileWidgetId !== null) {
    resetTurnstileWidget();
    return;
  }
  if (retryCount >= 20) {
    setMessageStatus('验证码加载超时，请刷新页面后重试。', 'error');
    return;
  }
  setTimeout(function() {
    ensureTurnstileReady(retryCount + 1);
  }, 250);
}

function getTurnstileToken() {
  if (!window.turnstile || turnstileWidgetId === null) return '';
  var token = window.turnstile.getResponse(turnstileWidgetId);
  return token ? token.trim() : '';
}

async function postMessageToApi(payload) {
  if (!APP_CONFIG.apiBase) {
    return { ok: false, status: 0, body: { error: '留言服务未配置，请联系站点管理员。' } };
  }

  var controller = new AbortController();
  var timeout = setTimeout(function() {
    controller.abort();
  }, MESSAGE_API_TIMEOUT_MS);

  try {
    var resp = await fetch(APP_CONFIG.apiBase + '/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    var body = {};
    try {
      body = await resp.json();
    } catch (err) {
      body = {};
    }
    return { ok: resp.ok, status: resp.status, body: body };
  } finally {
    clearTimeout(timeout);
  }
}

function openMessageModal() {
  var modal = document.getElementById('messageModal');
  var form = document.getElementById('messageForm');
  var success = document.getElementById('msgSuccess');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  // Reset form state
  if (form) {
    form.style.display = 'block';
    form.reset();
  }
  if (success) success.style.display = 'none';
  setMessageStatus('', '');
  ensureTurnstileReady(0);
}

function closeMessageModal(e) {
  var modal = document.getElementById('messageModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

async function submitMessage(e) {
  e.preventDefault();
  var nameEl = document.getElementById('msgName');
  var emailEl = document.getElementById('msgEmail');
  var contentEl = document.getElementById('msgContent');
  var websiteEl = document.getElementById('msgWebsite');
  var form = document.getElementById('messageForm');
  var success = document.getElementById('msgSuccess');
  var submitBtn = document.getElementById('msgSubmitBtn');
  if (!nameEl || !emailEl || !contentEl || !form || !success) return;

  var name = sanitizeMessageField(nameEl.value, 40);
  var email = sanitizeMessageField(emailEl.value, 120);
  var content = sanitizeMessageField(contentEl.value, 1000);
  var website = sanitizeMessageField(websiteEl ? websiteEl.value : '', 200);
  var captchaToken = getTurnstileToken();
  var originalBtnText = submitBtn ? submitBtn.textContent : '';

  setMessageStatus('', '');

  if (!name || !content) {
    setMessageStatus('请填写姓名和留言内容。', 'error');
    return;
  }
  if (!isValidEmail(email)) {
    setMessageStatus('邮箱格式不正确，请检查后再提交。', 'error');
    return;
  }
  if (!captchaToken) {
    setMessageStatus('请先完成人机验证。', 'error');
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = '发送中...';
  }

  var payload = {
    name: name,
    email: email,
    content: content,
    website: website,
    captchaToken: captchaToken
  };

  try {
    var result = await postMessageToApi(payload);
    if (!result.ok) {
      if (result.status === 429) {
        setMessageStatus(result.body.error || '提交过于频繁，请稍后再试。', 'error');
      } else {
        setMessageStatus(result.body.error || '提交失败，请稍后重试。', 'error');
      }
      resetTurnstileWidget();
      return;
    }

    form.style.display = 'none';
    success.style.display = 'block';
    setMessageStatus('留言已成功提交。', 'success');
    resetTurnstileWidget();
    setTimeout(function() { closeMessageModal({}); }, 2500);
  } catch (err) {
    if (err && err.name === 'AbortError') {
      setMessageStatus('请求超时，请稍后重试。', 'error');
    } else {
      setMessageStatus('网络异常，请稍后重试。', 'error');
    }
    resetTurnstileWidget();
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  }
}

// Close modal on Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var modal = document.getElementById('messageModal');
    if (modal && modal.classList.contains('active')) closeMessageModal(e);
  }
});

// ===== Scroll Progress Bar =====
(function() {
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.style.width = '0%';
  document.body.appendChild(bar);
  window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  });
})();

// ===== Cursor Petal Trail =====
(function() {
  var colors = ['#f8c8d4', '#c8e6c0', '#bdd4e7', '#f5cba7', '#d4e8cc'];
  var throttle = 0;
  document.addEventListener('mousemove', function(e) {
    var now = Date.now();
    if (now - throttle < 80) return;
    throttle = now;
    var petal = document.createElement('div');
    petal.className = 'cursor-petal';
    petal.style.left = e.clientX + 'px';
    petal.style.top = e.clientY + 'px';
    petal.style.background = colors[Math.floor(Math.random() * colors.length)];
    var size = 6 + Math.random() * 10;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    document.body.appendChild(petal);
    setTimeout(function() { petal.remove(); }, 1000);
  });
})();

// ===== Card Tilt on Hover =====
(function() {
  function addTilt(selector) {
    document.querySelectorAll(selector).forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = ((y - centerY) / centerY) * -4;
        var rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function() {
        card.style.transform = '';
      });
    });
  }
  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      addTilt('.work-card');
      addTilt('.skill-card');
      addTilt('.intern-card');
    });
  } else {
    addTilt('.work-card');
    addTilt('.skill-card');
    addTilt('.intern-card');
  }
})();

// ===== Parallax Watercolor Blobs on Scroll =====
(function() {
  var blobs = [];
  function gatherBlobs() {
    blobs = [];
    document.querySelectorAll('.wc-blob').forEach(function(el, i) {
      blobs.push({ el: el, speed: 0.02 + (i % 4) * 0.015 });
    });
  }
  window.addEventListener('scroll', function() {
    if (!blobs.length) gatherBlobs();
    var scrollY = window.pageYOffset;
    blobs.forEach(function(b) {
      b.el.style.transform = 'translateY(' + (scrollY * b.speed * -1) + 'px)';
    });
  });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', gatherBlobs);
  } else {
    gatherBlobs();
  }
})();

// ===== Magnetic Button Effect =====
(function() {
  function initMagnetic() {
    document.querySelectorAll('.btn').forEach(function(btn) {
      btn.addEventListener('mousemove', function(e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
      });
      btn.addEventListener('mouseleave', function() {
        btn.style.transform = '';
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMagnetic);
  } else {
    initMagnetic();
  }
})();


// ===== Seasonal Ground Decorations =====
(function() {
  function renderGroundDecorations() {
    var container = document.getElementById('groundDecorations');
    if (!container) return;
    var season = getCurrentSeason();
    var h = '';

    if (season === 'winter') {
      // Snowflakes on the ground
      for (var i = 0; i < 20; i++) {
        var x = Math.random() * 100;
        var y = 30 + Math.random() * 60;
        var s = 3 + Math.random() * 6;
        h += '<div style="position:absolute;left:' + x + '%;bottom:' + y + '%;width:' + s + 'px;height:' + s + 'px;background:white;border-radius:50%;opacity:' + (0.4 + Math.random() * 0.4).toFixed(2) + ';"></div>';
      }
      // Snow mounds
      for (var i = 0; i < 5; i++) {
        var mx = 10 + i * 20;
        var mw = 40 + Math.random() * 30;
        h += '<div style="position:absolute;left:' + mx + '%;bottom:15px;width:' + mw + 'px;height:' + (mw * 0.4) + 'px;background:rgba(240,240,250,0.6);border-radius:50%;"></div>';
      }
    } else if (season === 'spring') {
      // Small flowers on the ground
      var flowerColors = ['#f8c8d4', '#f0b8c8', '#e8a0bf', '#c8e6c0', '#fce4ec'];
      for (var i = 0; i < 12; i++) {
        var x = 5 + Math.random() * 90;
        var y = 20 + Math.random() * 40;
        var c = flowerColors[Math.floor(Math.random() * flowerColors.length)];
        h += '<div style="position:absolute;left:' + x + '%;bottom:' + y + '%;font-size:' + (8 + Math.random() * 8) + 'px;opacity:0.6;">✿</div>';
      }
      // Grass tufts
      for (var i = 0; i < 8; i++) {
        var gx = Math.random() * 95;
        h += '<div style="position:absolute;left:' + gx + '%;bottom:18px;font-size:10px;opacity:0.5;">🌱</div>';
      }
    } else if (season === 'autumn') {
      // Fallen leaves
      var leafEmojis = ['🍂', '🍁', '🍃'];
      for (var i = 0; i < 15; i++) {
        var x = Math.random() * 95;
        var y = 15 + Math.random() * 50;
        var rot = Math.random() * 360;
        var emoji = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
        h += '<div style="position:absolute;left:' + x + '%;bottom:' + y + '%;font-size:' + (8 + Math.random() * 10) + 'px;opacity:0.5;transform:rotate(' + rot + 'deg);">' + emoji + '</div>';
      }
    } else if (season === 'summer') {
      // Grass and butterflies
      for (var i = 0; i < 6; i++) {
        var x = 5 + Math.random() * 90;
        h += '<div style="position:absolute;left:' + x + '%;bottom:' + (20 + Math.random() * 30) + '%;font-size:10px;opacity:0.5;">🌿</div>';
      }
      for (var i = 0; i < 3; i++) {
        var bx = 10 + Math.random() * 80;
        h += '<div style="position:absolute;left:' + bx + '%;bottom:' + (50 + Math.random() * 40) + '%;font-size:12px;opacity:0.5;animation:blobFloat 4s ease-in-out infinite ' + (i * 1.3) + 's;">🦋</div>';
      }
    }

    container.innerHTML = h;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderGroundDecorations);
  } else {
    renderGroundDecorations();
  }
})();


