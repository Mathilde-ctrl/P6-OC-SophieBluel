/**
 * modale.js
 * 
 * Gestion de la boite de dialogue modale
 * 
 * @author Mathilde Plancq
 * @version 1.0
 * @date 2023-06
 */

//------------------------------------------------------------------------------------------------------
//  Déclaration de VARIABLE GLOBALE résponsable de l'affichage des modales 

/**
 * @var HTMLElement modal - sélectionne la premiere modale dans <aside>
*/
const modal = document.getElementById('modal');

/**
 * @var HTMLElement modal2 - sélectionne le deuxième modale dans <aside></aside>
*/
const modal2 = document.getElementById('modal2');

/**
 * @var Element lienModal - sélectionne le lien d'entré de la première modale 'modal'
 */
const lienModal = document.querySelector('.lienmodal');

/**
 * @var HTMLElement btnAjoutImage - sélectionne le bouton qui envoie vers 'modal2'
 * */
const btnAjoutImage = document.getElementById('btnAjoutImage');

/**
 * @var Element retourFleche - sélectionne l'icone flèche pour aller de 'modal2' vers 'modal'
 */
const retourFleche = document.querySelector('.retour-fleche');

/**
 * @var HTMLCollection<element> closeIcons - selectionne les 'X' pour fermer les modales 
 */
const closeIcons = document.getElementsByClassName('x-close');

//--------------------------------------------------------------------------------------------------
//  Mise en place des FONCTIONS pour gérer les propriétés d'affichage des modales

/**
 * fonction ouvreModale
 * 
 * La fonction définit la propriété d'affichage de la 
 * première modale 'modal' sur "flex" et de la deuxième modale 'modal2' sur "none".
 * 
 * Permet de s'assurer qu'une seule modale est ouverte à la fois. 
 */
function ouvreModal() {
  modal.style.display = 'flex';
  modal2.style.display = "none";
}

/**
 * Fonction entreModal
 * 
 * Fonction qui assure le passage entre le première modale 'modal' qui se ferme 
 * est la deuxième modale 'modal2 qui s'ouvre. 
 * 
 * Permet de s'assurer qu'une seule modale est ouverte à la fois. 
 */
function entreModal(){
  modal.style.display = 'none';
  modal2.style.display = "flex";
}

/**
 * Fonction retourModal
 * 
 * Fonction qui assure le retour de la deuxième modale 'modal2' qui se ferme 
 * à la première modale 'modal' qui s'ouvre 
 * 
 * Permet de s'assurer qu'une seule modale est ouverte à la fois.  
 */
function retourModal(){
  modal.style.display = 'flex';
  modal2.style.display = "none";
}

/** 
 * fonction fermetureModale 
 * 
 * fonction qui cache les deux fenêtres modales
 * 
 * @param {Event} event événement DOM généré par le navigateur
 */
function fermetureModale(event) {
  //Si l'événement a été capturé par la modale modal 
  if (modal.contains(event.target)){
    //On la cache
    modal.style.display = 'none';
  } else if (modal2.contains(event.target)) {
    //si l'événement a été capturé par la modale modal2
    //On la cache 
    modal2.style.display = 'none';
  }
}

/**
 * Fonction nettoyerFichierInput
 * 
 * La fonction reset le formulaire dans la deuxième modale 'modal2' :  
 * - la valeur d'entrée 
 * - la source de l'image 
 * - masque l'image 
 * - affiche le label de sélection
 * - efface le texte de la réponse 
 * 
 * Permet d'éviter que les valeurs envoyées précédemment ne resurgissent lors d'un nouvelle envoie.
 * Reset le formulaire d'envoye 
 */
function nettoyerFichierInput() {
  //--- Déclarations de VARIABLE LOCALE pour modifier les éléments dans le formulaire ---
  /**
   * @var HTMLElement photoInput - sélectionne le input type file réponsable de charger le projet
   */
  const photoInput = document.getElementById('photo');

  /**
   * @var HTMLElement imageTelecharger - sélectionne la balise <img scr=""> 
   * qui permettra de visualiser le projet charger
   */
  const imageTelecharge = document.getElementById('selectionImage');

  /**
   * @var HTMLElement labelPhoto - sélectionne le label de input type file 
   */
  const labelPhoto = document.getElementById('labelPhoto');

  /**
   * @var HTMLElement reponseForm - sélectionne un <div> qui informe sur le succés ou non d'un envoye de projet 
   */
  const reponseForm = document.getElementById('reponseForm');

  //--- Modification des éléments avec des propriétés JavaScript ---
  // Nettoye la valeur input
  photoInput.value = ''; 
  // Nettoye la source de l'image
  imageTelecharge.src = ''; 
  // Cache image après le retour
  imageTelecharge.style.display = 'none'; 
  // Montre le label
  labelPhoto.style.display = 'flex'; 
  // Nettoye le texte 
  reponseForm.innerText = '';
}

