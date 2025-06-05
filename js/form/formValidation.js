import { translations } from '../i18n.js';
import { getCurrentLang } from '../utils.js';

let formTriedSubmit = false;

export const markFormTried = () => {
  formTriedSubmit = true;
};

export const shouldValidate = () => formTriedSubmit;

export const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validateField = (field) => {
    const value = field.value.trim();
    let isValid = true;
    let message = "";
    const errorEl = field.parentElement.querySelector(".error-message");

    if (field.name === "name") {
        
        if (!value || value.length < 3) {
            isValid = false;
            message = translations[getCurrentLang()].errorName;
        }
    }

    if (field.name === "email") {
        if (!validateEmail(value)) {
            isValid = false;
            message = translations[getCurrentLang()].errorEmail;
        }
    }

    if (field.name === "message") {
        if (value.length < 10) {
            isValid = false;
            message = translations[getCurrentLang()].errorMessage;
        }
    }

    if (!isValid) {
        field.classList.remove("input-valid");
        field.classList.add("input-error");
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add("visible");
        }
    } else {
        field.classList.remove("input-error");
        field.classList.add("input-valid");
        if (errorEl) {
            errorEl.textContent = "";
            errorEl.classList.remove("visible");
        }
    }

    return isValid;
};
export const validateForm = (form) => {
    const name = form.elements["name"];
    const email = form.elements["email"];
    const message = form.elements["message"];
    const isNameValid = validateField(name);
    const isEmailValid = validateField(email);
    const isMessageValid = validateField(message);

    return isNameValid && isEmailValid && isMessageValid;
};

    export const removeAllClasses = (form) => {
        const inputs = form.querySelectorAll("input, textarea");
        inputs.forEach((input) => {
            input.classList.remove("input-error", "input-valid");
            const errorEl = input.parentElement.querySelector(".error-message");
            if (errorEl) {
                errorEl.textContent = "";
                errorEl.classList.remove("visible");
            }
        });
    };

