/**
 * (fetch...) Initie une requête réseau avec Url de API work GET pour récupérer les données
 * (.then(res...)) Convertit les données dans url au format JSON
 * (.then(data...))
 * (Const gallery) Assigne à la classe .gallery la variable galleryElemen
 * (data.forEach) Itére sur chaque élément projet dans le tableau de données
 * (.catch(error => {) Gère les erreurs
 */

fetch('http://localhost:5678/api/works') 
.then(response => response.json())
.then(data => {
  const galleryElement = document.querySelector('.gallery');
  
  data.forEach(project => {
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
})
.catch(error => {
  console.error('An error occurred while retrieving the projects:', error);
});
console.log()