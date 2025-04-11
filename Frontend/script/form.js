const API_BASE_URL = 'http://localhost:3000/api';
const main = document.querySelector('main');

// Fonction pour rediriger vers le dashboard en fonction du rôle
function redirectToDashboard(role) {
  if (role === 'admin') {
    window.location.href = 'admin.html';
  } else if (role === 'responsable') {
    window.location.href = 'responsable.html';
  } else if (role === 'membre') {
    window.location.href = 'membre.html';
  }
}

// Gestion de la soumission du formulaire de connexion
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      redirectToDashboard(data.role);
    } else {
      alert(data.message || 'Erreur de connexion');
    }
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    alert('Une erreur est survenue. Veuillez réessayer.');
  }
});