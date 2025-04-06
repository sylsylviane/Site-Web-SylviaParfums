const conteneurModeNuit = document.querySelector(".conteneur-mode-nuit");

export function init() {
  conteneurModeNuit.addEventListener("click", changerModeNuit);
}

/**
 * Fonction qui modifie le thème du site (mode sombre ou clair)
 * @param {evenement} evenement
 */
function changerModeNuit(evenement) {
  let target = evenement.target;
  let bouton = target.closest("[data-mode]");

  if (bouton !== null) {
    document.body.dataset.theme = bouton.dataset.mode;
    localStorage.setItem("theme", bouton.dataset.mode);
  }
}

init();