//------------------------------------------------------------------------------------------------------
//  Ajouts d'ECOUTEURS d'EVENEMENTS pour appeler les fonctions sur les modales

/** 
 * Ajout d'un écouteur d'événement sur HTMLElement "lienModal"
 * Lors du click la fonction "ouvreModal" sera exécutée
*/
lienModal.addEventListener('click', ouvreModal);

/**
 * Ajout d'un écouteur d'événement sur HTMLElement "btnAjoutImage"
 * Lors du click la fonction entreModal sera exécutée
 */
btnAjoutImage.addEventListener('click',entreModal)

/**
 * Ajout d'un écouteur d'évenement sur HTMLElement "retourFleche"
 * Lors du click les fonctions retourModal et nettoyerFichierInput seront exécutées 
 */
retourFleche.addEventListener('click', () => {
  //Appel la fonction retourModal
  retourModal();
  /**
   * @var HTMLElement imageForm - sélectionne le formulaire dans la deuxième modale 'modal2'
   */
  const imageForm = document.getElementById('imageForm');
  //Reset les valeurs type string entrées dans le formulaire
  imageForm.reset();
  //Appel la fonction nettoyerFichierInput 
  nettoyerFichierInput();
});

/*  
 * Boucle pour récupérer tout les x-close icons présent dans les modales.
 */
for(let i = 0; i < closeIcons.length; i++){
  /*
   * Ajout d'un écouteur d'évenement pour chaque closeIcons récupéré dans la boucle
   * Appele les fonctions fermetureModale et nettoyerFichierInput
   */
  closeIcons[i].addEventListener('click', (event) => {
  // fonction fléchée anonyme appelé lors de la fermeture des modales

    //appel la fonction fermetureModale
    fermetureModale(event);
    //appel la fonction nettoyerFichierInput
    nettoyerFichierInput();
  })
}

/**
 * Ajout d'un écouteur d'évènement sur la page web
 * 
 * Permet la fermeture des modales lors d'un click à l'extérieur de la modale. 
 */
window.addEventListener('click', (event) => {
  //Si le click en dehors des modales alors condition Vrai et execute les 2 fonctions suivantes
  //Si click sur modale alors retour
  if (event.target !== modal && event.target !== modal2) {
    return;
  }
  //appel la fonction fermetureModale
  fermetureModale(event);
  //appel la fonction nettoyerFichierInput
  nettoyerFichierInput()
});

//-------------------------------------------------------------------------------------------------
//  Récupération du  TOKEN

const token = sessionStorage.getItem('token')

//--------------------------------------------------------------------------------------------------
//  Affichage des projets dans la première modale 'modal' avec un fetch 'GET' 


/**
 * Effectue une requête http 'GET' 
 * 
 * Permet de récupérer les données des projets 
 * 
 */
fetch('http://localhost:5678/api/works',{
  method:'GET',
  headers: {
    //Indique le contenu de la requête est en JSON
    'Content-Type': 'application/json',
    // Ajout d'une en-tête d'autorisation en utilisant un jeton d'authentification 'token'
    'Authorization': `Bearer ${token}`,
  }
})
// APIreponse correspond à la reponse renvoyer par la requête 
// Convertit la réponse avec la méthode .json() pour lire les données avec JavaScript
.then(APIreponse => APIreponse.json())
// Les données récupérées sont accessibles dans 'tousProjetsJSON'
.then(tousProjetsJSON => {
  // la fonction 'afficheProjetsGalerie' est appelé avec les données récupérées
  afficheProjetsGalerie(tousProjetsJSON);
})
.catch((error) => {
  console.error(error);
});

/**
 * Fonction supprimerProjet 
 * @param projetId représente l'identifiant du projet  
 * 
 * Effectue une requête http 'DELETE' pour supprimer un projet
 */
