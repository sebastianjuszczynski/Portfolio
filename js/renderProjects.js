import { projects } from "./projects.js";
import { getCurrentLang } from "./utils.js";
import { applyScrollRevealToNewCards } from './scrollReveal.js';


export const renderProjects = () => {
    const container = document.querySelector('.section__projects-card--container');
    if (!container) return;

    const lang = getCurrentLang();

    const html = projects.map(({ title, description, image, tech, link }) => `
    <div class="section__projects-card scroll__reveal-card">
                        <img class="section__projects-image" src="${image}"
                            alt="${title}" loading="lazy" />
                        <div class="section__projects-content">
                            <h3 class="section__projects-title">${title}</h3>
                            <p class="section__projects-description">${description[lang]}</p>
                            <div class="section__projects-tech">
                            ${tech.map(t => `
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${t}/${t}-original.svg"
                                    class="section__projects-tech--icon" alt="${t} logo" loading="lazy" title="${t}" />
                                    `).join("")}
                            </div>
                            <a class="section__projects-link"
                                href="${link}" target="_blank"
                                rel="noopener" aria-label="Check Movies Browser website">
                                <svg class="section__projects-svg">
                                    <use href="#icon-link"></use>
                                </svg>
                                <span data-i18n="projectsLink"></span>
                            </a>
                        </div>
                    </div>
    `).join("");

    container.innerHTML = html;
    applyScrollRevealToNewCards();
}