import { init as initNavigation } from "../components/navigation.js";
import { init as initModeNuit } from "../components/mode-nuit.js";
// VARIABLES
let sectionActuelle = 0;
let estValide = false;

//SÉLECTEURS
const formulaire = document.querySelector("form");
const sections = formulaire.querySelectorAll("section");
const boutonsContinuer = formulaire.querySelectorAll("[data-direction='1']");
const boutonsRetour = formulaire.querySelectorAll("[data-direction='-1']");
const premierBtnRetour = formulaire.querySelector(
  ".navigation-section>div:first-of-type"
);
const dernierBtnContinuer = formulaire.querySelector("div[type='submit']");
const sectionLivraison = formulaire.querySelector(".optionLivraison");
const sectionResume = document.querySelector(".resume");
const champs = document.querySelectorAll("input, select, textarea");
const boutonEnvoyer = formulaire.querySelector("input[type='submit']");
const boutonRadio = formulaire.querySelectorAll("input[type='radio']");
const premierBoutonRadio = formulaire.querySelector(".premierBoutonRadio");
const resumeTransporteur = formulaire.querySelector(
  "[data-name='transporteur']"
);

//FONCTIONS
function init() {
  toutCacher();
  afficherSection();
  initModeNuit();
  premierBoutonRadio.checked = true;
  resumeTransporteur.textContent = "Poste Canada";

  // AFFICHAGE DES SECTIONS
  boutonsContinuer.forEach(function (bouton) {
    bouton.addEventListener("click", avancerSection);
  });

  boutonsRetour.forEach(function (bouton) {
    bouton.addEventListener("click", reculerSection);
  });

  //VALIDATION
  champs.forEach(function (champ) {
    champ.addEventListener("change", onChangementChamp);
  });

  formulaire.addEventListener("submit", onSubmit);
  initNavigation();

}

/**
 * Fonction lors de changement dans les champs
 * @param {object} evenement
 */
function onChangementChamp(evenement) {
  const declencheur = evenement.currentTarget;

  formatterChamps(declencheur);

  validerChampPersonnalise(declencheur);

  gererChampException(declencheur);

  validerChamp(declencheur);

  verifierFormulaireValide;
}

/**
 * Fontion pour soumettre l'envoi du formulaire
 * @param {object} evenement
 */
function onSubmit(evenement) {
  evenement.preventDefault();

  //VALIDATION
  if (formulaire.checkValidity()) {
    formulaire.submit();
    formulaire.reset(); //Réinitialise le formulaire
  }
}

/**
 * Fonction pour valider le formulaire
 */
function verifierFormulaireValide() {
  if (formulaire.checkValidity()) {
    boutonEnvoyer.disabled = false;
  } else {
    boutonEnvoyer.disabled = true;
  }
}

/**
 * Fonction pour formatter les valeurs des inputs.
 *      Type email: tout en minuscule
 *      Name codePostal: tout en majuscule avec espace
 *      Type tel: séparé par des tirets
 *      Autre type: Ajout d'une majuscule à toutes les premières lettre d'un mot
 * @param {object} declencheur
 */
function formatterChamps(declencheur) {
  const nom = declencheur.value.trim();
  const nomEnMinuscule = nom.toLowerCase();

  let tableauMot = nomEnMinuscule.split(" ");
  tableauMot.forEach(function (mot, index) {
    if (mot !== "") {
      let premiereLettre = mot[0];
      let enMajuscule = premiereLettre.toUpperCase();
      let restantDuMot = mot.slice(1);
      let nouvelleChaine = enMajuscule + restantDuMot;
      tableauMot[index] = nouvelleChaine;
    }
  });
  let nomFormatte = tableauMot.join(" ");

  if (
    declencheur.name !== "optionsSuccursales" &&
    declencheur.name !== "commentaire"
  ) {
    if (declencheur.type == "email") {
      declencheur.value = declencheur.value.replace(nom, nomEnMinuscule);
    } else if (declencheur.name == "codePostal") {
      declencheur.value = declencheur.value
        .replace(/([A-z][0-9][A-z])\s?([0-9][A-z][0-9])/, "$1 $2")
        .toUpperCase();
    } else if (declencheur.type == "tel") {
      declencheur.value = declencheur.value.replace(
        /(\d{3})([\-\s]?)(\d{3})([\-\s]?)(\d{4})/,
        "$1-$3-$5"
      );
    } else {
      declencheur.value = declencheur.value.replace(nom, nomFormatte);
    }
  }
}

/**
 * Fonction pour gérer l'input de type checkbox.
 * @param {object} declencheur
 */
