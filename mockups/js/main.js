// WWIS mockups — shared interactivity. No backend calls, visual behavior only.

document.addEventListener('DOMContentLoaded', function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sticky header scroll state
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var mobilePanel = document.querySelector('.nav-mobile-panel');
  if (toggle && mobilePanel) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.classList.toggle('is-open');
      mobilePanel.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    mobilePanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('is-open');
        mobilePanel.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Stat counters — count up when scrolled into view, skipped entirely under reduced motion
  var statNumbers = document.querySelectorAll('.stat-number[data-count-to]');
  if (statNumbers.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      statNumbers.forEach(function (el) {
        el.textContent = el.getAttribute('data-count-to') + (el.getAttribute('data-suffix') || '');
      });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          observer.unobserve(el);
          var target = parseFloat(el.getAttribute('data-count-to'));
          var suffix = el.getAttribute('data-suffix') || '';
          var duration = 1200;
          var start = null;
          function step(ts) {
            if (start === null) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var value = Math.round(target * eased);
            el.textContent = value + suffix;
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      }, { threshold: 0.4 });
      statNumbers.forEach(function (el) { observer.observe(el); });
    }
  }
});
