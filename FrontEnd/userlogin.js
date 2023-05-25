
const formulaire = document.querySelector('form')

formulaire.addEventListener('submit',(evenement)=>{
  evenement.preventDefault();//Empêche le comportement par défaut
  // le code récupère les valeurs du formulaire, effectue une requête HTTP asynchrone pour authentifier l'utilisateur et gère les conditions de la réponse

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  const utilisateur = {
    email: email,
    password: password,
  };

  fetch('http://localhost:5678/api/users/login', {
    method:'POST',  //option de la méthode de la requête
    headers: {
      'Content-Type': 'application/json'
    },//Indique au serveur le contenu de la requête au format JSON
    body: JSON.stringify(utilisateur)
    //Convertit l'objet "utilisateur" en JSON pour l'envoyer dans la requête
  })
  .then(APIreponse => {         //Effectue une fonction si promesse résolue
    if (APIreponse.ok) {        //.ok est une propriété qui renvoie true or false 
      //Condition si les données d'utilisateurs sont correctes
      window.location.href = 'indexedit.html';  //Redirige l'utilisateur vers une URL
    } else {                    // Sinon message d'erreur
      throw new Error('Erreur dans l\'identifiant ou le mot de passe');
    } 
  })
  .catch(erreur => {
    console.error(erreur);

    const messageErreur = document.createElement('p');
    messageErreur.textContent = erreur.message;
    const zoneMessage = document.getElementById('message')

    zoneMessage.appendChild(messageErreur);
  });
})
  


