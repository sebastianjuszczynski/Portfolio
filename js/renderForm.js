import { formFields } from "./formFields.js";
import { getCurrentLang } from "./utils.js";

export const renderFormFields = () => {
    const lang = getCurrentLang();
    const inputsContainer = document.querySelector('.contact__form-inputs');
    const textareaContainer = document.querySelector('.contact__form-textarea--wrapper');

    if (!inputsContainer || !textareaContainer) return;

    const inputsHTML = formFields
        .filter(({ type }) => type !== "textarea")
        .map(({ name, type, placeholder, i18n }) => `
        <div class="contact__form-input--wrapper">
                            <label for="${name}" class="contact__form-visually--hidden">${name}</label>
                            <input type="${type}" name="${name}" id="${name}" required data-i18n-placeholder="${i18n}"
                                placeholder="${placeholder[lang]}">
                            <small class="error-message"></small>
                        </div>
        `)
        .join("");

    inputsContainer.innerHTML = inputsHTML;

    const textareaHTML = formFields
        .filter(({ type }) => type === "textarea")
        .map(({ name, type, placeholder, i18n }) => `
        
                            <label for="${name}" class="contact__form-visually--hidden">${name}</label>
                            <textarea type="${type}" name="${name}" id="${name}" required data-i18n-placeholder="${i18n}"
                                placeholder="${placeholder[lang]}" rows="6"></textarea>
                            <small class="error-message"></small>
                        
        `)
        .join("");

    textareaContainer.innerHTML = textareaHTML;

};

