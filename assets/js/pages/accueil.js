import { init as initNavigation } from "../components/navigation.js";
import { init as initModeNuit } from "../components/mode-nuit.js";

// VARIABLES
const tableauProduits = [
  {
    id: "0001",
    nom: "Wind Flowers",
    prix: 110,
    description:
      "Une eau de parfum audacieuse et envoûtante. Notes chaudes de lavande, de fleur d’oranger et de musc. Parfait pour les femmes confiantes et passionnées",
    genre: "Femme",
    src: "parfum-1.jpg",
  },
  {
    id: "0002",
    nom: "Ivy Dubai",
    prix: 175,
    description:
      "Un parfum dandy, élégant et sophistiqué. Il mêle la lavande, la vanille et le musc, créant une fragrance intemporelle et réconfortante. Parfait pour les hommes qui apprécient la tradition et la qualité.",
    genre: "Homme",
    src: "parfum-2.jpg",
  },
  {
    id: "0003",
    nom: "Ivy Dubai by night",
    prix: 90,
    description:
      "Un classique intemporel créé en 1966, il est l’un des parfums les plus vendus au pays. Sa recette simple et indémodable met en avant la bergamote, le citron, le basilic, la sauge et le romarin, avec des accords chyprés et épicés.",
    genre: "Homme",
    src: "parfum-3.jpg",
  },
  {
    id: "0004",
    nom: "Golden Black Miss",
    prix: 70,
    description:
      "Un parfum floral luxuriant. Mélange de jasmin, de tubéreuse et de gardénia. Évoque la beauté naturelle et la féminité",
    genre: "Femme",
    src: "parfum-4.jpg",
  },
  {
    id: "0005",
    nom: "Queen of seduction",
    prix: 120,
    description:
      "Un classique intemporel. Notes de rose, de jasmin et de magnolia. Élégant et sensuel, idéal pour les occasions spéciales",
    genre: "Femme",
    src: "parfum-5.jpg",
  },
];
const chemin = ["assets", "img"];

// SÉLECTION HTML

const listeParfumsHTML = document.querySelector(".liste-parfums");
const boutonMoinsDeCent = document.querySelector(".moinsDeCent");
const boutonTriAsc = document.querySelector(".tri-asc");
const boutonParfumHomme = document.querySelector(".parfumHomme");
const aside = document.querySelector(".aside");



/* FONCTIONS */
/**
 * Fonction appelée au chargement de la page.
 */
function init() {
  initNavigation();
  initModeNuit();
  //On appelle la fonction afficherImagesProduits
  afficherImagesProduits(tableauProduits);

  // Ajout d'un évênement lorsque le filtre boutonMoinsDeCent est cliqué
  boutonMoinsDeCent.addEventListener("click", function () {
    trierMoinsDeCentDollars(tableauProduits, 100);
  });
  // Ajout d'un évênement lorsque le filtre boutonTriAsc est cliqué
  boutonTriAsc.addEventListener("click", function () {
    prixCroissant(tableauProduits);
  });
  // Ajout d'un évênement lorsque le filtre boutonParfumHomme est cliqué
  boutonParfumHomme.addEventListener("click", function () {
    triParfumHomme(tableauProduits);
  });
}

/**
 * Fonction qui affiche les images dans la section produits après avoir formater la source des images
 * @param {array} tableau
 */
function afficherImagesProduits(tableau) {
  // Appelle la fonction vider la liste
  viderListe();

  // Appelle la fonction formaterNomImage pour la propriété src de chaque élément du tableau
  tableau.forEach(function (element) {
    let sourceImage = formaterNomImage(element.src);
    // On initialise la variable template avec les éléments HTML désiré et la variable sourceImage qui a été formatée auparavant
    const template = `
            <div class="parfum" id="${element.id}">
                <img src="${sourceImage}" alt="Image de parfum" />
                <div>
                    <h3>${element.nom}</h3>
                    <p>#Id: ${element.id}</p>
                    <p>Prix: ${element.prix}$</p>
                </div>
            </div>
            `;

    // On injecte le gabarit dans le div avec la classe liste-parfums
    listeParfumsHTML.insertAdjacentHTML("beforeend", template);

    //permet de récupérer les éléments ayant la classe parfum
    let elementAjoute = listeParfumsHTML.lastElementChild;

    //On ajoute un écouteur d'évênement aux éléments ayant la classe parfum en appelant la fonction afficheImage qui injecte la nouvelle image dans l'aside et ajoute une bordure autour de l'élément cliqué
    elementAjoute.addEventListener("click", function () {
      ajouteBordure(elementAjoute);

      // On affecte le id de l'élément à la variable produitSelectionne
      let produitSelectionne = elementAjoute.id;
      //On appelle la fonction avec le tableau de produits en paramètre et le id de l'élément cliqué
      afficheImageAside(tableauProduits, produitSelectionne);
    });
  });
}

