(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const projects = [
    ['https://www.inkmartini.com/', 'Ink Martini', 'Shopify storefront for an activewear and fashion label built on blending art with fitness, with a video-led landing page.', ['Shopify', 'Activewear']],
    ['https://mintmena.com/', 'Mintmena', 'WordPress site for an independent advertising consultancy — production, cost control and creative services.', ['WordPress', 'Consultancy']],
    ['https://www.formwear.com/collections/all', 'Form Wear', 'Shop section and product templates for a bespoke corporate-uniform label (est. 1989) serving hotels and restaurants.', ['Shopify', 'Hospitality']],
    ['https://diligentip.com/', 'Diligent IP', 'Corporate site for an IP consultancy — structured content and clear service pages.', ['Web', 'Corporate']],
    ['https://crossarabia.com/', 'Cross Arabia', '360° solutions for healthy-food brands, from first talks through product launch.', ['Web', 'F&B Brands']],
    ['https://www.jabaholdings.com/', 'JABA Holdings', 'Madrid-based Spanish real-estate investment company (SOCIMI/REIT), built bilingual on Umbraco.', ['Umbraco', 'Real Estate']],
    ['https://crossjo.com/', 'Cross Jordan', 'FMCG distribution in Jordan, representing international functional-food and healthy-snack brands.', ['Web', 'FMCG']],
    ['https://dough-works.com/', 'Dough Works', "Custom-coded Shopify subscription portal for a bakery's B2B parent company — weekly pre-orders, account dashboards and Sunday delivery.", ['Shopify', 'Subscription']],
    ['https://xbyform.com/', 'X by Form', 'Second storefront for the Form label, sharing components with the main store.', ['Shopify', 'Apparel']],
    ['https://sukaina.skin', 'Sukaina Skin', 'Skincare storefront build with a product-led landing experience.', ['Shopify', 'Beauty']],
    ['https://bft-uae.com/', 'BFT', 'Bright Future Trading — a UAE supplier of food and veterinary raw materials across the Levant and GCC.', ['Web', 'Trading']],
    ['https://global.numeira.com/', 'Numeira', 'Shopify storefront for a Dead Sea minerals brand — bath salts, magnesium flakes and mud-based skincare shipped worldwide.', ['Shopify', 'Beauty']],
  ];

  function setupParticles() {
    const cv = document.querySelector('[data-particles]');
    if (!cv || reduced) return;
    const ctx = cv.getContext('2d');
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--a').trim() || '#c9fa4b';
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), pts = [], raf;

    const seed = () => {
      const count = Math.max(26, Math.min(70, Math.round(w / 26)));
      pts = new Array(count).fill(0).map(() => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.5 + 0.7, a: Math.random() * 0.5 + 0.2,
        hot: Math.random() < 0.18,
      }));
    };
    const resize = () => {
      const r = cv.getBoundingClientRect();
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d2 = dx * dx + dy * dy;
          if (d2 < 16000) {
            ctx.globalAlpha = (1 - d2 / 16000) * 0.09;
            ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.hot ? accent : '#ffffff';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    resize();
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(cv);
    raf = requestAnimationFrame(draw);
  }

  function setupReveal() {
    const els = Array.from(document.querySelectorAll('[data-reveal]'));
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-shown'));
      return;
    }
    const show = (el) => {
      const d = parseInt(el.dataset.delay || '0', 10);
      setTimeout(() => el.classList.add('is-shown'), d);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(el => io.observe(el));
  }

  function setupNavReveal() {
    const nav = document.querySelector('[data-navbar]');
    if (!nav) return;
    let shown = null, ticking = false;
    const apply = () => {
      const on = window.scrollY > window.innerHeight * 0.75;
      if (on === shown) return;
      shown = on;
      nav.classList.toggle('is-visible', on);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; apply(); }); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    apply();
  }

  function setupNavActive() {
    if (!('IntersectionObserver' in window)) return;
    const links = Array.from(document.querySelectorAll('[data-nav]'));
    const sections = Array.from(document.querySelectorAll('[data-sect]'));
    const visible = new Map();
    const paint = () => {
      let best = null, bestRatio = 0;
      visible.forEach((ratio, id) => { if (ratio > bestRatio) { bestRatio = ratio; best = id; } });
      links.forEach(l => l.classList.toggle('is-active', l.dataset.nav === best));
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => visible.set(e.target.dataset.sect, e.isIntersecting ? e.intersectionRatio : 0));
      paint();
    }, { threshold: [0, 0.15, 0.35, 0.6, 0.9] });
    sections.forEach(s => io.observe(s));
  }

  function setupRotator() {
    const el = document.querySelector('[data-rotator]');
    if (!el || reduced) return;
    const words = ['web', 'stores', 'apps'];
    const caret = document.createElement('span');
    caret.textContent = '|';
    caret.style.cssText = 'display:inline-block;margin-left:.06em;color:var(--a);animation:caret 1s steps(1) infinite';
    el.textContent = '';
    const label = document.createElement('span');
    el.appendChild(label);
    el.appendChild(caret);
    let wi = 0, ci = words[0].length, dir = 1;
    label.textContent = words[0];
    const step = () => {
      const w = words[wi];
      if (dir === 1) {
        ci++;
        label.textContent = w.slice(0, ci);
        if (ci >= w.length) { dir = -1; setTimeout(step, 1500); return; }
        setTimeout(step, 90);
      } else {
        ci--;
        label.textContent = w.slice(0, Math.max(0, ci));
        if (ci <= 0) { dir = 1; wi = (wi + 1) % words.length; setTimeout(step, 220); return; }
        setTimeout(step, 45);
      }
    };
    setTimeout(step, 1600);
  }

  function setupWorkSticky() {
    const cards = Array.from(document.querySelectorAll('[data-wimg]'));
    const pin = document.querySelector('[data-wpin]');
    if (!cards.length || !pin) return;

    const numEl = pin.querySelector('[data-wnum]');
    const numEl2 = pin.querySelector('[data-wnum2]');
    const titleEl = pin.querySelector('[data-wtitle]');
    const bodyEl = pin.querySelector('[data-wbody]');
    const tagsEl = pin.querySelector('[data-wtags]');
    const linkEl = pin.querySelector('[data-wlink]');
    const fillEl = pin.querySelector('[data-wfill]');
    const linkWrap = pin.querySelector('.wpin-link');

    let widx = 0, fading = false, pendingIdx = null, fadeTimer, ticking = false;

    const render = (i) => {
      const p = projects[i];
      linkEl.href = p[0];
      numEl.textContent = String(i + 1).padStart(2, '0');
      numEl2.textContent = String(i + 1).padStart(2, '0');
      titleEl.textContent = p[1];
      bodyEl.textContent = p[2];
      tagsEl.innerHTML = p[3].map(t => `<span class="tag">${t}</span>`).join('');
      fillEl.style.width = (((i + 1) / projects.length) * 100).toFixed(1) + '%';
    };
    render(0);

    const update = () => {
      ticking = false;
      const stick = parseFloat(getComputedStyle(cards[0]).top) || 110;
      let idx = 0;
      cards.forEach((el, i) => { if (el.getBoundingClientRect().top <= stick + 6) idx = i; });
      if (idx === widx || idx === pendingIdx) return;
      pendingIdx = idx;
      fading = true;
      linkWrap.style.opacity = '0';
      clearTimeout(fadeTimer);
      fadeTimer = setTimeout(() => {
        widx = pendingIdx;
        render(widx);
        fading = false;
        linkWrap.style.opacity = '1';
      }, 260);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  function setupCursor() {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return;

    const ball = document.createElement('div');
    ball.className = 'cursor-ball';
    ball.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ball);

    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const ratio = 0.15;

    document.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      ball.classList.add('is-visible');
    }, { passive: true });
    document.addEventListener('mouseleave', () => ball.classList.remove('is-visible'));
    document.addEventListener('mouseenter', () => ball.classList.add('is-visible'));

    const tick = () => {
      pos.x += (mouse.x - pos.x) * ratio;
      pos.y += (mouse.y - pos.y) * ratio;
      ball.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const hoverSelector = 'a, button, .svc-card, .wcard-info';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverSelector)) ball.classList.add('is-hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverSelector)) ball.classList.remove('is-hover');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupParticles();
    setupReveal();
    setupNavReveal();
    setupNavActive();
    setupRotator();
    setupWorkSticky();
    setupCursor();
  });
})();