function supprimerProjet(projetId) {
  // return assure l'enchainement de cette promesse avec .then dans l'évenement d'écoute
  return fetch(`http://localhost:5678/api/works/${projetId}`, {
    method: 'DELETE',
    headers: {
      // Ajout d'une en-tête d'autorisation en utilisant un jeton d'authentification 'token'
      'Authorization': `Bearer ${token}`,
    }
  })
  //récupère la réponse de la requête
  .then(APIreponse => {
    //Condition si la réponse n'est pas pas reçu 
    if (!APIreponse.ok) {
      // Si pas de réponse de la requête alors message error dons console
      throw new Error('Problème pour supprimer un projet');
    }
  })
}


/**
 * Fonction afficheProjetsGalerie
 * 
 * Affiche les projets dans la galerie 'modal' et effectue les actions associées
 * 
 * Récupère les catégories de projet dans le formulaire de la deuxième modale 'modal2'
 * 
 *  @param {Array<Object>} projets 
 */
function afficheProjetsGalerie(projets) {
  //---Déclarations de VARIABLES LOCALES---
  /**
   * @var HTMLElement HTMLgalerieElement - sélectionne la <div> classe gallery qui contiendra les projets.
   */
  const HTMLgalerieElement = document.querySelector('#modal .gallery');
  /**
   * @var HTMLElement categorieduprojet - sélectionne la balise <select> dans 'modal2' (le menu déroulant)
   */
  const categorieduprojet = document.getElementById('categorieduprojet'); 

  /**
   * @var SET categorieUnique - crée une collection d'élément unique 
   * 
   * Permet de ne pas contenir d'élément double 
   * Assure que les noms des catégories ajoutés au menu déroulant sont uniques
   */
  const categorieUnique = new Set();

  //--- Visualisatino des données 'projets' dans la console de l'inspecteur ---
  console.log(projets)

  //--- Boucle For qui itére sur chaque élément contenue dans projets avec l'index 'i' ---
  for (let i = 0; i < projets.length; i++) {
    //-- Déclaration de VARIABLE LOCALE pour récupérer des infos présent dans 'projets'
    /**
     * @var any projet - sélectionne le projet avec index 'i' qui est en cours de traitement
     */
    const projet = projets[i];
    /**
     * @var any projetId - récupère la propriété .id présent dans 'projet' 
     */
    const projetId = projet.id;

    //--- Déclaration de VARIABLE LOCALE pour créer des élements d'affichage pour chaque projet ---
    /**
     * @var HTMLElement modaleJSfigureElement - créer une balise <figure> pour contenir les éléments d'un projet
     */
    const modaleJsfigureElement = document.createElement('figure');
    /**
     * @var HTMLImageElement modaleJsimgELement - créer une balise <img> pour afficher l'image du projet
     */
    const modaleJsimgElement = document.createElement('img');
    /**
     * @var HTMLParagrapheElement modaleJsTextElement - créer une balise <p> pour contenir du texte
     */
    const modaleJsTextElement = document.createElement('p');
    /**
     * @var HTMLDivElement modaleJsIconsConteneur - créer un conteneur <div> pour ranger les icones ensembles
     */
    const modaleJsIconsConteneur = document.createElement('div');
    /**
     * @var HTMLElement modaleJsIconPoubelle - créer une balise <i> pour ajouter un icône 
     */
    const modaleJsIconPoubelle = document.createElement('i');
    /**
     * @var HTMLElement modaleJsIconDirection - créer une balise <i> pour ajouter un icône 
     */
    const modaleJsIconDirection = document.createElement('i');
    /**
     * @var HTMLOptionElement modaleJsOptionMenu - 
     * créer une balise <option> pour le menu déroulant <selection> contenant les noms des catégories
     */
    const modaleJsOptionMenu = document.createElement('option');  
    
    //--- Modification des éléments avec des propriétés JavaScript ---
    // Ajout du nom de la catégorie de projet en text
    modaleJsOptionMenu.innerText = projet.category.name; 
    //Ajout de l'id de la categorie en valeur 
    modaleJsOptionMenu.value = projet.category.id;  

    // Ajout de url pour l'image 
    modaleJsimgElement.src = projet.imageUrl;
    // Ajout du titre pour texte alternatif de l'image
    modaleJsimgElement.alt = projet.title;

    // Ajout d'un texte
    modaleJsTextElement.innerText = 'éditer';
    // Ajout d'une classe 
    modaleJsTextElement.className = 'modalTextEdit';

    // Ajout d'un icône font Awesome 
    modaleJsIconDirection.className = 'fa-solid fa-arrows-up-down-left-right ordre-des-icons';

    // AJout d'une class au conteneur d'icônes
    modaleJsIconsConteneur.className = 'conteneurIcons';

    // Ajout d'un icône font Awesome
    modaleJsIconPoubelle.className = 'fa-solid fa-trash-can poubelle';
    // Enregistre un attribut personnalisé contenant la valeur de 'projetId'
    modaleJsIconPoubelle.setAttribute('data-projet', projetId);

    //--- Supprime UN projet dans l'API et dynamiquement ---
    /**
     * Ajout d'un écouteur d'évènement sur HTMLElement 'modaleJsIconPoubelle'
     *  
     * Permet au click d'appeler la fonction supprimerProjet et d'enchainer la résolution de promesse .then
     */   
    modaleJsIconPoubelle.addEventListener('click', () => {
      //Appele la fonction supprimerProjet ayant pour argument l'identifiant du projet avec 'projetId'
      //Supprime dans l'API
      supprimerProjet(projetId)

      //Continuation de l'enchainement de la résolution de promesse dans la fonction
      .then(() => {
        //Supprime le projet dynamiquement dans la modale en enlevant le <figure>
        modaleJsfigureElement.remove();

        /**
         * @var HTMLElement indexJsfigureElement - 
         * Sélectionne la balise <figure> dans indexedit.html en récupérant l'attribut data-projet
         */
        const indexJsfigureElement = document.querySelector(`#portfolio .gallery figure[data-projet="${projetId}"]`)  //
        ///supprime le projet dans indexedit.html dynamiquement
        indexJsfigureElement.remove();
      })
    });
    
    //--- Condition pour afficher les noms de catégorie dans le menu déroulant ---
    /**
     * Condition pour avoir une seule catégorie présente dans le menu déroulant
     * 
     * Vérifie si 'categorieUnique' ne contient PAS '!' déjà le .name = condition true 
     */
    if (!categorieUnique.has(projet.category.name)){
      // si true alors ce code est executé 
      //'modaleJsOptionMenu' est ajouté en tant qu'enfant de 'categorieduprojet'
      categorieduprojet.appendChild(modaleJsOptionMenu);
      // Ajout du nom du projet dans le set 'categorieUnique'
      categorieUnique.add(projet.category.name);
    }

    //--- Organisations des éléments --- 
    /**
     * Ajout de : 
     * - l'image charger 'modaleJsimgElement'
     * - le texte créer 'modaleJsTextElement'
     * - le conteneur d'icône  'modaleJsIconsConteneur'
     * en tant qu'enfant de la balise <figure> 'modaleJsfigureElement' pour contenir le tout.
     */
    modaleJsfigureElement.appendChild(modaleJsimgElement);
    modaleJsfigureElement.appendChild(modaleJsTextElement);
    modaleJsfigureElement.appendChild(modaleJsIconsConteneur);

    /**
     * Ajout d'icônes en tant qu'enfant  de la balise <div> 'modaleJsIconsConteneur'
     */
    modaleJsIconsConteneur.appendChild(modaleJsIconPoubelle);
    modaleJsIconsConteneur.appendChild(modaleJsIconDirection);

    /**
     * Ajout de la balise <figure> 'modaleJsfigureElement' en tant qu'enfant de la balise <div> 'HTMLgalerieElement'
     * 
     * Permet de contenir chaque figure de projet dans ce conteneur pour afficher la galerie
     */
    HTMLgalerieElement.appendChild(modaleJsfigureElement);    

    //FIN de la boucle 
  }


  //--- Supprime TOUS les projets dans l'API et dynamiquement ---
  /**
   * @var HTMLElement supprimerTousLesProjetsGalerie - Sélectionne le bouton pour supprimer la galerie
   */
  const supprimerTousLesProjetsGalerie = document.querySelector('.supprimeGallery')

  /**
   * Ajout d'un écouteur évenement sur le bouton pour supprimer la galerie
   * 
   * Permet au click d'afficher une boite de confirmation de l'action envisagée
   */
  supprimerTousLesProjetsGalerie.addEventListener('click', () => {
    //si l'utilisateur valide l'action alors le reste du code est effectué.
    if(window.confirm("Êtes-vous sûr de vouloir supprimer tous les projets de la galerie ?") == true ) { 
    
      //--- Boucle For qui itére sur chaque élément contenue dans projets avec l'index 'i' ---
      for (let i = 0; i < projets.length; i++) {

        //-- Déclaration de VARIABLE LOCALE pour récupérer des infos présent dans 'projets'
        /**
         * @var any projet - sélectionne le projet avec index 'i' qui est en cours de traitement
         */
        const projet = projets[i];
        /**
         * @var any projetId - récupère la propriété .id présent dans 'projet' 
         */
        const projetId = projet.id;


        //--- Déclaration de VARIABLE LOCALE pour sélectionner TOUTES les balise <figure> ---
        /**
         * @var NodeListOf<Element> dynamiqueModaleSelectionneTousLesProjetsGalerie - 
         * Sélectionne TOUS les figures présent dans la première modale 'modal'
         */
        const dynamiqueModaleSelectionneTousLesProjetsGalerie = document.querySelectorAll('#modal .gallery figure')
        /**
         * @var NodeListOf<Element> dynamiqueIndexSelectionneTousLesProjetsGalerie - 
         * Sélectionne TOUS les figures présent dans 'indexedit.html'
         */
        const dynamiqueIndexSelectionneTousLesProjetsGalerie = document.querySelectorAll('#portfolio .gallery figure')

        //Appele la fonction supprimerProjet ayant pour argument l'identifiant du projet avec 'projetId'
        //Supprime dans l'API
        supprimerProjet(projetId)
        //Enchainement des promesses après que la fonction est exécuté
        .then(() => {
          // Envoye message dans la console pour valider la supression des projets
          console.log(`Le project ID : ${projetId} a bien été supprimé`);
        
          //Supprime dynamiquement dans la Modale sans actualiser
          dynamiqueModaleSelectionneTousLesProjetsGalerie.forEach((figure) => {
            figure.remove();
          });

          //supprime dynamiquement dans indexedit.html sans actualiser 
          dynamiqueIndexSelectionneTousLesProjetsGalerie.forEach((figure) => {
            figure.remove();
          });
        })
        // Envoye message dans la console si un problème est apparue pour la supression des projets
        .catch((error) => {
          console.error(`Erreur pour supprimer le projet ID : ${projetId}:`, error);
        });
        //FIN de la boucle
      }
      // FIN de la condition 
    }
    //FIN de l'écouteur d'évenement
  }) 
  //FIN de la fonction afficheProjetGalerie
}


