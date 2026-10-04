// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    // Menü schließen wenn ein Link geklickt wird (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }

  // Header bekommt Schatten sobald gescrollt wird
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Scroll-Reveal: Elemente sanft einblenden, sobald sie sichtbar werden
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });

      // Sicherheitsnetz: falls der Observer aus irgendeinem Grund nicht
      // rechtzeitig feuert (z.B. Screenshot-Tools, sehr seltene Edge-Cases),
      // spätestens nach 2.5s alles einblenden, damit nie Inhalt unsichtbar bleibt.
      setTimeout(function () {
        revealEls.forEach(function (el) { el.classList.add('in-view'); });
      }, 2500);
    } else {
      // Fallback ohne IntersectionObserver
      revealEls.forEach(function (el) { el.classList.add('in-view'); });
    }
  }
});