function gererChampException(declencheur) {
  const succursales = formulaire.querySelector("[name='optionsSuccursales']");
  const livraison = formulaire.querySelector(".livraison");
  const transporteurs = formulaire.querySelectorAll("[name='transporteur']");
  const resumeLivraisonEnMagasin = formulaire.querySelector(
    "[data-name='livraisonMagasin']"
  );
  const resumeSuccursale = formulaire.querySelector(
    "[data-name='optionsSuccursales']"
  );

  if (declencheur.type == "checkbox") {
    if (declencheur.checked) {
      succursales.disabled = false;
      succursales.required = true;
      livraison.classList.add("inactif");
      resumeTransporteur.textContent = "";
      transporteurs.forEach(function (transporteur) {
        transporteur.checked = false;
      });
      afficherResumeCheckbox(declencheur.name, declencheur.checked);
    } else {
      succursales.disabled = true;
      succursales.value = "";
      livraison.classList.remove("inactif");
      premierBoutonRadio.checked = true;
      resumeLivraisonEnMagasin.textContent = "";
      resumeSuccursale.textContent = "";
      resumeTransporteur.textContent = "Poste Canada";
    }
  } else {
    afficherResume(declencheur.name, declencheur.value);
  }
}

/**
 * Fonction pour afficher Oui dans la section résumé si le champs n'est pas null (checkbox)
 * @param {string} nomChamp
 * @param {boolean} estCoche
 */
function afficherResumeCheckbox(nomChamp, estCoche) {
  const champResume = sectionResume.querySelector(`[data-name="${nomChamp}"]`);

  if (champResume !== null) {
    let texte = "Oui";
    champResume.textContent = texte;
  }
}

/**
 * Fonction pour valider le champ personnalisé - pays
 * @param {object} declencheur
 */
function validerChampPersonnalise(declencheur) {
  if (declencheur.name == "pays") {
    if (!declencheur.value.endsWith("Canada")) {
      declencheur.setCustomValidity("Veuillez inscrire une adresse canadienne");
      const messageErreur = declencheur.validationMessage;
      declencheur.nextElementSibling.textContent = messageErreur;
    } else {
      declencheur.setCustomValidity("");
    }
  } else {
    afficherResume(declencheur.name, declencheur.value);
  }
}

/**
 * Fonction pour valider les champs et activer les boutons continuer si tous les champs sont bien remplis.
 * @param {object} declencheur
 */
function validerChamp(declencheur) {
  const estValide = declencheur.checkValidity();
  const sectionParent = declencheur.closest("section");
  const champsSection = sectionParent.querySelectorAll("[name]");
  const tableauValidation = [];

  if (estValide == false) {
    declencheur.classList.add("invalid");
    sectionParent
      .querySelector(".bouton[data-direction='1']")
      .classList.add("inactif");
  } else {
    declencheur.classList.remove("invalid");
  }

  if (estValide) {
    champsSection.forEach(function (champ) {
      const estValide = champ.checkValidity();
      tableauValidation.push(estValide);
    });

    const sectionInvalide = tableauValidation.includes(false);

    if (sectionInvalide == true) {
      sectionParent
        .querySelector(".bouton[data-direction='1']")
        .classList.add("inactif");
    } else {
      sectionParent
        .querySelector(".bouton[data-direction='1']")
        .classList.remove("inactif");
    }
  }
}

/**
 * Fonction pour afficher la valeur des champs dans la section résumé (autre que checkbox)
 * @param {string} nomChamp
 * @param {string} valeur
 */
function afficherResume(nomChamp, valeur) {
  const champResume = sectionResume.querySelector(`[data-name="${nomChamp}"]`);

  if (champResume !== null) {
    champResume.textContent = valeur;
  }
}

/**
 * Fonction pour masquer les sections
 */
function toutCacher() {
  sections.forEach(function (element) {
    element.classList.add("invisible");
  });
}

/**
 * Fonction pour afficher les sections
 */
function afficherSection() {
  toutCacher();
  sections[sectionActuelle].classList.remove("invisible");

  // Désactiver le bouton retour si on est sur la première section
  if (sectionActuelle === 0) {
    premierBtnRetour.classList.add("invisible");
  }
}

/**
 * Fonction pour avancer dans les sections
 */
function avancerSection() {
  sectionActuelle++;

  if (sectionActuelle < sections.length) {
    afficherSection();
  }
}

/**
 * Fonction pour reculer dans les sections
 */
function reculerSection() {
  sectionActuelle--;

  if (sectionActuelle >= 0) {
    afficherSection();
  }
}

// EXECUTION

init();