/**
 * Fonction pour vider une liste
 */
function viderListe() {
  listeParfumsHTML.innerHTML = "";
  aside.innerHTML = "";
}

/**
 * Fonction pour formater le nom de l'image
 * @param {string} lien
 * @returns La source de l'image formaté qui sera utilisée pour afficher l'image
 */
function formaterNomImage(lien) {
  //On initialise la variable base en appelant la fonction formaterChemin en lui donnant le tableau chemin en paramètre.
  let base = formaterChemin(chemin);

  // On enlève les espaces à la fin et au début du lien
  let cheminFormate = lien.trim();

  // On met en minuscule
  cheminFormate = cheminFormate.toLowerCase();

  // On remplace les espaces par des tirets s'il y en a
  cheminFormate = cheminFormate.replaceAll(" ", "-");

  // On concatène les dossier assets, img et le chemin formaté pour former la source des images
  let sourceImage = `${base}${cheminFormate}`;

  //Retourne la source de l'image formatée
  return sourceImage;
}

/**
 * Fonction pour formater le chemin de l'image
 * @param {array} tableau Tableau des chemins pour formater la source des éléments
 * @returns Une chaine de caractère (le chemin formaté assets/img/)
 */
function formaterChemin(tableau) {
  //On initialise la variable chemin à un chaine vide
  let chemin = "";
  //On utilise la méthode join pour changer le tableau en chaine de caractère. On définit le séparateur / pour joindre les éléments du tableau
  chemin = `${tableau.join("/")}/`;
  //Retourne la chaine de caractère créée
  return chemin;
}

/**
 * Fonction qui change le style d'un élément
 * @param {string} elementHTML
 */
function ajouteBordure(elementHTML) {
  //On récupère les éléments ayant la classe parfum
  let parfums = document.querySelectorAll(".parfum");
  // pour chaque élément ayant la classe parfum
  parfums.forEach(function (element) {
    // on met un style border vide pour que style disparaisse lorsqu'on clique sur une nouvelle photo
    element.classList.remove("bordure");
  });
 elementHTML.classList.add("bordure");
}
/**
 * Fonction pour afficher l'image dans l'aside
 * @param {array} tableau Tableau de produits
 * @param {integer} id Le id du produit sur lequel on clique
 */
function afficheImageAside(tableau, id) {
  //Pour chaque élément du tableau
  tableau.forEach(function (element) {
    //On formate la source de l'image
    let sourceImage = formaterNomImage(element.src);
    //Si la propriété id de l'élément est égale au id passé en paramètre, on injecte le template dans l'aside
    if (element.id == id) {
      let templateAside = `
                <img src="${sourceImage}" width = 600 alt="Image 1" id="${element.id}">
                <div>
                    <h3>${element.nom}</h3>
                    <p>#${element.id}</p>
                    <p>${element.description}</p>
                    <p>${element.prix}$</p>
                </div>
                `;
      aside.innerHTML = templateAside;
    }
  });
}

/**
 * Fonctin qui permet d'afficher les items d'un tableau ayant un prix de 100$ et moins
 * @param {array} tableau Tableau de produits
 * @param {integer} prix Le prix selon lequel on veut trier le tableau
 * @returns Un tableau de produits trié selon le paramètre de prix voulu
 */
function trierMoinsDeCentDollars(tableau, prix) {
  //On initialise un tableau vide dans lequel on ajoutera les produits
  let prixFiltre = [];

  for (let i = 0; i < tableau.length; i++) {
    if (tableau[i].prix <= prix) {
      prixFiltre.push(tableau[i]);
    }
  }

  return afficherImagesProduits(prixFiltre);
}

/**
 *Fonction pour trier les produits par prix croissant
 * @param {array} tableau
 * @returns Un tableau de produit trié par prix croissant
 */
function prixCroissant(tableau) {
  let copie = [...tableau];
  copie.sort(function (albumA, albumB) {
    if (albumA.prix < albumB.prix) {
      return -1;
    } else if (albumA.prix > albumB.prix) {
      return 1;
    } else {
      return 0;
    }
  });

  return afficherImagesProduits(copie);
}
/**
 * Fonction qui tri les produits par genre
 * @param {array} tableau
 * @returns Un tableau de produits trié selon le genre
 */
function triParfumHomme(tableau) {
  let parfumHomme = [];

  parfumHomme = tableau.filter(function (element, index) {
    if (element.genre == "Homme") {
      return true;
    } else {
      return false;
    }
  });
  return afficherImagesProduits(parfumHomme);
}

//Exécution
init();
