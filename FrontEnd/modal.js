//Ma boite de dialogue modale 

//Les balises <aside>
const modal = document.getElementById('modal');
const modal2 =document.getElementById('modal2');

//Le lien d'ouverture de la modale dans <a>
const lienModal = document.querySelector('.lienmodal');

//Le bouton dans modal qui envoie a modal2
const btnAjoutImage = document.getElementById('btnAjoutImage');

//L'icon fléche retour qui renvoie a modal
const retourFleche = document.querySelector('.retour-fleche');

//Les icons pour fermer les modales
const closeIcons = document.getElementsByClassName('x-close');

//Ouvre modal
function openModal() {
  modal.style.display = 'flex';
  modal2.style.display = "none";
}

//Passage entre modal et modal2
function betweenModal(){
  modal.style.display = 'none';
  modal2.style.display = "flex";
}

//Retour de modal2 à modal 
function returnModal(){
  modal.style.display = 'flex';
  modal2.style.display = "none";
}

//Fermeture des modales
function fermetureModale(event) {
  if (modal.contains(event.target)){
    modal.style.display = 'none';
  } else if (modal2.contains(event.target)) {
    modal2.style.display = 'none';
  }
}

// évenements d'écoute du lien 
lienModal.addEventListener('click', openModal);

//évenement d'écoute du bouton dans modal
btnAjoutImage.addEventListener('click',betweenModal)

//évenement d'écoute du de l'icon fleche
retourFleche.addEventListener('click',returnModal )

//Boucle pour récupérer tout les x-close icons et ajout évenement d'écoute
for(let i = 0; i < closeIcons.length; i++){
  closeIcons[i].addEventListener('click', fermetureModale);
}

// évenements d'écoute au moment du click en dehors des modales
//La condition est fausse, si le click se passe en dehors des modales alors fermetureModale
//la condition est vrai quand le click sur une modale alors return
window.addEventListener('click', function(event) {
  if (event.target !== modal && event.target !== modal2) {
    return;
  }
  fermetureModale(event);
});

//-------------------------------------------------------------------------------------
//  TOKEN
const token = sessionStorage.getItem('token')



//-------------------------------------------------------------------------------------
//  Affiche les projets dans la modale avec les fonctionnalités supprimer 

