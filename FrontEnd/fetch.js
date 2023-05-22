// Les projets s’affichent dans la galerie en provenant du back-end et en récupérant : .imagesURL et .title

/**
 * (fetch...) Lance une requête réseau vers Url de API work GET pour récupérer les données 
 *            et renvoie une promesse 
 * (.then(response...)) Convertit les données dans url au format JSON
 * (.then(datafiltre...)) datafiltre représente les données JSON extraite
 */



fetch('http://localhost:5678/api/works') 
  .then(response => response.json())
  .then(datafiltre => {
    const galleryElement = document.querySelector('.gallery');
    //Assigne à ma classe gallery une variable
    
    function displayProjects(projects) {
      galleryElement.innerHTML = ''; 
      // Efface la galerie existante pour assurer que seule la catégorie séléctionné est afficher.
  
      projects.forEach(project => {
        //Boucle itère sur chaque élément du projects
        const figureElement = document.createElement('figure');
  
        const imgElement = document.createElement('img');
        imgElement.src = project.imageUrl;
        imgElement.alt = project.title;
        
        const figcaptionElement = document.createElement('figcaption');
        figcaptionElement.textContent = project.title;
        
        figureElement.appendChild(imgElement);
        figureElement.appendChild(figcaptionElement);
        
        galleryElement.appendChild(figureElement);
      });
    }
  
    // Fonction pour filtrer les projets par catégorie
    function filterName(categoryId) {
      if (categoryId === null) {
        displayProjects(datafiltre); // Afficher tous les projets
      } else {
        const filteredProjects = datafiltre.filter(project => project.categoryId === categoryId);
        displayProjects(filteredProjects); // Afficher les projets filtrés
      }
    }
  
    // Créer les boutons de filtre
    const filtre = document.querySelector(".filtre");
    const uniqueFiltre = new Set();
  
    datafiltre.forEach(project => {
      if (!uniqueFiltre.has(project.category.name)){
        uniqueFiltre.add(project.category.name);
        // ! = opérateur négation qui inverse la valeur true or false
        //permet de vérifier que le nom n'est pas déjà afficher
        const buttonFilters = document.createElement('button');
        buttonFilters.textContent = project.category.name;
        filtre.appendChild(buttonFilters);
  
        buttonFilters.addEventListener('click', () => {
          filterName(project.categoryId);
        });
      }
    });
  
    // Ajout du bouton "Tous" pour afficher l'ensemble des projets
    const tousButton = document.createElement('button');
    tousButton.textContent = "Tous";
    filtre.appendChild(tousButton);
  
    tousButton.addEventListener('click', () => {
      filterName(null);
      //Null pour afficher tous les projets disponible
      //Null = sans filtre appliqué
    });
  
    // Afficher tous les projets au chargement de la page
    displayProjects(datafiltre);
});
