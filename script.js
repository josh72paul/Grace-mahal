/* ═══════════════════════════════════════════════════
   Grace Mahal — Slideshow & Interactions (v2)
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Slideshow Engine ── */
  const slides  = document.querySelectorAll('.slide');
  const dots    = document.querySelectorAll('.slide-dots .dot');
  const arrowL  = document.getElementById('arrow-left');
  const arrowR  = document.getElementById('arrow-right');

  let current = 0;
  let timer   = null;
  const INTERVAL = 10000; // 10 seconds

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, INTERVAL);
  }

  // Arrow buttons
  arrowR.addEventListener('click', function () { next(); resetTimer(); });
  arrowL.addEventListener('click', function () { prev(); resetTimer(); });

  // Dot indicators
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goTo(parseInt(this.dataset.index, 10));
      resetTimer();
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { next(); resetTimer(); }
    if (e.key === 'ArrowLeft')  { prev(); resetTimer(); }
  });

  // Auto-advance
  timer = setInterval(next, INTERVAL);

  /* ── Touch / Swipe support ── */
  let touchStartX = 0;
  const slideshow = document.getElementById('slideshow');

  slideshow.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  slideshow.addEventListener('touchend', function (e) {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) next(); else prev();
      resetTimer();
    }
  }, { passive: true });

})();