//------------------------------------------------------------------------------------------------------------------
//  Affiche une image sélectionner dans la deuxième modale 'modal2'
/**
 * @var HTMLElement photoInput - sélectionne le input type file réponsable de charger le projet
 */
const photoInput = document.getElementById('photo');
/**
   * @var HTMLElement imageTelecharger - sélectionne la balise <img scr=""> 
   * qui permettra de visualiser le projet charger
   */
const imageTelecharge = document.getElementById('selectionImage');

/**
 * Ajout d'un écouteur d'évenement sur 'photoInput'
 * 
 * Permet à l'évènement change d'afficher l'image charger si elle valide les conditions
 */
photoInput.addEventListener('change', (event)=>{
  //--- Déclaration de VARIABLE LOCALE pour renseigner les conditions ---
  /**
   * @var any fichier - sélectionne l'image charger dans 'photoInput'
   * 
   * files[0] = propriété qui sélectionne le premier fichier 
   */
  const fichier = event.target.files[0];
  /**
   * @var number maxTailleFichier - Ajout d'une limite de taille des fichiers autorisés à 4Mo 
   * 
   * Soit 1Mo = 1048576 octets
   */
  const maxTailleFichier = 4 * 1048576; 

  //--- Conditions de validation de l'image --- 
  /**
   * Condition qui compare la valeur de 'fichier' à la limite de taille 'maxTailleFichier'
   * 
   * La propriété .size renvoie la taille du fichier en octet.
   */
  if(fichier.size <= maxTailleFichier){
    //Si la valeur est inférieur alors ce code et exécuté
    /**
     * @var FileReader lecture - interface de lecture du fichier
     */
    const lecture = new FileReader();
    /**
     * @var HTMLElement labelPhoto - sélectionne le label + Ajouter photo dans modal2
     */
    const labelPhoto = document.getElementById('labelPhoto')

    //Modifie le style pour que l'élément ne soit plus visible
    labelPhoto.style.display = "none";

    /**
     * l'événement ce déclenche lorsque le fichier a été chargé.
     * 
     */
    lecture.onload = (e) => {
      //fonction anonyme fléché ayant pour paramètre 'e'

      //met à jour src de Id='selectionImage' 
      //.result est une propriété qui permet d'accéder au resultat du chargement.
      imageTelecharge.src = e.target.result;
      // Rend l'image visible
      imageTelecharge.style.display = 'block'; 
    };
    /**
     * Méthode pour lire le fichier si les conditions sont remplis
     */
    lecture.readAsDataURL(fichier);
  }
  /**
   * Si les conditions ne sont pas remplis alors 
   */
  else{
    /**
     * @var HTMLElement reponseForm - sélectionne un <div> qui informe sur le succés ou non d'un envoye de projet 
     */
    const reponseForm = document.getElementById('reponseForm');
    // AJout le texte définnissant le refus de l'image
    reponseForm.innerText = "La taille de l'image est supérieure à 4 Mo ! ";
    //Appele de la fonction nettoyerFichierInput
    nettoyerFichierInput()
    
    /**
     * Change le message dans 'reponseForm' après 2 secondes
     */
    setTimeout(() => {
      reponseForm.innerText = "Veuillez choisir une image dont la taille est inférieur à 4 Mo "
    }, 2000)
         
    /**
     * Reset le message dans 'reponseForm' 2 secondes après le premier changement de message
     */
    setTimeout(() => {
      reponseForm.innerText = ""
    },4000) 
  }
});


