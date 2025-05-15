const mobileButton = document.querySelector('.header__mobile-button');
const mobileMenu = document.querySelector('.header__menu');
const links = document.querySelectorAll('.header__menu-link');
const logo = document.querySelector('.header__logo-text');
const lightModeToggle = document.querySelector('.header__toggle-theme');
const body = document.querySelector('body');


const toggleMenu = () => {
  const isOpen = mobileButton.classList.toggle('open');
  mobileMenu.classList.toggle('header__menu--open', isOpen);
  mobileButton.setAttribute('aria-expanded', isOpen.toString());
};

const closeMenu = () => {
  mobileMenu.classList.remove('header__menu--open');
  mobileButton.classList.remove('open');
  mobileButton.setAttribute('aria-expanded', 'false');
};

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