function afficheProjetsGalerie(projets) {
  const HTMLgalerieElement = document.querySelector('#modal .gallery');
  const categorieduprojet = document.getElementById('categorieduprojet')  
  const categorieUnique = new Set();

  console.log(projets)

  for (let i = 0; i < projets.length; i++) {
    const projet = projets[i];
    const idprojet = projet.id;

    const JsfigureElement = document.createElement('figure');
    const JsimgElement = document.createElement('img');
    const JsTextElement = document.createElement('a');
    const JsIconsConteneur = document.createElement('div');
    const JsIconPoubelle = document.createElement('i');
    const JsIconDirection = document.createElement('i');
    const JsOptionMenu = document.createElement('option');  

    JsOptionMenu.innerText = projet.category.name;  
    JsOptionMenu.value = projet.category.id;  

    JsimgElement.src = projet.imageUrl;
    JsimgElement.alt = projet.title;

    JsTextElement.innerText = 'éditer';
    JsTextElement.href = '#';
    JsTextElement.className = 'modalTextEdit';

    JsIconsConteneur.className = 'conteneurIcons';

    JsIconPoubelle.className = 'fa-solid fa-trash-can poubelle';
    JsIconPoubelle.setAttribute('data-projet', idprojet);
    JsIconPoubelle.addEventListener('click', () => {
      supprimerProjet(idprojet)
      // .then ici parce que la déclaration de JsfigureElement dans ce bloc.
      .then(() => {
        JsfigureElement.remove();
      })
      
    });

    JsIconDirection.className = 'fa-solid fa-arrows-up-down-left-right ordre-des-icons';

    //Une seule catégorie présent dans le menu
    if (!categorieUnique.has(projet.category.name)){
      categorieduprojet.appendChild(JsOptionMenu);
      categorieUnique.add(projet.category.name);
    }

    JsfigureElement.appendChild(JsimgElement);
    JsfigureElement.appendChild(JsTextElement);
    JsfigureElement.appendChild(JsIconsConteneur);
    JsIconsConteneur.appendChild(JsIconPoubelle);
    JsIconsConteneur.appendChild(JsIconDirection);
    HTMLgalerieElement.appendChild(JsfigureElement);

  }
}
// return assure l'enchainement de cette promesse avec .then dans l'évenement d'écoute
function supprimerProjet(projetId) {
  return fetch(`http://localhost:5678/api/works/${projetId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Problème pour supprimer un projet');
      }
    })
    
}

fetch('http://localhost:5678/api/works',{
  method:'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
})
.then(APIresponse => APIresponse.json())
.then(tousProjetsJSON => {
  afficheProjetsGalerie(tousProjetsJSON);
});

//--------------------------------------------------------------------------------------------
//  Affiche image une fois sélectionné dans Modal2

  const photoInput = document.getElementById('photo');
  const imageTelecharge = document.getElementById('selectionImage');

  photoInput.addEventListener('change', function(event){
    //files[0] = propriété qui représente le premier fichier sélectionné 
    const file = event.target.files[0];
    //FileReader() = interface de lecture des fichiers
    const reader = new FileReader();

    
    const labelPhoto = document.getElementById('labelPhoto')

    labelPhoto.style.display = "none";

    //met à jour src de Id='selectionImage' 
    //onload = propriété assigné à une fonction
    reader.onload = function(e) {
      imageTelecharge.src = e.target.result;
    };
  
    reader.readAsDataURL(file);
  });
//--------------------------------------------------------------------------------------------
// Création d'une nouvelle catégorie dans modal2
//Ajout d'img avec nouvelle catégorie pas encore possible !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const categorieduprojet = document.getElementById('categorieduprojet');
const nouvelleCategorie = document.getElementById('nouvelleCategorie');

categorieduprojet.addEventListener('change', function() {
  const selecteOption = this.options[this.selectedIndex];
  if (selecteOption === nouvelleCategorie) {
    const nouveauNomCategorie = prompt('Enter the new category name:');
    
    const nouvelleOption = document.createElement('option');    
    nouvelleOption.innerText = nouveauNomCategorie;
    nouvelleOption.value = (categorieduprojet.length - 1) // assigne une valeur chiffré 

    categorieduprojet.appendChild(nouvelleOption);
    nouvelleOption.selected = true;
    console.log(categorieduprojet)
  }
});


//--------------------------------------------------------------------------------
// Vérifie que les 3 inputs sont complétés et ajoute une classe pour bouton 


const imageForm = document.getElementById('imageForm');
const titreduprojectInput = document.getElementById('titreduproject');
const categorieduprojetInput = document.getElementById('categorieduprojet');
const validerAjoutImageButton = document.getElementById('validerAjoutImage');

// Event listener 
imageForm.addEventListener('change', changebouton);

// fonction pour changer la couleur du bouton valider quand les 3 inputs sont remplis
function changebouton() {
  if (tousLesChampsRemplis()) {
    validerAjoutImageButton.classList.add('validerImage-active');
  } else {
    validerAjoutImageButton.classList.remove('validerImage-active');
  }
}
// Fonction pour vérifier que les 3 champs sont remplis 
function tousLesChampsRemplis() {
  return photoInput.files.length == 1 && titreduprojectInput.value.trim() !== '' && categorieduprojetInput.value !== '';
}


//--------------------------------------------------------------------------------------------
//Ajoute l'image à la base de donnée API 

  console.log('token:', token)

  document.getElementById('imageForm').addEventListener('submit',function(event) {
    event.preventDefault();

    const photo = document.getElementById('photo').files[0];
    const titre = document.getElementById('titreduproject').value;
    const category = parseInt(document.getElementById('categorieduprojet').value);

    const formData = new FormData();

    formData.append('image', photo);
    formData.append('title', titre);
    formData.append('category', category);

    const reponseForm = document.getElementById('reponseForm');

    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`      
      },
      
    })
    .then(APIresponse => {
      if(APIresponse.ok){
        reponseForm.innerText = "Image envoyée ! "
       return APIresponse.json();
      }else{
        throw new Error ( reponseForm.innerText = "Erreur : " + APIresponse.status);
      }
    })
    .then(data => {
      console.log(data);
      //Ajoute Dynamiquement le nouveau projet dans la galerie de la modale
      const modaleHTMLgalerieElement = document.querySelector('#modal .gallery');
      const modaleJsfigureElement = document.createElement('figure');
      const modaleJsimgElement = document.createElement('img');
      const modaleJsTextElement = document.createElement('a');
      const modaleJsIconsConteneur = document.createElement('div');
      const modaleJsIconPoubelle = document.createElement('i');
      const modaleJsIconDirection = document.createElement('i');

      modaleJsimgElement.src = data.imageUrl;
      modaleJsimgElement.alt = data.title;

      modaleJsTextElement.innerText = 'éditer';
      modaleJsTextElement.href = '#';
      modaleJsTextElement.className = 'modalTextEdit';

      modaleJsIconsConteneur.className = 'conteneurIcons';

      modaleJsIconPoubelle.className = 'fa-solid fa-trash-can poubelle';
      modaleJsIconPoubelle.setAttribute('data-projet', data.id);
      modaleJsIconPoubelle.addEventListener('click', () => {
        supprimerProjet(data.id)
          .then(() => {
            modaleJsfigureElement.remove();
          })
      });

      modaleJsIconDirection.className = 'fa-solid fa-arrows-up-down-left-right ordre-des-icons';

    modaleJsfigureElement.appendChild(modaleJsimgElement);
    modaleJsfigureElement.appendChild(modaleJsTextElement);
    modaleJsfigureElement.appendChild(modaleJsIconsConteneur);
    modaleJsIconsConteneur.appendChild(modaleJsIconPoubelle);
    modaleJsIconsConteneur.appendChild(modaleJsIconDirection);
    modaleHTMLgalerieElement.appendChild(modaleJsfigureElement);


    //Ajoute dynamiquement le projet dans la galerie de indexedit.html
    const indexHTMLgalleryElement = document.querySelector('.gallery');      //Assigne une classe à la variable
    const indexJsfigureElement = document.createElement('figure');
        
    const indexJsimgElement = document.createElement('img');
    const indexJstextElement = document.createElement('p');

    indexJsimgElement.src = data.imageUrl;
    indexJsimgElement.alt = titre;

    indexJstextElement.innerHTML = titre;
  
    indexJsfigureElement.appendChild(indexJsimgElement);
    indexJsfigureElement.appendChild(indexJstextElement);
    indexHTMLgalleryElement.appendChild(indexJsfigureElement);


    })
  })

//---------------------------------------------------------------------------------------------------------

//IMPORT
//import { JsfigureElement } from "./fetch.js"; // ????????????????????????????