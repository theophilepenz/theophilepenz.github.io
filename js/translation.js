// Fonction pour charger les traductions depuis translations.json (Fonction uniquement sous serveur)
let translations = {};
async function loadTranslations(lang) {

    if (Object.keys(translations).length === 0) {
        try {
            const response = await fetch('https://theophilepenz.github.io/js/translations.json');
            if (!response.ok) throw new Error("Erreur de chargement du fichier JSON");
            translations = await response.json();
        } catch (error) {
            console.error("Erreur lors du chargement des traductions :", error);
            return; // Arrêter l'exécution si le fichier ne charge pas
        }
    }

    localStorage.setItem("preferredLang", lang);

    document.querySelectorAll("[data-key]").forEach(element => {
        const key = element.getAttribute("data-key");
        const translation = getNestedTranslation(translations[lang], key);
        
        if (translation) {
            if (Array.isArray(translation)) {
                element.innerHTML = translation.join("<br>");
            } else {
                element.innerHTML = translation;
            }
        } else {
            console.warn("Traduction manquante pour la clé:", key);
        }
    });

    document.querySelector('.dropdown-toggle').innerHTML =
        (lang === 'fr' ? "🇫🇷 Français" : "🇪🇳 English") + ' <b class="caret"></b>';

    // Applique les traductions pour le résumé
    applyResumeTranslations(translations, lang);

    // Applique les traductions pour le portfolio
    applyPortfolioTranslations(translations, lang);
}

/*// À utiliser en local
const translations = {} ;

function loadTranslations(lang) {
    localStorage.setItem("preferredLang", lang);

    document.querySelectorAll("[data-key]").forEach(element => {
        const key = element.getAttribute("data-key");
        const translation = getNestedTranslation(translations[lang], key);

        if (translation) {
            if (Array.isArray(translation)) {
                element.innerHTML = translation.join("<br>"); // Sépare chaque élément par un saut de ligne
            } else {
                element.innerHTML = translation;
            }
        } else {
            console.warn("Traduction manquante pour la clé:", key);
        }
    });

    document.querySelector('.dropdown-toggle').innerHTML =
        (lang === 'fr' ? "🇫🇷 Français" : "🇪🇳 English") + ' <b class="caret"></b>';

    // Applique les traductions pour le résumé
    applyResumeTranslations(translations, lang);

    // Applique les traductions pour le portfolio
    applyPortfolioTranslations(translations, lang);
}*/


function getNestedTranslation(obj, key) {
    return key.split('.').reduce((acc, part) => acc && acc[part], obj);
}

// Charger la langue sauvegardée au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
    const lang = localStorage.getItem("preferredLang") || "fr";
    loadTranslations(lang);
});

function applyResumeTranslations(translations, lang) {
    const resume = translations[lang].resume;
    
    document.querySelector("[data-key='resume.title']").innerHTML = resume.title;
    document.querySelector("[data-key='resume.education']").innerHTML = resume.education;
    document.querySelector("[data-key='resume.experience']").innerHTML = resume.experience;

    const educationContainer = document.querySelector("#education-list");
    const experienceContainer = document.querySelector("#experience-list");

    educationContainer.innerHTML = ""; // Réinitialiser le contenu
    experienceContainer.innerHTML = ""; // Réinitialiser le contenu

    // Génération dynamique des études
    resume.entries.education.forEach(entry => {
        let detailsHTML = entry.details ? entry.details.map(detail => `<p>${detail}</p>`).join("") : "";
        educationContainer.innerHTML += `
            <div class="wrapper right">
                <div class="content">
                    <div class="education-area">
                        <h6>${entry.date}</h6>
                        <h4>${entry.school}</h4>
                        <h3>${entry.degree}</h3>
                        ${detailsHTML}
                    </div>
                </div>
            </div>
        `;
    });

    // Génération dynamique des expériences professionnelles
    resume.entries.experience.forEach(entry => {
        let detailsHTML = entry.details ? entry.details.map(detail => `<p>${detail}</p>`).join("") : "";
        experienceContainer.innerHTML += `
            <div class="wrapper right">
                <div class="content">
                    <div class="experience-area">
                        <h6>${entry.date}</h6>
                        <h4 class="mb-2">${entry.company}</h4>
                        <h3 class="mb-2">${entry.role}</h3>
                        ${detailsHTML}
                    </div>
                </div>
            </div>
        `;
    });
}

