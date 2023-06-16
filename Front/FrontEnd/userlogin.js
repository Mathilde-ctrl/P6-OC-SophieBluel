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

  /**
   * @var string email valeur entrée dans le input type email
   */
  const email = document.getElementById('email').value;
  /**
   * @var string password valeur entrée dans le input type password
   */
  const password = document.getElementById('password').value;

  /**
   * @var objet utilisateur contient les valeurs de email et password
   */
  const utilisateur = {
    email: email,
    password: password,
  };

  /**
   * Envoye une requête http 'POST' vers l'API de connexion pour les utilisateurs
   * @param {object} utilisateur
   * @returns {Promise} 
   */
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    //défini les en-têtes de la requête
    headers: {
      'Content-Type': 'application/json',
    },
    //Convertit l'objet utilisateur en chaîne JSON pour l'envoyer dans la requête
    body: JSON.stringify(utilisateur),
  })
    /**
     * @param {response} APIreponse
     * @return {Promise} 
     * @throws {Error}
     */
    //'APIreponse' représente la réponse de la requête
    .then(APIreponse => {

      // Condition de traitement de la requête avec propriété .ok
      //Si APIreponse est true alors la requête a été traité avec succès
      if (APIreponse.ok) {
        //APireponse.json() est une méthode permettant de lire le contenue de la reponse
        //Convertit JSON pour être utilisé par JavaScript
        return APIreponse.json();
      } else {
        //Si la réponse est false un message d'erreur est affiché 
        //La promesse est envoyé a .catch
        throw new Error('Erreur dans l\'identifiant ou le mot de passe');
        //message enregistrer avec propriété .message dans l'objet Error
      }
    })
    //Si promesse précédente true alors ce code est exécuté
    //loginReponse correspond à la valeur renvoyée par la méthode APIreponse.json()
    .then(loginReponse => {
      //Extrait le token de de APIresponse.json() avec objet loginReponse obtenu avec la réponse de l'API   
      const token = loginReponse.token;
      //stock le token dans sessionStorage 
      sessionStorage.setItem('token', token);
      //redirige l'utilisateur connecté vers indexedit.html
      window.location.href = 'indexedit.html';
    })

    //Si erreur précédente alors ce code est exécuté
    .catch(error => {
      console.error(error);

      /**
       * @var HTMLElement zoneMessage - Sélectionne la balise <div> qui informe l'utilisateur d'un message
       */
      const zoneMessage = document.getElementById('message');
      /**
       * @var HTMLElement textErreurMessage - Sélectionne le balise <p> qui contient le message 
       */
      const textErreurMessage = document.getElementById('texterreurmessage');
      
      // Changement de display pour faire apparaître zoneMessage quand une erreur ce produit
      zoneMessage.style.display = 'flex';
      //.message = propriété pour récupérer le message d'erreur enregistré
      textErreurMessage.textContent = error.message;
      
    });
});


//--------------------------------------------------------------------------------------------
/**
 * Fonction pour déconnecter l'utilisateur en enlevant le token de sessionsStorage
 */
function logoutUtilisateur() {
  //retire le token enregistré
  sessionStorage.removeItem('token');
  //dirige l'utilisateur à la page index.html
  window.location.href = 'index.html';
}

/**
 * @var HTMLElement logoutLink lien de déconnection
 */
const logoutLink = document.getElementById('logout');

/**
 * Ajout d'un écouteur d'événement lors du click sur lien logoutLink 
 */
logoutLink.addEventListener('click', () => {
  //appelle la fonction qui retire le token et redirige vers la page index.html
  logoutUtilisateur();
});