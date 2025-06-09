let scrollRevealInitialized = false;

export const scrollReveal = () => {
  const isMobile = window.innerWidth <= 768;

  const defaultRevealOptions = {
    distance: '30px',
    origin: 'bottom',
    easing: 'ease-out',
    reset: false,
  }

  const revealScrollElement = (selector, options) => {
    ScrollReveal().reveal(selector, options);
  };

  const handleDesktopReveal = () => {
    document.querySelectorAll('.scroll__reveal-card')
      .forEach(card => card.classList.add('visible'));

    revealScrollElement('.scroll__reveal-card', {
      ...defaultRevealOptions,
      duration: 500,
      interval: 80,
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
            ...defaultRevealOptions,
            duration: 600,
            delay: 100
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
    ...defaultRevealOptions,
    duration: 700,
    delay: 100,
    interval: 500,
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
  scrollRevealInitialized = true;

};

export const applyScrollRevealToNewCards = () => {
  if (scrollRevealInitialized) {
    document.querySelectorAll('.scroll__reveal-card:not(.visible)')
      .forEach(card => card.classList.add('visible'));
    return;
  }


  const isMobile = window.innerWidth <= 768;
  const defaultRevealOptions = {
    distance: '30px',
    origin: 'bottom',
    easing: 'ease-out',
    reset: false,
    duration: 500,
    interval: 80,
    viewOffset: { top: 100, bottom: 100 }
  };

  if (isMobile) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add('visible');

          ScrollReveal().reveal(el, {
            ...defaultRevealOptions,
            duration: 600,
            delay: 100
          });

          obs.unobserve(el);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -10% 0px'
    });

    document.querySelectorAll('.scroll__reveal-card:not(.sr)')
      .forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.scroll__reveal-card:not(.sr)')
      .forEach(card => card.classList.add('visible'));

    ScrollReveal().reveal('.scroll__reveal-card:not(.sr)', defaultRevealOptions);
  }
};