function applyPortfolioTranslations(translations, lang) {
    const portfolio = translations[lang].portfolio;

    // Mettre à jour le titre du portfolio
    document.querySelector("[data-key='portfolio.title']").innerHTML = portfolio.title;

    const portfolioContainer = document.querySelector("#portfolio-projects");

    portfolioContainer.innerHTML = ""; // Réinitialiser le contenu

    // Génération dynamique des projets du portfolio
    portfolio.projects.forEach((project, index) => {
        let descriptionsHTML = project.descriptions ? project.descriptions.map(desc => `<p>${desc}</p>`).join("") : "";
        let technologiesHTML     = project.technologies ? project.technologies.map(tech => `<li>${tech}</li>`).join("") : "";
let gameplayMechanicsHTML= project.gameplay_mechanics ? project.gameplay_mechanics.map(m => `<li>${m}</li>`).join("") : "";
let challengesHTML       = project.challenges ? project.challenges.map(c => `<li>${c}</li>`).join("") : "";
let learnHTML            = project.learn ? project.learn.map(l => `<li>${l}</li>`).join("") : "";

        let colClass = "";

        if (index === 0) {
            colClass = "col-12 portfolio-big";
        } else {
            colClass = "col-sm-4 col-md-6 col-lg-4";
        }

        portfolioContainer.innerHTML += `
            <div class="${colClass}">
                <div class="gallery-items wow fadeInDown" data-wow-delay="0.2s">
                    <div class="view img" href="#" data-toggle="modal" data-target=".bd-example-modal-lg">
                        <img src="${project.image}" alt="${project.name}">
                        <div class="hidden Mimg" data-src="${project.full_image}"></div>
                        <div class="hidden Mtext" data-title="${project.name}">
                            <p>${descriptionsHTML}</p>
                            <h3>${project.titles.technologies}</h3>
                            <ul>${technologiesHTML}</ul>
                            <h3>${project.titles.gameplay_mechanics}</h3>
                            <ul>${gameplayMechanicsHTML}</ul>
                            <h3>${project.titles.challenges}</h3>
                            <ul>${challengesHTML}</ul>
                            <h3>${project.titles.learn}</h3>
                            <ul>${learnHTML}</ul>
                            <h3>${project.titles.game_preview}</h3>
                            <div class="col-12 portfolio-small">
                                ${project.game_preview.images.map(image => `<img src="${image}" alt="Aperçu du projet">`).join('')}
                            </div>
                            <p class="centred-text">${project.titles.video}</p>
                            <div class="video-container">
                                <iframe src="${project.game_preview.video}" title="YouTube video player" 
                                frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
                                encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>
                            <h3>${project.titles.github_title}</h3>
                            <p><a href="${project.github_link}" target="_blank">${project.titles.github_link}</a></p>
                        </div>
                    </div>
                    <div class="gallery-text">
                        <h2>${project.name}</h2>
                    </div>
                </div>
            </div>
        `;
    });
}

// Gérer l'affichage du modal à l'ouverture d'un projet
$(document).on('click', '.view.img', async function () {
    console.log("Ouverture du modal...");
    const modal = $('.bd-example-modal-lg');
    const projectTitle = $(this).find('.gallery-text h2').text();
    const modalContent = $(this).find('.hidden.Mtext').html();
    const modalImgSrc = $(this).find('.hidden.Mimg').attr('data-src');

    // Vérifie si les traductions sont bien chargées
    if (!translations || Object.keys(translations).length === 0) {
        console.warn("Les traductions ne sont pas encore chargées. Chargement...");
        const lang = localStorage.getItem("preferredLang") || "fr";
        await loadTranslations(lang);
    }

    // Mettre à jour le contenu du modal
    $('#modalTitle').text(projectTitle);
    $('#modalText').html(modalContent);
    $('#modalImg').attr('src', modalImgSrc);

    // Afficher la pop-up
    modal.modal('show');
});
