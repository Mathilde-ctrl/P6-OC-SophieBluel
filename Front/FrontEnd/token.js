//Sécurise l'ouverture de la page indexedit.html

function verifieToken(){
  const token = sessionStorage.getItem('token')

  if(!token){
    window.location.href = "login.html";
  }
}
verifieToken();

