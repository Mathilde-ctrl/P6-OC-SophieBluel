//Ouvre ma boite modale

//La balise aside 
const modal = document.getElementById('modal');
//Le lien d'ouverture dans a 
const lienModal = document.querySelector('.lienmodal');

const closeIcon = document.querySelector('.x-close');

function openModal(event) {
  //event.preventDefault();
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

lienModal.addEventListener('click', openModal);
closeIcon.addEventListener('click', closeModal); // to change after 
window.addEventListener('click', function(event){
  if(event.target === modal){
    closeModal();
  }
});

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