class Carrousel {
  constructor(conteneurHTML, tableauImages) {
    //ConteneurHTML
    this.conteneurHTML = conteneurHTML;
    this.imageConteneur = this.conteneurHTML.querySelector(".image-principale");
    this.boutonAvancer = this.conteneurHTML.querySelector(".boutonAvancer");
    this.boutonAvancer = this.conteneurHTML.querySelector(".boutonAvancer");
    this.boutonReculer = this.conteneurHTML.querySelector(".boutonReculer");

    //Liste d'images à afficher
    this.tableauImages = tableauImages;

    this.position = 0;
    let idInterval;
    idInterval = setInterval(this.avancer.bind(this), 3000);
    this.boutonAvancer.addEventListener(
      "click",
      function () {
        clearInterval(idInterval);
        this.avancer();
        idInterval = setInterval(this.avancer.bind(this), 3000);
      }.bind(this)
    );

    this.boutonReculer.addEventListener(
      "click",
      function () {
        clearInterval(idInterval);
        this.reculer();
        idInterval = setInterval(this.reculer.bind(this), 3000);
      }.bind(this)
    );
  }

  /**
   * Fonction pour afficher les images du carrousel
   */
  afficherImage(source) {
    this.imageConteneur.classList.remove("fade-in");
    setTimeout(
      function () {
        this.imageConteneur.src = source;
        this.imageConteneur.classList.add("fade-in");
      }.bind(this),
      100
    );
  }

  /**
   * Fonction pour avancer dans le carrousel
   */
  avancer() {
    this.position++;
    console.log(this.position);
    
    if (this.position >= this.tableauImages.length) {
      this.position = 0;
    }

    let image = this.tableauImages[this.position];
    this.afficherImage(image);
  }
  /**
   * Fonction pour reculer dans le carrousel
   */
  reculer() {
    this.position--;
    if (this.position < 0) {
      this.position = this.tableauImages.length - 1;
    }
    let image = this.tableauImages[this.position];
    this.afficherImage(image);
  }
}

export default Carrousel;