//--------------------------------------------------------------------------------
// Vérifie que les 3 inputs du fomulaire sont complétés

//---   Déclaration de VARIABLES GLOBALES --- 
/**
 * @var HTMLElement imageForm - Sélectionne le formulaire dans la deuxième modale 'modal2'
 */
const imageForm = document.getElementById('imageForm');
/**
 * @var HTMLElement titreduprojectInput - Sélectionne la balise <input> type texte pour mentionner le titre du projet
 */
const titreduprojectInput = document.getElementById('titreduproject');
/**
 * @var HTMLElement categorieduprojetInput - Sélectionne la balise <selection> pour afficher le menu déroulant
 */
const categorieduprojetInput = document.getElementById('categorieduprojet');
/**
 * @var HTMLElement validerAjoutImageButton - Sélectionne la balise <bouton> pour valider les informations
 */
const validerAjoutImageButton = document.getElementById('validerAjoutImage');


//--- évenement d'écoute ---
/**
 * Ajout d'un écouteur d'évenement sur le formulaire 'imageForm'
 * 
 * Permet au moment du changement d'appeler la fonction changebouton
 */
imageForm.addEventListener('change', changebouton);


/**
 * Fonction changebouton 
 * 
 * Permet de changer la couleur du bouton valider si la condition est remplis 
 * 
 * Condition si pour vérifier que les 3 champs sont remplis 
 */
