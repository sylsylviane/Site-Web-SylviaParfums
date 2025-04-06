/**
 * Cette classe permet d'afficher des éléments au défilement de la page
 */
class ScrollAnimator {
  constructor(zone, targets) {
    this.zone = zone; // La zone d'intersection, null pour utiliser la fenêtre du navigateur comme zone d'intersection
    this.targets = targets; // Les éléments cibles à observer

    //Les options de l'intersection observer
    //root: null, //null pour observer le viewport
    //rootMargin: "0px", //Cela permet de décaler la zone d'intersection
    //threshold: 1, //Pourcentage de visibilité de l'élément pour déclencher l'intersection 1 = 100% de visibilité
    this.options = {
      root: this.zone,
      rootMargin: "0px",
      threshold: 0.5, //% de l'élément qui doit traverser la zone avant qu'il soit affiché
    };

    //Création de l'instance de l'intersection observer
    //On passe la fonction de rappel qui sera appelée lorsqu'un élément cible entre ou sort de la zone d'intersection
    this.observer = new IntersectionObserver(
      this.onIntersection.bind(this),
      this.options
    );

    //On observe les éléments cibles
    targets.forEach(
      function (target) {
        //On observe chaque élément cible
        this.observer.observe(target);
      }.bind(this)
    );
  }

  /**
   * Fonction de rappel appelée lorsqu'un élément cible entre ou sort de la zone d'intersection
   * @param {*} entries
   */
  onIntersection(entries) {
    //Entries est un tableau d'objets IntersectionObserverEntry, donc tous les éléments cibles observés
    entries.forEach(
      function (entry) {
        //entry est un objet IntersectionObserverEntry, donc un élément cible observé
        let element = entry.target; //L'élément HTML cible
        let intersecte = entry.isIntersecting; //Si l'élément cible est dans la zone d'intersection

        //Action à effectuer lorsque l'élément cible entre ou sort de la zone d'intersection
        // == MODIFIER LE CODE ICI EN FONCTION DE L'EFFET SOUHAITÉ
        if (intersecte == true) {
          element.classList.add("scale-in-bottom");
        }
      }.bind(this)
    );
  }
}
export default ScrollAnimator;
