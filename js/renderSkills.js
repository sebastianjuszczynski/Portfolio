import { skills } from "./skills.js";
import { applyScrollRevealToNewCards } from './scrollReveal.js';

export const renderSkills = () => {
    const container = document.querySelector('.section__skills-images--container');
    if (!container) return;
    const html = skills.map(({name, image}) => `
        <div class="section__skills-item flex__center scroll__reveal-item" title="${name}">
                        <img src="${image}"
                            class="icons" alt="${name} logo" loading="lazy" />
                    </div>
        `).join("");

        container.innerHTML = html;
        applyScrollRevealToNewCards();
};