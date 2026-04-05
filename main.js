/* ============================================================
   KŌPĪ — main.js
   All interactive behaviour for the landing page
   ============================================================ */

'use strict';

/* ── Helpers ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];


/* ============================================================
   1. NAVBAR — scroll-based styling + burger menu
   ============================================================ */
(function initNavbar() {
  const navbar     = $('#navbar');
  const burger     = $('#burger');
  const mobileMenu = $('#mobile-menu');

  /* Scroll state */
  function updateNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar(); // run on load

  /* Burger toggle */
  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  /* Close menu when a link is clicked */
  $$('a', mobileMenu).forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* Expose closeMenu to inline onclick fallback */
function closeMenu() {
  const mobileMenu = $('#mobile-menu');
  const burger     = $('#burger');
  mobileMenu.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}


/* ============================================================
   2. SCROLL REVEAL — IntersectionObserver
   ============================================================ */
(function initReveal() {
  const elements = $$('[data-reveal]');

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el    = entry.target;
          const delay = parseInt(el.dataset.delay || '0', 10);

          setTimeout(() => {
            el.classList.add('is-visible');
          }, delay);

          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -48px 0px',
    }
  );

  elements.forEach(el => observer.observe(el));
})();


/* ============================================================
   3. SMOOTH ANCHOR SCROLL with offset
   ============================================================ */
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = $(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = 64; // navbar height in px
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetPos,
        behavior: 'smooth',
      });
    });
  });
})();


/* ============================================================
   4. ACTIVE NAV LINK HIGHLIGHT on scroll
   ============================================================ */
(function initActiveNav() {
  const sections  = $$('section[id]');
  const navLinks  = $$('.nav-link');

  if (!sections.length || !navLinks.length) return;

  function setActive() {
    let currentId = '';
    const scrollY = window.scrollY + 100;

    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop) {
        currentId = sec.id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.style.color = href === currentId
        ? 'var(--linen)'
        : '';
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();


/* ============================================================
   5. PESAN BUTTON — app-redirect prompt
   ============================================================ */
(function initPesanButtons() {
  $$('.pesan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Animate button
      btn.textContent = '✓ Lihat di App';
      btn.style.background = 'var(--sage)';
      btn.style.color = '#fff';
      btn.style.borderColor = 'var(--sage)';

      setTimeout(() => {
        btn.textContent = '+ Pesan';
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 2000);

      // Smooth scroll to download section
      const downloadSection = $('#download');
      if (downloadSection) {
        setTimeout(() => {
          downloadSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);
      }
    });
  });
})();


/* ============================================================
   6. LIVE TIMER — simulates order countdown in phone mockup
   ============================================================ */
(function initLiveTimer() {
  const timerEl = $('.timer-float');
  if (!timerEl) return;

  const displayEl = timerEl.querySelector('.font-display, p:last-child') || timerEl;

  let seconds = 227; // 3:47

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  // Update every second
  const interval = setInterval(() => {
    seconds -= 1;
    if (seconds <= 0) {
      clearInterval(interval);
      displayEl.textContent = 'Ready!';
      timerEl.style.background = 'var(--sage)';
      timerEl.style.color = 'var(--linen)';
      return;
    }
    // Find the time display element
    const timeEl = timerEl.querySelector('p:last-child');
    if (timeEl) timeEl.textContent = formatTime(seconds);
  }, 1000);
})();


/* ============================================================
   7. NOTIFICATION TOAST simulation (hero floating card)
   ============================================================ */
(function initNotifAnimation() {
  const notif = $('.notif-float');
  if (!notif) return;

  const messages = [
    { title: 'Pesanan Siap!',     sub: 'Outlet Sudirman Lt.1', cta: 'Ambil sekarang →' },
    { title: 'Promo Hari Ini!',   sub: 'Diskon 20% untukmu',   cta: 'Lihat promo →' },
    { title: 'Point Bertambah!',  sub: '+32 KŌPĪ Points',       cta: 'Cek rewards →' },
    { title: 'Pesanan Siap!',     sub: 'Outlet Thamrin City',  cta: 'Ambil sekarang →' },
  ];

  let idx = 0;

  function rotateNotif() {
    idx = (idx + 1) % messages.length;
    const msg = messages[idx];

    // Animate out
    notif.style.opacity = '0';
    notif.style.transform = 'translateY(8px) rotate(-2deg)';

    setTimeout(() => {
      const titleEl = notif.querySelector('p:first-child');
      const subEl   = notif.querySelector('p:nth-child(2)');
      const ctaEl   = notif.querySelector('p:last-child');

      if (titleEl) titleEl.textContent = msg.title;
      if (subEl)   subEl.textContent   = msg.sub;
      if (ctaEl)   ctaEl.textContent   = msg.cta;

      // Animate in
      notif.style.opacity   = '1';
      notif.style.transform = '';
    }, 400);
  }

  notif.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  setInterval(rotateNotif, 5000);
})();


/* ============================================================
   8. COUNTER ANIMATION (stats section)
   ============================================================ */
(function initCounters() {
  // Nothing to implement: counters use static display text for speed.
  // Extend here if animated counting is desired.
})();


/* ============================================================
   9. STAR RATING BARS — animate on scroll into view
   ============================================================ */
(function initRatingBars() {
  const bars = $$('.rating-banner .flex-1.h-1\\.5 > div');

  if (!bars.length) return;

  const ratingSection = $('.rating-banner');
  if (!ratingSection) return;

  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        bars.forEach(bar => {
          const target = bar.style.width;
          bar.style.width = '0';
          bar.style.transition = 'width 1s var(--ease-out-expo)';
          requestAnimationFrame(() => {
            setTimeout(() => { bar.style.width = target; }, 100);
          });
        });
      }
    },
    { threshold: 0.4 }
  );

  observer.observe(ratingSection);
})();


/* ============================================================
   10. PARALLAX AMBIENT GLOWS (subtle, performance-safe)
   ============================================================ */
(function initParallax() {
  const glows = $$('.hero-bg ~ * .rounded-full.blur-\\[120px\\], .rounded-full.blur-\\[180px\\]');

  // Only run on devices that likely can handle it
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.requestAnimationFrame) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        glows.forEach((glow, i) => {
          const dir = i % 2 === 0 ? 1 : -1;
          glow.style.transform = `translateY(${y * 0.04 * dir}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* ============================================================
   11. KEYBOARD ACCESSIBILITY — trap focus in mobile menu
   ============================================================ */
(function initKeyboardA11y() {
  const mobileMenu = $('#mobile-menu');
  if (!mobileMenu) return;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
      $('#burger').focus();
    }
  });
})();
