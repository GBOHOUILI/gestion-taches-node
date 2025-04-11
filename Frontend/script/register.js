const API_BASE_URL = 'http://localhost:3000/api';

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nom = document.getElementById('nom').value;
  const prenom = document.getElementById('prenom').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, prenom, email, password, role }),
    });

    const data = await response.json();

    if (response.ok) {
      if (role === 'membre') {
        alert('Votre inscription a été soumise. Veuillez attendre la validation de l\'admin.');
      } else {
        alert('Inscription réussie. Vous pouvez maintenant vous connecter.');
      }
      window.location.href = 'index.html'; // Redirige vers la page de connexion
    } else {
      alert(data.message || 'Erreur lors de l\'inscription.');
    }
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    alert('Une erreur est survenue. Veuillez réessayer.');
  }
});