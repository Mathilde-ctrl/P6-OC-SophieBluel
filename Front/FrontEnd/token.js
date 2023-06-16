/**
 * token.js
 * 
 * Validation du token au chargement de indexedit.html après une authentification correcte à login.html
 * 
 * @author Mathilde Plancq
 * @version 1.0
 * @date 2023-06
 */

//--- Sécurise l'ouverture de la page indexedit.html ---

/**
 * Vérifie l'existance du token stocké dans sessionStorage au moment de l'authentification
 * Si le token n'est pas trouvé alors redirige vers la page de login.html 
 * 
 * @function verifieToken
 * 
 */
function verifieToken(){
  //Récupére le token dans sessionStorage 
  const token = sessionStorage.getItem('token')
  //Si pas de token alors redirige vers login.html
  if(!token){
    window.location.href = "login.html";
  }
}
//Appelle la fonction
verifieToken();

