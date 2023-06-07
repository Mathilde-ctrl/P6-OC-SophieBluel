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
function closeModal(event) {
  if (modal.contains(event.target)){
    modal.style.display = 'none';
    //location.reload();
  } else if (modal2.contains(event.target)) {
    modal2.style.display = 'none';
    //location.reload();
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
  closeIcons[i].addEventListener('click', closeModal);
}

// évenements d'écoute au moment du click en dehors des modales
window.addEventListener('click', function(event) {
  if (event.target !== modal && event.target !== modal2) {
    return;
  }
  closeModal(event);
});

//-------------------------------------------------------
//Affiche les projets dans la modale avec les fonctionnalités supprimer 

function afficheProjetsGalerie(projets) {
  const HTMLgalleryElement = document.querySelector('#modal .gallery');
  const categorieduprojet = document.getElementById('categorieduprojet')  //
  const categorieUnique = new Set();

  for (let i = 0; i < projets.length; i++) {
    const projet = projets[i];
    const JsfigureElement = document.createElement('figure');
    const JsimgElement = document.createElement('img');
    const JsTextElement = document.createElement('a');
    const JsIconsConteneur = document.createElement('div');
    const JsIconPoubelle = document.createElement('i');
    const JsIconDirection = document.createElement('i');
    const idprojet = projet.id;
    const JsOptionMenu = document.createElement('option');  //

    JsOptionMenu.innerText = projet.category.name;  //
    JsOptionMenu.value = projet.category.id;  //

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
        .then(() => {
          JsfigureElement.remove();
        })
        .catch(error => {
          console.error('Problème pour supprimer un projet:', error);
        });
    });

    JsIconDirection.className = 'fa-solid fa-arrows-up-down-left-right ordre-des-icons';

    if (!categorieUnique.has(projet.category.name)){
      categorieduprojet.appendChild(JsOptionMenu);
      categorieUnique.add(projet.category.name);
    }

    JsfigureElement.appendChild(JsimgElement);
    JsfigureElement.appendChild(JsTextElement);
    JsfigureElement.appendChild(JsIconsConteneur);
    JsIconsConteneur.appendChild(JsIconPoubelle);
    JsIconsConteneur.appendChild(JsIconDirection);
    HTMLgalleryElement.appendChild(JsfigureElement);

  }
}
const token = sessionStorage.getItem('token')

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
    });
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
  // Affiche image une fois sélectionné 

  const photoInput = document.getElementById('photo');
  

  photoInput.addEventListener('change', function(event){
    const file = event.target.files[0];
    const reader = new FileReader();

    const imageTelecharge = document.getElementById('selectionImage');
    const labelPhoto = document.getElementById('labelPhoto')

    labelPhoto.style.display = "none";

    reader.onload = function(e) {
      imageTelecharge.src = e.target.result;
    };
  
    reader.readAsDataURL(file);

  });
//--------------------------------------------------------------------------------------------
// 
const categorieduprojet = document.getElementById('categorieduprojet');

categorieduprojet.addEventListener('change', function() {
  const selectedOption = this.options[this.selectedIndex];
  const newCategoryOption = document.getElementById('nouvelleCategorie');

  if (selectedOption === newCategoryOption) {
    const newCategoryName = prompt('Enter the new category name:');

    const newOption = document.createElement('option');
    newOption.value = newCategoryName;
    newOption.text = newCategoryName;
    this.appendChild(newOption);
    newOption.selected = true;
  }
});


//--------------------------------------------------------------------------------
// Vérifie que les 3 inputs sont complétés et ajoute une classe pour bouton 

const imageForm = document.getElementById('imageForm');
const titreduprojectInput = document.getElementById('titreduproject');
const categorieduprojetInput = document.getElementById('categorieduprojet');
const validerAjoutImageButton = document.getElementById('validerAjoutImage');

// Function to check if all required fields are filled
function tousLesChampsRemplis() {
  return photoInput.files.length > 0 && titreduprojectInput.value.trim() !== '' && categorieduprojetInput.value !== '';
}

// Event listener for input and change events on the form
imageForm.addEventListener('input', changebouton);
imageForm.addEventListener('change', changebouton);

// Event handler for form change events
function changebouton() {
  if (tousLesChampsRemplis()) {
    validerAjoutImageButton.classList.add('validerImage-active');
  } else {
    validerAjoutImageButton.classList.remove('validerImage-active');
  }
}



//--------------------------------------------------------------------------------------------
//Ajoute l'image à la base de donnée API 
//Ne fonctionne pas pour le moment.

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
        throw new Error ( APIresponse.status);
      }
    })
    .then(data => {

      console.log(data);
    })

    .catch(err => {
      console.log(err);
    })
  })


  

