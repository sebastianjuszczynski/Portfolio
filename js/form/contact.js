import {
  validateField,
  validateForm,
  markFormTried,
  shouldValidate
} from './formValidation.js';
import { handleFormSubmit } from './formSubmit.js';

export const initContactForm = () => {
  const form = document.querySelector("#contact-form");
  const statusEl = document.querySelector(".form__status");

  if (!form) return;

  const inputs = form.querySelectorAll("input, textarea");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    markFormTried();
    const isFormValid = validateForm(form);
    if (!isFormValid) return;
    handleFormSubmit(form, statusEl);
  });

  inputs.forEach((field) => {
    field.addEventListener("input", () => {
      if (shouldValidate()) {
        validateField(field);
      }
    });
  });
};