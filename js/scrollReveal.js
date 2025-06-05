// ====================
// SCROLL REVEAL
// ====================
export const scrollReveal = () => {
  const isMobile = window.innerWidth <= 768;

  const revealScrollElement = (selector, options) => {
    ScrollReveal().reveal(selector, options);
  };

  const handleDesktopReveal = () => {
    document.querySelectorAll('.scroll__reveal-card')
      .forEach(card => card.classList.add('visible'));

    revealScrollElement('.scroll__reveal-card', {
      distance: '30px',
      duration: 500,
      interval: 80,
      origin: 'bottom',
      easing: 'ease-out',
      reset: false,
      viewOffset: { top: 100, bottom: 100 }
    });
  };

  const handleMobileReveal = () => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add('visible');

          revealScrollElement(el, {
            distance: '30px',
            duration: 600,
            delay: 100,
            easing: 'ease-out',
            origin: 'bottom',
            reset: false
          });

          obs.unobserve(el);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -10% 0px'
    });

    document.querySelectorAll('.scroll__reveal-card')
      .forEach(el => observer.observe(el));
  };

  revealScrollElement('.scroll__reveal', {
    distance: '40px',
    duration: 700,
    delay: 100,
    interval: 100,
    easing: 'ease-out',
    origin: 'bottom',
    reset: false,
    viewOffset: { top: 100, bottom: 100 }
  });

  if (isMobile) {
    handleMobileReveal();
  } else {
    handleDesktopReveal();
  }

  revealScrollElement('.scroll__reveal-item', {
    distance: '30px',
    duration: 500,
    interval: 80,
    origin: 'bottom',
    easing: 'ease-out',
    reset: false,
    viewOffset: { top: 100, bottom: 100 }
  });
};

