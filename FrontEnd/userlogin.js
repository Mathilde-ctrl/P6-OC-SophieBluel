/**
 * userlogin.js
 * 
 * Gestion de l'authentification de l'administratice
 * 
 * @author Mathilde Plancq
 * @version 1.0
 * @date 2023-06
 */

/**
 * @var HTMLFormElement formulaire objet DOM formulaire d'authentification
 */
const formulaire = document.querySelector('form');

/**
 * Ajout d'un écouteur d'événement sur la soumission du formulaire
 */
formulaire.addEventListener('submit', (evenement) => {
  // fonction anonyme appelé à la soumission du formulaire

  // Retire la soumission par défaut du formulaire
  evenement.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const utilisateur = {
    email: email,
    password: password,
  };

  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(utilisateur),
  })
    .then(APIreponse => {
      if (APIreponse.ok) {
        return APIreponse.json();
      } else {
        throw new Error('Erreur dans l\'identifiant ou le mot de passe');
        //message enregistrer avec propriété .message dans l'objet Error
      }
    })
    .then(loginReponse => {
      const token = loginReponse.token;
      sessionStorage.setItem('token', token);
      window.location.href = 'indexedit.html';
    })
    .catch(error => {
      console.error(error);
      const zoneMessage = document.getElementById('texterreurmessage');
      zoneMessage.textContent = error.message
      //.message = propriété pour récupérer le message d'erreur enregistré
    });
});
