// Gestion des informations personnelles
document.getElementById('personalInfoForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('adminNameInput').value;
  const email = document.getElementById('adminEmailInput').value;

  // Simuler une mise à jour (remplacer par un appel API)
  alert(`Informations mises à jour :\nNom : ${name}\nEmail : ${email}`);
});

// Gestion du mot de passe
document.getElementById('passwordForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (newPassword !== confirmPassword) {
    alert('Les mots de passe ne correspondent pas.');
    return;
  }

  // Simuler une mise à jour du mot de passe (remplacer par un appel API)
  alert('Mot de passe mis à jour avec succès.');
});

// Gestion des préférences
document.getElementById('preferencesForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const notifications = document.getElementById('notifications').value;

  // Simuler une mise à jour des préférences (remplacer par un appel API)
  alert(`Préférences mises à jour : Notifications ${notifications === 'enabled' ? 'activées' : 'désactivées'}.`);
});