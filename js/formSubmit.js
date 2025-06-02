// formSubmit.js
import { removeAllClasses } from './formValidation.js';
import { translations } from './i18n.js';
import { getCurrentLang } from './global.js';

export const handleFormSubmit = async (form, statusEl) => {
  
  const formData = new FormData(form);

  try {
    const res = await fetch("https://formspree.io/f/xbloydej", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    statusEl.textContent = res.ok
      ? translations[getCurrentLang()].successMessage
      : translations[getCurrentLang()].errorSubmit;

    statusEl.classList.add("show-message");

    if (res.ok) {
      form.reset();
      removeAllClasses(form);
    }

    setTimeout(() => {
      statusEl.classList.remove("show-message");
      statusEl.textContent = "";
    }, 4000);
  } catch {
    statusEl.textContent = translations[getCurrentLang()].errorNetwork;
    statusEl.classList.add("show-message");
  }
};
