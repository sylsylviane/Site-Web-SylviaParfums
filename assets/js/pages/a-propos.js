import { init as initNavigation } from "../components/navigation.js";
import {
  init as initModale,
  afficherModale,
  cacherModale,
} from "../components/modale.js";

import Carrousel from "../classes/Carrousel.js";
import ScrollAnimator from "../classes/ScrollAnimator.js";
import { init as initModeNuit } from "../components/mode-nuit.js";

/**
 * Fonction au chargement de la page
 */
function init() {
  initNavigation();
  initModale();
  initModeNuit();
  setTimeout(function () {
    afficherModale();
  }, 5000);

  let carrouselConteneur = document.querySelector("[data-carrousel]");
  let tableauImages = [
    "assets/img/carrousel-1.jpg",
    "assets/img/carrousel-2.jpg",
    "assets/img/carrousel-3.jpg",
    "assets/img/carrousel-4.jpg",
    "assets/img/carrousel-5.jpg",
    "assets/img/carrousel-6.jpg",
    "assets/img/carrousel-7.jpg",
  ];
  let carrousel = new Carrousel(carrouselConteneur, tableauImages);

  let zone = null; //si null c'est la page
  let cibles = document.querySelectorAll(".section");
  new ScrollAnimator(zone, cibles); //besoin de la classe sans-opacité pour fonctionner
}

init();
