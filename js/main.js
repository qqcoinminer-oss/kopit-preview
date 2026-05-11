/* KOPIT Website — Main JS */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 1. NAVBAR: scroll class ── */
  const navbar = document.getElementById('navbar');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── 2. MOBILE MENU ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* Close menu on outside click */
  document.addEventListener('click', function (e) {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ── 3. SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -44px 0px' });

  revealEls.forEach(function (el) { revealObs.observe(el); });

  /* ── 4. COUNTER ANIMATION ── */
  const counters = document.querySelectorAll('.stat-num');
  let countered  = false;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function runCounters() {
    counters.forEach(function (el) {
      const target   = parseInt(el.getAttribute('data-target'), 10);
      const duration = 1800;
      const start    = performance.now();

      (function tick(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        el.textContent = Math.round(easeOutCubic(progress) * target);
        if (progress < 1) requestAnimationFrame(tick);
      })(performance.now());
    });
  }

  const statsObs = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !countered) {
      countered = true;
      runCounters();
    }
  }, { threshold: 0.5 });

  const statsBar = document.getElementById('statsBar');
  if (statsBar) statsObs.observe(statsBar);

  /* ── 5. HERO PARALLAX (subtle) ── */
  const heroContent = document.querySelector('.hero-content');
  const heroGrid    = document.querySelector('.hero-hex-grid');

  if (heroContent && heroGrid) {
    window.addEventListener('scroll', function () {
      const y = window.scrollY;
      heroContent.style.transform = 'translateY(' + (y * 0.18) + 'px)';
      heroGrid.style.transform    = 'translateY(' + (y * 0.08) + 'px)';
    }, { passive: true });
  }

});
