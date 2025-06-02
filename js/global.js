let lang = localStorage.getItem('lang') || 'en';

export const getCurrentLang = () => lang;

export const setLanguageLocalStorage = (newLang) => {
  lang = newLang;
  localStorage.setItem('lang', newLang);
};