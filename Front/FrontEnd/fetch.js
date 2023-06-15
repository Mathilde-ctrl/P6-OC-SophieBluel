/**
 * fetch.js
 * 
 * Gestion de l'authentification de l'administratice
 * 
 * @author Mathilde Plancq
 * @version 1.0
 * @date 2023-06
 */

//--- Affichage des projets sur la page web index.html ---
   
/**
 * Effectue une requête http 'GET' 
 * 
 * Permet de récupérer les données des projets 
 * 
 */
fetch('http://localhost:5678/api/works') 
  // APIreponse correspond à la reponse renvoyer par la requête 
  // Convertit la réponse avec la méthode .json() pour lire les données avec JavaScript
  .then(APIreponse => APIreponse.json())
  // Les données récupérées sont accessibles dans 'tousProjetsJSON'
  .then(tousProjetsJSON => {   
    
    //--- Déclare mes fonctions ---   
   /**
    * Fonction afficheProjetsGalerie
    * 
    * @param {any} projets 
    */
    function afficheProjetsGalerie(projets) {
      /**
       * @var Element HTMLgalleryElement - Sélectionne la balise <div> dans index.html et indexedit.html
       */ 
      const HTMLgalleryElement = document.querySelector('.gallery');
      // Efface la galerie existante pour assurer que seule la catégorie sélectionnée est affichée.
      HTMLgalleryElement.innerHTML = '';              
  
      /**
       * Boucle d'itération pour permettre l'affichage de 'projets' en créant : 
       * - une balise <figure> pour contenir les éléments
       * - une balise <img> pour afficher l'image
       * - une balise <p> pour mentionner le titre du projet
       */
      for (let i = 0; i < projets.length; i++){ 
        //--- Déclaration de VARIABLE LOCALE pour récupérer des infos présent dans 'projets' ---
        /**
         * @var any projet - sélectionne un projet avec index 'i' qui est en cours de traitement
         */
        const projet = projets[i];
        /**
         * @var any projetId - récupère la propriété .id présent dans 'projet' 
         */
        const projectId = projet.id 

        //--- Déclaration de VARIABLE LOCALE pour créer des élements d'affichage pour chaque projet ---
        /**
         * @var HTMLElement JsfigureElement - Création d'une balise <figure> pour contenir les éléments
         */      
        const JsfigureElement = document.createElement('figure');
        /**
         * @var HTMLImageElement JsimgElement - création d'une balise <img> 
         */
        const JsimgElement = document.createElement('img');
        /**
         * @var HTMLParagrapheElement JstextElement - création d'une zone de texte avec la balise <p>
         */
        const JstextElement = document.createElement('p');

        // Enregistre un attribut personnalisé contenant la valeur de 'projetId'
        JsfigureElement.setAttribute('data-projet', projectId)  
        // AJoute l'url de l'image 
        JsimgElement.src = projet.imageUrl;
        //Ajoute le titre de l'image en texte alternatife
        JsimgElement.alt = projet.title;
        // Ajoute le titre du projet
        JstextElement.innerHTML = projet.title;
        
        //--- Organisations des éléments --- 
        /**
         * Ajout de : 
         * - l'image charger 'modaleJsimgElement'
         * - le texte créer 'modaleJsTextElement'
         * en tant qu'enfant de la balise <figure> 'JsfigureElement' pour contenir le tout.
         */
        JsfigureElement.appendChild(JsimgElement);
        JsfigureElement.appendChild(JstextElement);

        /**
         * Ajout de la balise <figure> 'JsfigureElement' en tant qu'enfant de la balise <div> 'HTMLgalleryElement'
         * 
         * Permet de contenir chaque figure de projet dans ce conteneur pour afficher la galerie
         */
        HTMLgalleryElement.appendChild(JsfigureElement);
      };
    } 

    // Fonction pour filtrer les projets par catégorie
    /**
     * Fonction filtreMesProjets
     * 
     * @param {any} filtreSelectionne 
     * 
     * Permet de définir les conditions  d'affichage des boutons de filtres
     */
    function filtreMesProjets(filtreSelectionne) {
      //Condition Si paramètre est null alors on execute ce code
      if (filtreSelectionne === null) {
        //la fonction afficheProjetsGalerie est appelé avec pour paramètre tousProjetsJSON qui représente l'ensemble des projets
        afficheProjetsGalerie(tousProjetsJSON);
        //Sinon ce code est execute 
      } else {
        /**
         * @var any mesProjetsFiltres - 
         * 
         * Filtre les projets dans 'tousProjetsJSON' en fonction de la propriété categoryId
         */
        const mesProjetsFiltres = tousProjetsJSON.filter(chaqueProjet => chaqueProjet.categoryId === filtreSelectionne);
        // Appele la fonction afficheProjetsGalerie avec pour paramètre les résultats du filtrage
        afficheProjetsGalerie(mesProjetsFiltres);
      }
    }
    
    
    //-------------------------------------------------------------------------------------------------------------------

    /**
     * @var Element divFiltre - Sélectionne le conteneur <div> pour afficher les boutons de filtre
     */
    const divFiltre = document.querySelector(".filtre");

    //--- Création du Bouton "TOUS" ---
    /**
     * @var HTMLButtonElement tousBouton - Création d'un bouton pour faire un filtre
     */
    const tousBouton = document.createElement('button');
    // Ajout du texte dans le bouton
    tousBouton.textContent = "Tous";
    // Ajout d'une classe css pour que le bouton soit actif à l'arriver sur la page web 
    tousBouton.classList.add('active');
    //AJout du bouton de filtrage créé dans le conteneur div 
    divFiltre.appendChild(tousBouton);

    //--- Evenement au click du bouton "TOUS" pour lancer la fonction Fonction filtreMesProjets(null) et toggle la classe ---
    /**
     * Ajout d'un écouteur d'évenement sur le bouton tous 
     * 
     * Permet au moment du click de réaliser le code suivant
     */
    tousBouton.addEventListener('click', () => {
      //Fonction fléché anonyme qui execute le code suivant

      //Appele la fonction filtreMesProjets avec pour parametre 'null'
      filtreMesProjets(null);
      /**
       * @var NodeListOf<Element> boutons Sélectionne TOUS les boutons dans le conteneur <div> de filtre
       */
      const boutons = document.querySelectorAll('.filtre button');
      /**
       * Boucle For qui itère sur chaque boutons dans 'boutons'
       */
      for (let i = 0; i < boutons.length; i++) {
        /**
         * @var Element bouton - Assigne le bouton actuel avec index 'i'
         */
        const bouton = boutons[i];
        //méthode ClassList.toggle pour ajouter ou supprimer la classe 'active' si le bouton cliquer est 'tousBouton'
        bouton.classList.toggle('active', bouton === tousBouton);
      }
    });

    //--- Création des catégories de filtre sans doublons ---
    /**
     * @var Set uniqueFiltre -  crée une collection d'élément unique 
     * 
     * Permet de ne pas contenir de catégorie double 
     * Assure que les boutons pour filtrer les catégories sont uniques
     */
    const uniqueFiltre = new Set();

    /**
     * Boucle for qui itère chaque élement de tousProjetsJSON
     */
    for (let i = 0; i < tousProjetsJSON.length; i++) {   
      /**
       * @var any projet - sélectionne un projet en cour de traitement avec index 'i'
       */
      const projet = tousProjetsJSON[i];

      /**
       * Condition pour éviter les doublons
       * 
       * SI le nom de la catégorie N'EST PAS '!' déjà présente dans le set uniqueFiltre alors true
       */
      if (!uniqueFiltre.has(projet.category.name)) { 
        //Ajout du nom de la catégorie dans le Set
        uniqueFiltre.add(projet.category.name);
        /**
         * @var HTMLButtonElement boutonAvecCategorie - Création d'une bouton 
         */
        const boutonAvecCategorie = document.createElement('button');
        //Ajout du nom de la categorie dans le bouton
        boutonAvecCategorie.textContent = projet.category.name;
        //Ajout du bouton de filtrage créé dans le conteneur div
        divFiltre.appendChild(boutonAvecCategorie);

        //--- Evenement au click des boutons de catégorie ---
        /**
         * Ajout d'un écouteur d'évenement sur les boutons de catégorie 
         * 
         * Permet au moment du click de réaliser le code suivant
         */
        boutonAvecCategorie.addEventListener('click', () => {
          //Appele la fonction filtreMesProjets avec l'identifiant de la catégorie en paramétre
          filtreMesProjets(projet.categoryId);
          /**
           * @var NodeListOf<Element> boutons Sélectionne TOUS les boutons dans le conteneur <div> de filtre
           */
          const boutons = document.querySelectorAll('.filtre button');
          /**
           * Boucle For qui itère sur chaque boutons dans 'boutons'
           */
          for (let j = 0; j < boutons.length; j++) {
            /**
             * @var Element bouton - Assigne le bouton actuel avec index 'j'
             */
            const bouton = boutons[j];
            //méthode ClassList.toggle pour ajouter ou supprimer la classe 'active' si l'un des boutons avec catégorie est cliquer
            bouton.classList.toggle('active', bouton === boutonAvecCategorie);
          }
        });
      }
    }
    // Appelle la fonction pour afficher tous les projets au chargement de la page
    afficheProjetsGalerie(tousProjetsJSON);
  });
