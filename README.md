# My Portfolio
# Personal Portfolio

[Live demo](https://sebastianjuszczynski.github.io/Portfolio/)

A fully responsive, accessible and lightweight portfolio website built with vanilla HTML, CSS and JavaScript — without any frameworks or bundlers.

## Features

- Light / Dark theme toggle (saved in localStorage)
- Smooth scroll animations using [ScrollReveal](https://scrollrevealjs.org/)
- Language switcher (English / Polish)
- Fully responsive layout (mobile-first)
- Sticky navigation with scroll spy using IntersectionObserver
- Accessible “skip to content” link for keyboard users
- Mobile menu with blur animation and ESC / click-outside handling
- Contact form with dynamic real-time validation (triggered after first submission)
- Modular JS structure for easy maintenance
- Clean, semantic HTML5 and modern CSS with variables and media queries

## Tech Stack

- **HTML5** – semantic structure  
- **CSS3** – custom properties (CSS variables), media queries, animations  
- **JavaScript (ES6+)** – modular approach, no frameworks  
- **ScrollReveal** – scroll-based animations  
- **IntersectionObserver API** – scroll spy and dynamic section highlighting  
- **localStorage** – theme and language preferences  

## 💡 SCSS Structure

The project uses modular SCSS architecture.  
Each section (header, hero, about, skills, projects, etc.) has its own file.  
These are imported into `main.scss`, which is compiled and minified into `main.min.css` using [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass).

Only `main.min.css` is used in the final build (referenced in `index.html`).


## Folder structure
Portfolio/
├── assets/
│ ├── gifs/
│ ├── icons/
│ └── images/
│ └── video/
├── css/
│ ├── about.scss
│ ├── contact.scss
│ ├── footer.scss
│ ├── global.scss
│ ├── hamburgers.scss
│ ├── header.scss
│ ├── hero.scss
│ ├── main.scss # SCSS entry file
│ ├── main.min.css # Compiled + minified CSS used in production
│ ├── projects.scss
│ ├── skills.scss
│ └── utilities.scss
├── js/
│ ├── app.js
│ ├── form/
│ │ └── formFields.js
│ ├── i18n.js
│ ├── projects.js
│ ├── renderForm.js
│ ├── renderProjects.js
│ ├── renderSkills.js
│ ├── scrollReveal.js
│ ├── skills.js
│ └── utils.js
├── index.html
└── README.md


## How to Use Locally

This is a static project — no installation needed.

### Run locally

Simply clone or download the repo and open `index.html` in your browser:

```bash
git clone https://github.com/sebastianjuszczynski/Portfolio.git
cd Portfolio
open index.html  # or just double-click the file in your file manager
```

- ✅ No dependencies
- ✅ No npm
- ✅ No build tools

## Demo GIFs (replace these with your own!)
### 🌙 Theme toggle (Light / Dark)
![Theme toggle demo](assets/gifs/light-dark.gif)
### 📱 Mobile menu animation
![Mobile menu animation demo](assets/gifs/mobileMenu.gif)
### 🌍 Language switch (EN/PL)
![Language switch demo](assets/gifs/langSwitch.gif)
### ✉️ Contact form with validation
![Contact form with validation demo](assets/gifs/form.gif)
### 🧝‍♂️ Scroll Spy & Animations
![Scroll Spy & Animations demo](assets/gifs/animations.gif)

## Known Issues
- The project uses only vanilla technologies, so animations on very low-end devices may vary slightly.

- JavaScript must be enabled for interactive features to work (form, animations, menu, etc).


## License
This project is open-sourced and free to use.