function changebouton() {
  // Condition pour effectuer la fonction tousLesChampsRemplis qui retourne une valeur true ou false 
  if (tousLesChampsRemplis()) {
    //Ajoute une classe au <bouton> lorsque touts les input sont remplis  
    validerAjoutImageButton.classList.add('validerImage-active');
  } else {
    //Sinon Retire la classe 
    validerAjoutImageButton.classList.remove('validerImage-active');
  }
}
 
/**
 * Fonction tousLesChampsRemplis
 * 
 * Permet de vérifier si : 
 * - Une image à charger est présente
 * - Une valeur pour le titre est rentrée
 * - Une valeur pour le menu déroulant est sélectionnée
 * Donc l'ensembles des 3 champs du formulaire sont remplis
 * 
 */
function tousLesChampsRemplis() {
  return photoInput.files.length == 1 && titreduprojectInput.value.trim() !== '' && categorieduprojetInput.value !== '';
}


//--------------------------------------------------------------------------------------------
//  Ajoute d'un projet avec requête Fetch 'POST' à la base de donnée API et ajout dynamiquement au DOM 
  
  /**
   * AJout d'un écouteur d'évenement sur le formulaire dans la deuxième modale 'modal2'
   * 
   * Permet au moment du submit d'ajouter le projet 
   */
  imageForm.addEventListener('submit',(event) => {
    //Empêche l'action par défaut du bouton de validation
    event.preventDefault();
    
    //--- Déclaration de VARIABLES LOCALES --- 
    /**
     * @var any photo - Sélectionne l'image charger dans input type file
     */
    const photo = document.getElementById('photo').files[0];
    /**
     * @var any titre - Sélectionne la valeur dans le input type texte pour écrire le titre
     */
    const titre = document.getElementById('titreduproject').value;
    /**
     * @var number category - Extrait la valeur d'une catégorie dans le menu déroulant et la transform en numbre entier
     */
    const category = parseInt(document.getElementById('categorieduprojet').value);

    /**
     * @var FormData formData - Création d'une nouvelle interface permettant la création et la manipulation de données de formulaire.
     */
    const formData = new FormData();

    /**
     * @var HTMLElement reponseForm - Sélectionne la balise <div> dans modal2 qui permet d'envoyer un message
     */
    const reponseForm = document.getElementById('reponseForm');

    /**
     * Ajout de clé et de valeur a formData 
     * 
     * Correspond exactement aux clés mentionner dans la route de requête http fetch permettant de faire un 'POST'
     */
    formData.append('image', photo);
    formData.append('title', titre);
    formData.append('category', category);

    /**
     * Requête http 'POST' à l'API
     */
    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      // Informe que le corps de la requête est constitué d'un FormData 'formData'
      body: formData,
      headers: {
        // Ajout d'une en-tête d'autorisation en utilisant un jeton d'authentification 'token' 
        'Authorization': `Bearer ${token}`      
      },
    })
    /**
     * Enchainement de la première promesse qui renvoye la réponse APIreponse
     */
    .then(APIreponse => {
      // Condition de traitement de la requête avec propriété .ok
      //Si APIreponse est true alors la requête a été traité avec succès
      if(APIreponse.ok){
        // Envoye un message de validation de l'envoye du projet
        reponseForm.innerText = "Image envoyée ! "
        //APireponse.json() est une méthode permettant de lire le contenue de la reponse
        //Convertit JSON pour être utilisé par JavaScript
        return APIreponse.json();
        //Si la reponse est false un message d'erreur est affiché 
      }else{
        //message d'erreur
        throw new Error ( reponseForm.innerText = "Erreur : " + APIreponse.status);
      }
    })
    /**
     * Si promesse précèdente true alors ce code est executé
     * data correspond à la valeur renvoyée par la méthode APIreponse.json()
     */
    .then(data => {
      console.log(data);
      //--- Ajoute Dynamiquement le nouveau projet charger dans la galerie de la première modale 'modal' ---
      /**
       * @var HTMLElement modaleHTMLgalerieElement - sélectionne la <div> classe gallery qui contiendra les projets.
       */
      const modaleHTMLgalerieElement = document.querySelector('#modal .gallery');
      /**
       * @var HTMLElement modaleJSfigureElement - créer une balise <figure> pour contenir les éléments d'un projet
       */
      const modaleJsfigureElement = document.createElement('figure');
      /**
       * @var HTMLImageElement modaleJsimgELement - créer une balise <img> pour afficher l'image du projet
       */
      const modaleJsimgElement = document.createElement('img');
      /**
       * @var HTMLParagrapheElement modaleJsTextElement - créer une balise <p> pour contenir du texte
       */
      const modaleJsTextElement = document.createElement('p');
      /**
       * @var HTMLDivElement modaleJsIconsConteneur - créer un conteneur <div> pour ranger les icones ensembles
       */
      const modaleJsIconsConteneur = document.createElement('div');
      /**
       * @var HTMLElement modaleJsIconPoubelle - créer une balise <i> pour ajouter un icône 
       */
      const modaleJsIconPoubelle = document.createElement('i');
      /**
       * @var HTMLElement modaleJsIconDirection - créer une balise <i> pour ajouter un icône 
       */
      const modaleJsIconDirection = document.createElement('i');

      //--- Modification des éléments avec des propriétés JavaScript ---
      // Ajout de url pour l'image 
      modaleJsimgElement.src = data.imageUrl;
      // Ajout du titre pour texte alternatif de l'image
      modaleJsimgElement.alt = data.title;

      // Ajout d'un texte
      modaleJsTextElement.innerText = 'éditer';
      // Ajout d'une classe 
      modaleJsTextElement.className = 'modalTextEdit';

       // AJout d'une class au conteneur d'icônes
      modaleJsIconsConteneur.className = 'conteneurIcons';

      // Ajout d'un icône font Awesome
      modaleJsIconPoubelle.className = 'fa-solid fa-trash-can poubelle';
      // Enregistre un attribut personnalisé contenat la valeur de 'projetId'
      modaleJsIconPoubelle.setAttribute('data-projet', data.id);

      //--- Supprime UN projet dans l'API et dynamiquement ---
      /**
       * Ajout d'un écouteur d'évènement sur HTMLElement 'modaleJsIconPoubelle'
       *  
       * Permet au click d'appeler la fonction supprimerProjet et d'enchainer la résolution de promesse .then
       */  
      modaleJsIconPoubelle.addEventListener('click', () => {
        //Appele la fonction supprimerProjet
        supprimerProjet(data.id)
          //Continuation de l'enchainement de la résolution de promesse dans la fonction
          .then(() => {
            //Supprime dynamiquement la figure dans modale
            modaleJsfigureElement.remove();
            //Supprime dynamiquement la figure dans indexedit.html
            indexJsfigureElement.remove();//
          })
      });
      // Ajout d'un icône font Awesome
      modaleJsIconDirection.className = 'fa-solid fa-arrows-up-down-left-right ordre-des-icons';
    
    //--- Organisations des éléments --- 
    /**
     * Ajout de : 
     * - l'image charger 'modaleJsimgElement'
     * - le texte créer 'modaleJsTextElement'
     * - le conteneur d'icône  'modaleJsIconsConteneur'
     * en tant qu'enfant de la balise <figure> 'modaleJsfigureElement' pour contenir le tout.
     */
    modaleJsfigureElement.appendChild(modaleJsimgElement);
    modaleJsfigureElement.appendChild(modaleJsTextElement);
    modaleJsfigureElement.appendChild(modaleJsIconsConteneur);

    /**
     * Ajout d'icônes en tant qu'enfant  de la balise <div> 'modaleJsIconsConteneur'
     */
    modaleJsIconsConteneur.appendChild(modaleJsIconPoubelle);
    modaleJsIconsConteneur.appendChild(modaleJsIconDirection);

    /**
     * Ajout de la balise <figure> 'modaleJsfigureElement' en tant qu'enfant de la balise <div> 'HTMLgalerieElement'
     * 
     * Permet de contenir chaque figure de projet dans ce conteneur pour afficher la galerie
     */
    modaleHTMLgalerieElement.appendChild(modaleJsfigureElement);
    
    //Ajoute dynamiquement le projet dans la galerie de indexedit.html
    /**
     * @var HTMLElement indexHTMLgalleryElement - Sélectionne la balise <div> dans indexedit.html
     */
    const indexHTMLgalleryElement = document.querySelector('.gallery');
    /**
     * @var HTMLElement indexJsfigureElement - création d'une balise <figure> dans indexedit.html
     */
    const indexJsfigureElement = document.createElement('figure');
    /**
     * @var HTMLImageElement indexJsimgElement - Création d'une balise <img> pour afficher l'image
     */
    const indexJsimgElement = document.createElement('img');
    /**
     * @var HTMLParagrapheElement indexJstextElement - Création d'une balise <p> pour afficher le titre
     */
    const indexJstextElement = document.createElement('p');

    //AJoute une source à la balise <img>
    indexJsimgElement.src = data.imageUrl;
    // Ajout du titre pour texte alternatif de l'image
    indexJsimgElement.alt = titre;
    
    // Ajout du titre 
    indexJstextElement.innerHTML = titre;
  
    //--- Organisations des éléments --- 
    /**
     * Ajout de : 
     * - l'image charger 'modaleJsimgElement'
     * - le texte créer 'modaleJsTextElement'
     * en tant qu'enfant de la balise <figure> 'indexJsfigureElement' pour contenir le tout.
     */
    indexJsfigureElement.appendChild(indexJsimgElement);
    indexJsfigureElement.appendChild(indexJstextElement);

    /**
     * Ajout de la balise <figure> 'modaleJsfigureElement' en tant qu'enfant de la balise <div> 'HTMLgalerieElement'
     * 
     * Permet de contenir chaque figure de projet dans ce conteneur pour afficher la galerie
     */
    indexHTMLgalleryElement.appendChild(indexJsfigureElement);

    // Change le style de modal2 en la faisant disparaitre après l'ajout d'un projet après 1 seconde
    setTimeout(() => {
      document.getElementById('modal2').style.display = 'none';
      //Appele de fonction nettoyerFichierInput 
      nettoyerFichierInput()

      /**
       * @var HTMLElement imageForm - sélectionne le formulaire dans la deuxième modale 'modal2'
       */
      const imageForm = document.getElementById('imageForm');
      //Reset les valeurs type string entrées dans le formulaire
      imageForm.reset();
    }, 1000);
  })
})

