// Exemple de fausses notifications (à remplacer plus tard par des données réelles du backend)
const notifications = [
  {
    id: 1,
    message: "Nouvelle demande d’inscription",
    user: "Ali Touré",
    time: "il y a 5 minutes",
    read: false
  },
  {
    id: 2,
    message: "Nouveau message reçu de l’équipe support",
    user: "Support",
    time: "il y a 10 minutes",
    read: false
  },
  {
    id: 3,
    message: "Mise à jour du profil utilisateur",
    user: "Fatou B.",
    time: "il y a 1 heure",
    read: true
  }
];

const container = document.getElementById('notificationsContainer');

// Fonction pour afficher toutes les notifications
function renderNotifications() {
  container.innerHTML = ''; // reset
  notifications.forEach(notif => {
    const notifEl = document.createElement('div');
    notifEl.className = `bg-white p-4 rounded shadow flex justify-between items-center ${notif.read ? 'opacity-50' : ''}`;

    notifEl.innerHTML = `
      <div>
        <p class="text-gray-800 font-semibold">${notif.message}</p>
        <p class="text-gray-500 text-sm">Utilisateur: <strong>${notif.user}</strong> - ${notif.time}</p>
      </div>
      <div class="flex space-x-2">
        <button class="mark-read bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm" data-id="${notif.id}">
          ${notif.read ? 'Déjà lue' : 'Marquer comme lue'}
        </button>
        <button class="delete bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm" data-id="${notif.id}">
          Supprimer
        </button>
      </div>
    `;

    container.appendChild(notifEl);
  });

  attachEventListeners();
}

// Fonction pour ajouter les actions aux boutons
function attachEventListeners() {
  document.querySelectorAll('.mark-read').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      const notif = notifications.find(n => n.id === id);
      if (notif && !notif.read) {
        notif.read = true;
        renderNotifications();
      }
    });
  });

  document.querySelectorAll('.delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      const index = notifications.findIndex(n => n.id === id);
      if (index !== -1) {
        notifications.splice(index, 1);
        renderNotifications();
      }
    });
  });
}

// Au chargement de la page
document.addEventListener('DOMContentLoaded', renderNotifications);
