

function logoutUtilisateur() {
  sessionStorage.removeItem('token');
  window.location.href = 'index.html';
}

const logoutLink = document.getElementById('logout');
logoutLink.addEventListener('click', () => {
  logoutUtilisateur();
});