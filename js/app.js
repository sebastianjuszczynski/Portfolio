// ====================
// IMPORTS
// ====================
import { translations } from "./i18n.js";





// ====================
// SELECTORS
// ====================
const body = document.body;
const mobileButton = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.header__menu');
const links = document.querySelectorAll('.header__menu-link');
const logo = document.querySelector('.header__logo-text');
const lightModeToggle = document.querySelector('.header__toggle-theme');
const langDropdown = document.querySelector('.header__lang-dropdown');
const langButton = langDropdown.querySelector('.header__lang-button');
const langOptions = langDropdown.querySelector('.header__lang-options');
const langCode = langButton.querySelector('.lang-code');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section[id]');

// ====================
// MOBILE MENU
// ====================
const toggleMenu = () => {
  mobileButton.classList.toggle('is-active');
  const isOpen = mobileMenu.classList.toggle('header__menu--open');
  mobileButton.setAttribute('aria-expanded', isOpen.toString());
};

const closeMenu = () => {
  mobileMenu.classList.remove('header__menu--open');
  mobileButton.classList.remove('is-active');
  mobileButton.setAttribute('aria-expanded', 'false');
};

const setupMobileMenu = () => {
  mobileButton.addEventListener('click', toggleMenu);
  links.forEach(link => {
    link.addEventListener('click', () => {
      links.forEach(l => l.parentElement.classList.remove('active'));
      link.parentElement.classList.add('active');
      closeMenu();
    });
  });
  logo.addEventListener('click', () => {
    links.forEach(l => l.parentElement.classList.remove('active'));
    closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', (e) => {
    const clickedLink = e.target.closest('.header__menu a');
    const clickedHamburger = e.target.closest('.hamburger')
    const menuVisible = mobileMenu.classList.contains('header__menu--open')

    if (!clickedLink && !clickedHamburger && menuVisible) {
      closeMenu()
    }
  })
}

  // ====================
  // THEME TOGGLE
  // ====================
  const setupThemeToggle = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') body.classList.add('light-theme');

    lightModeToggle.addEventListener('click', () => {
      const isLight = body.classList.toggle('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  };

  // ====================
  // LANGUAGE SWITCHER
  // ====================
  const setLanguage = (lang) => {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = translations[lang][key];
    });
  };

  const setupLanguageSwitcher = () => {
    langButton.addEventListener('click', () => {
      langOptions.classList.toggle('show');
      const expanded = langButton.getAttribute('aria-expanded') === 'true';
      langButton.setAttribute('aria-expanded', (!expanded).toString());
    });

    langOptions.querySelectorAll('.lang-option').forEach(option => {
      option.addEventListener('click', () => {
        const lang = option.dataset.lang;
        setLanguage(lang);
        localStorage.setItem('lang', lang);
        langCode.textContent = lang.toUpperCase();

        const flagImg = option.querySelector('img');
        const currentFlag = langButton.querySelector('.lang-flag');
        currentFlag.src = flagImg.src;
        currentFlag.alt = flagImg.alt;

        langOptions.classList.remove('show');
        langButton.setAttribute('aria-expanded', 'false');
      });
    });

    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);
    langCode.textContent = savedLang.toUpperCase();

    const initialFlag = langOptions.querySelector(`.lang-option[data-lang="${savedLang}"] img`);
    if (initialFlag) {
      const currentFlag = langButton.querySelector('.lang-flag');
      currentFlag.src = initialFlag.src;
      currentFlag.alt = initialFlag.alt;
    }

    document.addEventListener('click', (e) => {
      if (!langDropdown.contains(e.target)) {
        langOptions.classList.remove('show');
        langButton.setAttribute('aria-expanded', 'false');
      }
    });
  };

  // ====================
  // SCROLL SPY
  // ====================
  const activateScrollSpy = () => {
    const scrollY = window.scrollY;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 60;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight) {
        links.forEach(link => {
          link.parentElement.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.parentElement.classList.add('active');
          }
        });
      }
    });
  };

  const setupScrollSpy = () => {
    window.addEventListener('scroll', activateScrollSpy);
  };

  // ====================
  // SCROLL HEADER
  // ====================
  const setupStickyHeader = () => {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  };

  // ====================
  // INIT
  // ====================
  const init = () => {
    setupMobileMenu();
    setupThemeToggle();
    setupLanguageSwitcher();
    setupScrollSpy();
    setupStickyHeader();
  };

  init();

