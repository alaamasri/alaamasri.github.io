(() => {
  const header = document.querySelector('.site-header');
  const menuBtn = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const drop = document.querySelector('.nav-drop');

  // Header hairline once the page leaves the top (sentinel instead of a scroll listener)
  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;height:8px;width:1px;pointer-events:none';
  document.body.prepend(sentinel);
  new IntersectionObserver(([e]) => header.classList.toggle('is-scrolled', !e.isIntersecting)).observe(sentinel);

  // Products dropdown (click + keyboard; hover handled for fine pointers)
  if (drop) {
    const btn = drop.querySelector('button');
    const setOpen = (open) => { drop.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', String(open)); };
    btn.addEventListener('click', () => setOpen(!drop.classList.contains('is-open')));
    if (matchMedia('(hover: hover)').matches) {
      let t;
      drop.addEventListener('mouseenter', () => { clearTimeout(t); setOpen(true); });
      drop.addEventListener('mouseleave', () => { t = setTimeout(() => setOpen(false), 140); });
    }
    document.addEventListener('click', (e) => { if (!drop.contains(e.target)) setOpen(false); });
    drop.addEventListener('keydown', (e) => { if (e.key === 'Escape') { setOpen(false); btn.focus(); } });
  }

  // Mobile menu
  if (menuBtn && mobileNav) {
    const setMenu = (open) => {
      mobileNav.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.innerHTML = open ? '<i class="ph ph-x" aria-hidden="true"></i>' : '<i class="ph ph-list" aria-hidden="true"></i>';
      document.body.classList.toggle('nav-locked', open);
    };
    menuBtn.addEventListener('click', () => setMenu(!mobileNav.classList.contains('is-open')));
    mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
    matchMedia('(min-width: 1024px)').addEventListener('change', (m) => { if (m.matches) setMenu(false); });
  }

  // Hero photos: gentle scroll parallax. The 1st starts a little low and the 3rd a little high
  // (a fraction of the distance to the 2nd's bottom / the buttons' middle), then they ease back
  // into the grid over a long scroll. Uses the `translate` property so it doesn't fight the
  // load animation on `transform`.
  const media = document.querySelector('.hx-media');
  const actions = document.querySelector('.hx-actions');
  if (media && actions && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const [img1, img2, img3] = media.querySelectorAll('img');
    const wide = matchMedia('(min-width: 768px)');
    const STRENGTH_1 = 0.25, STRENGTH_3 = 0.4; // share of the full offset; the 1st moves less than the 3rd
    const LIFT_3 = 25; // extra px the 3rd starts higher
    let d1 = 0, d3 = 0, range = 1, shown = 1, running = false;
    // offsetTop ignores transforms, so these are the resting positions (all share .hero-band as offsetParent)
    const measure = () => {
      if (!wide.matches) { d1 = d3 = 0; return; }
      d1 = STRENGTH_1 * ((img2.offsetTop + img2.offsetHeight) - (img1.offsetTop + img1.offsetHeight / 2));
      d3 = STRENGTH_3 * ((actions.offsetTop + actions.offsetHeight / 2) - img3.offsetTop) - LIFT_3;
      range = Math.max(400, media.getBoundingClientRect().top + scrollY + innerHeight * 0.35);
    };
    const target = () => 1 - Math.min(1, Math.max(0, scrollY / range));
    const paint = () => {
      img1.style.translate = `0 ${(d1 * shown).toFixed(1)}px`;
      img3.style.translate = `0 ${(d3 * shown).toFixed(1)}px`;
    };
    // Ease toward the scroll position instead of tracking it 1:1, so the motion feels soft
    const step = () => {
      const t = target();
      shown += (t - shown) * 0.08;
      if (Math.abs(t - shown) < 0.001) { shown = t; running = false; } else requestAnimationFrame(step);
      paint();
    };
    const kick = () => { if (!running) { running = true; requestAnimationFrame(step); } };
    measure(); shown = target(); paint();
    addEventListener('scroll', kick, { passive: true });
    addEventListener('resize', () => { measure(); paint(); kick(); });
    addEventListener('load', () => { measure(); paint(); });
  }

  // The faint N behind the numbers section drifts a little slower than the page (subtle parallax)
  const markN = document.querySelector('.numbers .section-mark');
  if (markN && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const RANGE = 140; // total px of drift across the pass through the viewport
    let ticking = false;
    const drift = () => {
      ticking = false;
      const r = markN.parentElement.getBoundingClientRect();
      const p = (r.top + r.height / 2 - innerHeight / 2) / (innerHeight / 2 + r.height / 2); // -1..1 while visible
      markN.style.setProperty('--py', `${(-Math.max(-1, Math.min(1, p)) * RANGE / 2).toFixed(1)}px`); // lags behind the scroll
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(drift); } }, { passive: true });
    drift();
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  // Products showcase: the sticky index follows whichever card crosses the viewport middle
  const cards = document.querySelectorAll('.scard');
  const indexLinks = document.querySelectorAll('.showcase-index a');
  const showcaseCta = document.querySelector('.showcase-cta');
  const showcase = document.querySelector('.showcase');
  if (cards.length && indexLinks.length) {
    const setActive = (card) => {
      indexLinks.forEach((a) => a.classList.toggle('is-active', a.dataset.target === card.id));
      // Each category carries its own flavor note color; the glow behind the panel follows it
      if (showcase && card.dataset.note) showcase.style.setProperty('--note', card.dataset.note);
      if (showcaseCta) {
        showcaseCta.href = card.getAttribute('href');
        showcaseCta.querySelector('[data-showcase-name]').textContent = card.dataset.name;
      }
    };
    const so = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target); });
    }, { rootMargin: '-50% 0px -50% 0px' });
    cards.forEach((c) => so.observe(c));
  }

  // Count-up for the numbers block (static under reduced motion)
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const run = (el) => {
      const end = Number(el.dataset.count);
      const start = performance.now();
      const dur = 1400;
      const tick = (now) => {
        const t = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - t, 4)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const co = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { run(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach((c) => co.observe(c));
  }

  // Year
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  // Contact form: inline validation, then hand off to the visitor's mail app.
  // Replace the hand-off with a real endpoint (e.g. a PHP mailer or form service) when one is available.
  const form = document.getElementById('contactForm');
  if (form) {
    const status = form.querySelector('.form-status');
    const check = (field) => {
      const input = field.querySelector('input, textarea');
      const ok = input.checkValidity();
      field.classList.toggle('invalid', !ok);
      input.setAttribute('aria-invalid', String(!ok));
      return ok;
    };
    form.querySelectorAll('.field').forEach((f) => {
      const input = f.querySelector('input, textarea');
      input.addEventListener('blur', () => { if (input.value) check(f); });
      input.addEventListener('input', () => { if (f.classList.contains('invalid')) check(f); });
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = [...form.querySelectorAll('.field')];
      const valid = fields.map(check).every(Boolean);
      if (!valid) {
        status.className = 'form-status';
        status.textContent = 'Please complete the highlighted fields.';
        form.querySelector('.invalid input, .invalid textarea')?.focus();
        return;
      }
      const d = new FormData(form);
      const subject = d.get('subject') || 'Website enquiry';
      const body = `${d.get('message')}\n\n${d.get('name')}\n${d.get('email')}`;
      window.location.href = `mailto:info@alawtad-co.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = '';
      if (done) {
        form.hidden = true;
        form.parentElement.classList.add("is-done");
        done.hidden = false;
        done.focus();
      }
    });

    // Message-ready state: a way out when no email app opens, and a way back to edit
    const done = form.parentElement.querySelector('.form-done');
    if (done) {
      const copyBtn = done.querySelector('[data-copy-email]');
      const copyLabel = copyBtn.querySelector('span');
      copyBtn.addEventListener('click', async () => {
        const email = copyBtn.dataset.copyEmail;
        try {
          await navigator.clipboard.writeText(email);
          copyLabel.textContent = 'Copied';
          copyBtn.classList.add('is-copied');
          setTimeout(() => { copyLabel.textContent = 'Copy email address'; copyBtn.classList.remove('is-copied'); }, 2200);
        } catch {
          // Clipboard blocked (e.g. insecure context): fall back to opening the address directly
          window.location.href = `mailto:${email}`;
        }
      });
      done.querySelector('[data-edit-message]').addEventListener('click', () => {
        done.hidden = true;
        form.parentElement.classList.remove("is-done");
        form.hidden = false;
        form.querySelector('textarea').focus();
      });
    }
  }
})();
