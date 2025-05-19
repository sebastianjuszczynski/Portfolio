import { translations } from "./i18n.js";

const mobileButton = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.header__menu');
const links = document.querySelectorAll('.header__menu-link');
const logo = document.querySelector('.header__logo-text');
const lightModeToggle = document.querySelector('.header__toggle-theme');
const body = document.querySelector('body');

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

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
  }
});

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
  if (window.innerWidth > 768) {
    closeMenu();
  }
});

// Theme toggle


const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-theme');
}

lightModeToggle.addEventListener('click', () => {
  const isLight = body.classList.toggle('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});


// Language switcher
const setLanguage = (lang) => {
  const elementsToTranslate = document.querySelectorAll('[data-i18n]');
  elementsToTranslate.forEach((element) => {
    const key = element.getAttribute('data-i18n');
    element.textContent = translations[lang][key];
  });
}

const langSelect = document.querySelector('.header__lang-switch');

langSelect.addEventListener('change', (e) => {
  const selectedLang = e.target.value;
  setLanguage(selectedLang);
  localStorage.setItem('lang', selectedLang);
});

const savedLang = localStorage.getItem('lang') || 'en';
langSelect.value = savedLang;
setLanguage(savedLang);


// Scroll Spy
const sections = document.querySelectorAll('section[id]');

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

// Initial call to set the active link on page load
window.addEventListener('scroll', activateScrollSpy);

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

