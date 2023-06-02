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
//Génère les projets
fetch('http://localhost:5678/api/works') 
  .then(APIresponse => APIresponse.json())
  .then(tousProjetsJSON => {   
    function afficheProjetsGalerie(projets) {
      const HTMLgalleryElement = document.querySelector('#modal .gallery');      //Assigne une classe à la variable
  
      for (let i = 0; i < projets.length; i++){       // Boucle pour créer une figure et une img avec src et alt pour chaque élements.
        const projet = projets[i];
        const JSfigureElement = document.createElement('figure');
        const JSimgElement = document.createElement('img');
        const JsTextElement = document.createElement('a');
        const JsIconsElement = document.createElement('div')

        JSimgElement.src = projet.imageUrl;
        JSimgElement.alt = projet.title;

        JsTextElement.innerText = "éditer";
        JsTextElement.href = "#"
        JsTextElement.className = "modalTextEdit"

        JsIconsElement.innerHTML = '<i class="fa-solid fa-trash-can poubelle"></i> <i class="fa-solid fa-arrows-up-down-left-right ordre-des-icons"></i>';
        JsIconsElement.className = "conteneurIcons"

        JSfigureElement.appendChild(JSimgElement);
        JSfigureElement.appendChild(JsTextElement);
        JSfigureElement.appendChild(JsIconsElement);
        HTMLgalleryElement.appendChild(JSfigureElement);
      };
    }
    afficheProjetsGalerie(tousProjetsJSON);
});