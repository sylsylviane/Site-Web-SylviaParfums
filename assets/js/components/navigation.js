// VARIABLES
const liensNavigation = [
  {
    texteAAfficher: "accueil",
    lienDePage: "index.html",
  },
  {
    texteAAfficher: "À propos",
    lienDePage: "a propos.html   ",
  },
  {
    texteAAfficher: "Formulaire",
    lienDePage: "formulaire.html",
  },
];

// SÉLECTION HTML
const navHTML = document.querySelector("nav");

// FONCTIONS

/**
 * Fonction initialisée au chargement de la page
 */
export function init() {
  liensNavigation.forEach(function (element) {
    // permet d'obtenir un tableau contenant les valeurs des propriétés propres à un objet
    let valeur = Object.values(element);

    // récupère la valeur à la position 0 et l'affecte à la variable texte
    let texte = valeur[0];

    // récupère la valeur à la position 1 et l'affecte à la variable linePage
    let lienPage = valeur[1];

    // On appelle la fonction pour injecter les liens et le texte à afficher
    injecterLienNavigation(lienPage, texte);

    // conteneurModeNuit.addEventListener("click", changerModeNuit);

    let theme = localStorage.getItem("theme");
    document.body.dataset.theme = theme || "jour";
  });
}

/**
 * Fonction pour injecter le template du lien dans la navigation
 * @param {string} lien Le lien des pages dans le menu de navigation
 * @param {string} texte Le texte à afficher dans le menu de navigation
 */
function injecterLienNavigation(lien, texte) {
  //on appelle la fonction pour formater les liens
  let lienPageFormate = formaterLien(lien);

  //on appelle la fonction pour formater les textes à afficher
  let texteAAfficherFormate = formaterTexte(texte);

  //On crée le gabarit qui sera injecté dans le menu de navigation
  let gabarit = `<a href="${lienPageFormate}"/>${texteAAfficherFormate}</a>`;

  //On injecte le gabarit dans l'élément nav
  navHTML.insertAdjacentHTML("beforeend", gabarit);

  //On récupère les éléments a du nav
  let lienActif = navHTML.querySelectorAll("a");

  //Pour chaque élément de lienActif
  lienActif.forEach(function (element) {
    //On affecte la variable avec l'attribut href de l'élément
    let lienAjouteHref = element.href;

    //On affecte la variable avec les informations sur l'URL du document. Référence: https://developer.mozilla.org/fr/docs/Web/API/Document/location
    let pageActive = document.location.href;

    //Si les deux sont égales, on change le style de l'élément
    if (lienAjouteHref == pageActive) {
      element.style.fontWeight = "bold";
    }
  });
}

/**
 * Fonction pour formater les liens avant de l'injecter dans la navigation
 * @param {string} lien
 * @returns le lien de la page formaté
 */
function formaterLien(lien) {
  //supprime les espaces au début et à la fin du lienDePage
  let lienPageFormate = lien.trim();

  // met en minuscule le lienDePage
  lienPageFormate = lienPageFormate.toLowerCase();

  //Enlève les accents du lienDePage
  lienPageFormate = lienPageFormate
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  //Remplace les espaces du lienDePage par des tirets
  lienPageFormate = lienPageFormate.replaceAll(" ", "-");

  //On vérifie que le lien finit bien par html
  let motRecherche = ".html";
  let motPresent = lienPageFormate.includes(motRecherche);
  if (motPresent == false) {
    lienPageFormate = lien.concat(motRecherche);
  }

  return lienPageFormate;
}

/**
 * Fonction pour formater le texte à afficher avant de l'injecter dans la navigation
 * @param {string} texte
 * @returns Le texte à afficher formaté
 */
function formaterTexte(texte) {
  //supprime les espaces au début et à la fin du texte à afficher
  let texteFormate = texte.trim();
  // Met en majuscule la première lettre du texte à afficher
  texteFormate = texteFormate[0].toUpperCase() + texte.slice(1);

  return texteFormate;
}

// Exécution

// init();
