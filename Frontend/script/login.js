document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const button = this.querySelector('button');
  const inputs = Array.from(this.querySelectorAll('input'));

  // Désactiver les champs et afficher une animation
  inputs.forEach(input => {
    input.disabled = true;
    input.classList.add('opacity-70');
  });
  button.innerHTML = '<span class="inline-block animate-spin mr-2">↻</span> Connexion...';
  button.classList.add('bg-blue-800');

  // Récupérer les données du formulaire
  const email = this.querySelector('input[name="email"]').value;
  const password = this.querySelector('input[name="password"]').value;

  try {
    // Requête au backend pour la connexion
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Une erreur est survenue.');
    }

    // Redirection en fonction du rôle
    const userRole = data.user.role;
    if (userRole === 'admin') {
      window.location.href = 'admin.html';
    } else if (userRole === 'membre') {
      window.location.href = 'member.html'
    }else if (userRole === 'responsable') {
      window.location.href = 'manager.html';
    } 
    else {
      alert('Rôle inconnu. Veuillez contacter l\'administrateur.');
    }
  } catch (error) {
    alert(error.message);
  } finally {
    // Réinitialiser les champs et le bouton
    button.innerHTML = 'Se connecter';
    button.classList.remove('bg-blue-800');
    inputs.forEach(input => {
      input.disabled = false;
      input.classList.remove('opacity-70');
    });
  }
});