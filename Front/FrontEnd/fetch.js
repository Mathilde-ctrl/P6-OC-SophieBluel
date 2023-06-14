/**
 * fetch.js
 * 
 * Gestion de l'authentification de l'administratice
 * 
 * @author Mathilde Plancq
 * @version 1.0
 * @date 2023-06
 */

// Les projets s’affichent dans la galerie en provenant du back-end et en récupérant : .imagesURL et .title

/**
 * fetch : fonction JS qui envoye une requête HTTP vers l'Url
 * then : représente la réponse de API renvoyée par la requête, 
   APIresponse.json() renvoie une promesse. Transforme la réponse http en Json
 * tousProjetsJSON : représente l'ensemble des données 
 */
   

fetch('http://localhost:5678/api/works') 
  .then(APIresponse => APIresponse.json())
  .then(tousProjetsJSON => {   
    
    //Déclare mes fonctions ----------------------------------------------------------------------------------------------

    //Fonction pour afficher les images et titres
    function afficheProjetsGalerie(catégorisationDesProjets) {
      const HTMLgalleryElement = document.querySelector('.gallery');      //Assigne une classe à la variable
      HTMLgalleryElement.innerHTML = '';              // Efface la gallerie existante pour assurer que seule la catégorie sélectionnée est affichée.
  
      for (let i = 0; i < catégorisationDesProjets.length; i++){       // Boucle pour créer une figure et une img avec src et alt pour chaque élements.
        const projet = catégorisationDesProjets[i];
        const projectId = projet.id //
        const JsfigureElement = document.createElement('figure');
        const JsimgElement = document.createElement('img');
        const JstextElement = document.createElement('p');

        JsfigureElement.setAttribute('data-projet', projectId)  //
        JsimgElement.src = projet.imageUrl;
        JsimgElement.alt = projet.title;
        JstextElement.innerHTML = projet.title;
  
        JsfigureElement.appendChild(JsimgElement);
        JsfigureElement.appendChild(JstextElement);
        HTMLgalleryElement.appendChild(JsfigureElement);
        
      };
    } 
    
    // Fonction pour filtrer les projets par catégorie
    function filtreMesProjets(identifiant) {
      if (identifiant === null) {
        afficheProjetsGalerie(tousProjetsJSON); // Afficher tous les projets
      } else {
        const mesProjetsFiltres = tousProjetsJSON.filter(chaqueElement => chaqueElement.categoryId === identifiant);
        // Filtre les projets dans tousProjetsJSON pour ne conserver que ceux dont le 'idendifiant' est égale a la propriété categoryID
        // Le résultat du filtrage est contenu dans la variable "mesProjetsFiltres"
        afficheProjetsGalerie(mesProjetsFiltres); // Afficher les projets filtrés 
      }
    }
    //-------------------------------------------------------------------------------------------------------------------

    const divFiltre = document.querySelector(".filtre");

    // Création du Bouton "Tous"
    const tousBouton = document.createElement('button');
    tousBouton.textContent = "Tous";
    tousBouton.classList.add('active');
    divFiltre.appendChild(tousBouton);

    //Evenement au click du bouton "Tous" pour lancer la fonction Fonction filtreMesProjets(null) et toggle la classe.
    tousBouton.addEventListener('click', () => {
      filtreMesProjets(null);
      const buttons = document.querySelectorAll('.filtre button');
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.classList.toggle('active', button === tousBouton);
      }
    });

    //Création des autres boutons sans doublons
    const uniqueFiltre = new Set();
    for (let i = 0; i < tousProjetsJSON.length; i++) {    // Boucle qui itère chaque élement de tousProjetsJSON 
      const tousProject = tousProjetsJSON[i];

      if (!uniqueFiltre.has(tousProject.category.name)) { 
      // Condition pour éviter les doublons. "!" = inverse la valeur true or false
      // Condition = true si le .name n'est pas déjà present dans le set 
        uniqueFiltre.add(tousProject.category.name);
        //Ajout de .name dans le set si remplie la condition en haut

        const boutonAvecCategorie = document.createElement('button');
        boutonAvecCategorie.textContent = tousProject.category.name;
        divFiltre.appendChild(boutonAvecCategorie);

        //Evenement au click des boutons catégorisé pour lancer la Fonction filtreMesProjets(project.categoryId) et toggle la classe.
        boutonAvecCategorie.addEventListener('click', () => {
          filtreMesProjets(tousProject.categoryId);
          const buttons = document.querySelectorAll('.filtre button');
          for (let j = 0; j < buttons.length; j++) {
            const button = buttons[j];
            button.classList.toggle('active', button === boutonAvecCategorie);
          }
        });
      }
    }
    // Afficher tous les projets au chargement de la page
    afficheProjetsGalerie(tousProjetsJSON);
  });
   
//------------------------------------------------------------------------------------------
