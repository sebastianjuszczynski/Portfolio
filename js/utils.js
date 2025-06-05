let lang = localStorage.getItem('lang') || 'en';

export const getCurrentLang = () => lang;

export const setLanguageLocalStorage = (newLang) => {
  lang = newLang;
  localStorage.setItem('lang', newLang);
};
export const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};
