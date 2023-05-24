
const formulaire = document.querySelector('form')

formulaire.addEventListener('submit',(evenement)=>{
  evenement.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  const utilisateur = {
    email: email,
    password: password,
  };

  fetch('http://localhost:5678/api/users/login', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(utilisateur)
  })
  .then(APIreponse => {
    if (APIreponse.ok) {// Condition si les données d'utilisateurs sont correctes
      window.location.href = 'index.html'; 
    } else {// Sinon message d'erreur
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
  


