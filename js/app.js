// ====================
// IMPORTS
// ====================
import { translations } from "./i18n.js";
import { setLanguageLocalStorage } from "./utils.js";
import { validateField } from './form/formValidation.js';
import { initContactForm } from './form/contact.js';
import { scrollReveal } from "./scrollReveal.js";
import { debounce } from "./utils.js";

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
const heroArrow = document.querySelector('.section__hero--arrow-container');

// ====================
// HELPERS
// ====================
const clearActiveLinks = () => {
  links.forEach(link => link.parentElement.classList.remove('active'));
};
const updateLangButtonUI = (lang) => {
  langCode.textContent = lang.toUpperCase();
  const initialFlag = langOptions.querySelector(`.lang-option[data-lang="${lang}"] img`);
  if (initialFlag) {
    const currentFlag = langButton.querySelector('.lang-flag');
    currentFlag.src = initialFlag.src;
    currentFlag.alt = initialFlag.alt;
  };
};
// ====================
// MOBILE MENU
// ====================
const toggleMenu = () => {
  mobileButton.classList.toggle('is-active');
  const isOpen = mobileMenu.classList.toggle('header__menu--open');
  mobileButton.setAttribute('aria-expanded', isOpen.toString());
  heroArrow.classList.toggle('hidden', isOpen);
};

const closeMenu = () => {
  mobileMenu.classList.remove('header__menu--open');
  mobileButton.classList.remove('is-active');
  mobileButton.setAttribute('aria-expanded', 'false');
  heroArrow.classList.remove('hidden');
};

const setupMobileMenu = () => {
  mobileButton.addEventListener('click', toggleMenu);
  links.forEach(link => {
    link.addEventListener('click', () => {
      clearActiveLinks();
      closeMenu();
    });
  });
  logo.addEventListener('click', () => {
    clearActiveLinks();
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
    const clickedHamburger = e.target.closest('.hamburger');
    const menuVisible = mobileMenu.classList.contains('header__menu--open');

    if (!clickedLink && !clickedHamburger && menuVisible) {
      closeMenu();
    };
  });
};

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
  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  document.documentElement.setAttribute("lang", lang);

  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = translations[lang][key];
  });
  placeholders.forEach(p => {
    const key = p.getAttribute("data-i18n-placeholder");
    p.placeholder = translations[lang][key] || "";
  });
  document.querySelectorAll('.input-error').forEach(input => {
    validateField(input);
  });
  updateLangButtonUI(lang);
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
      setLanguageLocalStorage(lang);
      setLanguage(lang);
      langOptions.classList.remove('show');
      langButton.setAttribute('aria-expanded', 'false');
    });
  });

  const savedLang = localStorage.getItem('lang') || 'en';
  setLanguage(savedLang);
  updateLangButtonUI(savedLang);

  document.addEventListener('click', (e) => {
    if (!langDropdown.contains(e.target)) {
      langOptions.classList.remove('show');
      langButton.setAttribute('aria-expanded', 'false');
    };
  });

  document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    langOptions.classList.remove("show");
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
    const sectionTop = section.offsetTop - 200;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight) {
      links.forEach(link => {
        link.parentElement.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.parentElement.classList.add('active');
        };
      });
    };
  });
};

const setupScrollSpy = () => {
  window.addEventListener('scroll', debounce(activateScrollSpy, 100));
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
  initContactForm();
  scrollReveal();
};

init();