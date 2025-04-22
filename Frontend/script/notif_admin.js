// Initialiser Socket.IO
const socket = io('http://localhost:8080');

// Testez la connexion avec le backend via Socket.IO
socket.on('testEvent', (data) => {
  console.log(data.message); // Devrait afficher "Connexion réussie avec Socket.IO"
});

// Fonction pour ajouter une notification dans la liste HTML
function addNotification(message, icon = "bell", time = "à l'instant") {
  const notificationList = document.getElementById("notificationList"); // Cible l'élément <ul>
  if (notificationList) {
    const notificationItem = document.createElement("li");
    notificationItem.className = "bg-white p-4 rounded shadow flex items-start gap-4";

    notificationItem.innerHTML = `
      <svg class="text-blue-600 w-6 h-6" fill="none" stroke="currentColor" stroke-width="2">
        <use href="#${icon}"></use>
      </svg>
      <div>
        <p class="text-gray-800">${message}</p>
        <span class="text-sm text-gray-500">${time}</span>
      </div>
    `;

    notificationList.prepend(notificationItem); // Ajouter la notification en haut de la liste
  } else {
    console.error("La liste des notifications est introuvable.");
  }
}

// Écouter les notifications en temps réel via Socket.IO
socket.on('newNotification', (notification) => {
  console.log('Nouvelle notification reçue :', notification);
  addNotification(notification.message, notification.icon, new Date(notification.time).toLocaleString());
});

// Fonction pour récupérer les notifications depuis le backend
async function fetchNotifications() {
  try {
    const token = localStorage.getItem('token'); // Récupérer le token d'authentification
    const response = await fetch('http://localhost:8080/api/notifications', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Inclure le token dans l'en-tête
      },
      credentials: 'include', // Inclure les cookies pour l'authentification
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des notifications');
    }

    const notifications = await response.json();
    notifications.forEach(notification => {
      addNotification(notification.message, notification.icon, new Date(notification.time).toLocaleString());
    });
  } catch (error) {
    console.error('Erreur :', error);
  }
}

// Fonction pour notifier le backend lors d'une action utilisateur
async function notifyBackend(action, user) {
    try {
      console.log('Envoi de la notification au backend...', { action, user });
    const response = await fetch('http://localhost:8080/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action, // Exemple : "create", "update", "delete", "validate"
        user,   // Informations sur l'utilisateur
      }),
    });

        if (!response.ok) {
          const errorData = await response.json();
      console.error('Erreur du backend :', errorData);
      throw new Error('Erreur lors de l\'envoi de la notification au backend');
    }

    console.log('Notification envoyée au backend avec succès.');
  } catch (error) {
    console.error('Erreur :', error);
  }
}

// Gestion des événements des boutons
document.getElementById("markAllRead").addEventListener("click", () => {
  const notifications = document.querySelectorAll("ul#notificationList li");
  notifications.forEach(notification => {
    notification.style.opacity = "0.5"; // Réduire l'opacité pour indiquer qu'elles sont lues
  });
  alert("Toutes les notifications ont été marquées comme lues.");
});

document.getElementById("clearAll").addEventListener("click", () => {
  const notificationList = document.querySelector("ul#notificationList");
  if (notificationList) {
    notificationList.innerHTML = ""; // Supprimer toutes les notifications
    alert("Toutes les notifications ont été effacées.");
  } else {
    console.error("La liste des notifications est introuvable.");
  }
});

// Exemple d'utilisation : Simuler une action utilisateur
function onUserCreated(user) {
  notifyBackend('create', user);
  addNotification(`Nouvel utilisateur créé : ${user.nom} ${user.prenoms}`, 'check-circle', 'à l\'instant');
}

function onUserUpdated(user) {
  notifyBackend('update', user);
  addNotification(`Utilisateur modifié : ${user.nom} ${user.prenoms}`, 'edit', 'à l\'instant');
}

function onUserDeleted(user) {
  notifyBackend('delete', user);
  addNotification(`Utilisateur supprimé : ${user.nom} ${user.prenoms}`, 'trash', 'à l\'instant');
}

function onUserValidated(user) {
  notifyBackend('validate', user);
  addNotification(`Utilisateur validé : ${user.nom} ${user.prenoms}`, 'check-circle', 'à l\'instant');
}

// Charger les notifications au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  fetchNotifications();
});