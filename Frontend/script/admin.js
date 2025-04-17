// Sélection des éléments DOM
const userTableBody = document.getElementById('userTableBody');
const userModal = document.getElementById('userModal');
const modalTitle = document.getElementById('modalTitle');
const userForm = document.getElementById('userForm');
const cancelBtn = document.getElementById('cancelBtn');
const createUserBtn = document.getElementById('createUserBtn');
const pendingUsersTableBody = document.getElementById('pendingUsersTableBody');

let editingUserId = null;

// URL de base de l'API
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Récupère et affiche les utilisateurs en attente depuis l'API.
 */
async function fetchPendingUsers() {
  try {
    const response = await fetch('http://localhost:8080/api/users/pending');
    if (!response.ok) throw new Error('Erreur lors de la récupération des utilisateurs en attente.');
    const pendingUsers = await response.json();

    pendingUsersTableBody.innerHTML = pendingUsers
      .map(
        (user) => `
      <tr>
        <td>${user.nom}</td>
        <td>${user.prenoms}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
          <button class="text-green-500 hover:text-green-600" onclick="handleUserValidation('${user._id}')">
            Valider
          </button>
          <button class="text-red-500 hover:text-red-600" onclick="handleUserDeletion('${user._id}', true)">
            Supprimer
          </button>
        </td>
      </tr>
    `
      )
      .join('');
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * Valide un utilisateur en attente via l'API.
 * @param {string} userId - ID de l'utilisateur à valider.
 */
async function handleUserValidation(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la validation de l\'utilisateur.');
    }

    alert('Utilisateur validé avec succès.');
    fetchPendingUsers(); // Rafraîchir la liste des utilisateurs en attente
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
}

/**
 * Supprime un utilisateur (en attente ou non) via l'API.
 * @param {string} userId - ID de l'utilisateur à supprimer.
 * @param {boolean} isPending - Indique si l'utilisateur est en attente.
 */
async function handleUserDeletion(userId, isPending = false) {
  try {
    const endpoint = isPending ? 'users/pending/delete' : 'users/delete';
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la suppression de l\'utilisateur.');
    }

    alert('Utilisateur supprimé avec succès.');
    if (isPending) {
      fetchPendingUsers(); // Rafraîchir la liste des utilisateurs en attente
    } else {
      fetchUsers(); // Rafraîchir la liste des utilisateurs
    }
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
}

/**
 * Récupère et affiche les utilisateurs depuis l'API.
 */
async function fetchUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des utilisateurs.');
    const users = await response.json();

    userTableBody.innerHTML = users
      .map(
        (user) => `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
          <button class="text-yellow-500 hover:text-yellow-600" onclick="editUser('${user._id}')">
            Modifier
          </button>
          <button class="text-red-500 hover:text-red-600" onclick="handleUserDeletion('${user._id}')">
            Supprimer
          </button>
        </td>
      </tr>
    `
      )
      .join('');
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * Ouvre la modale pour créer un utilisateur.
 */
createUserBtn.addEventListener('click', () => {
  editingUserId = null;
  modalTitle.textContent = 'Créer un utilisateur';
  userForm.reset();
  userModal.classList.remove('hidden');
});

/**
 * Ferme la modale.
 */
cancelBtn.addEventListener('click', () => {
  userModal.classList.add('hidden');
});

/**
 * Enregistre un utilisateur (création ou modification) via l'API.
 */
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const role = document.getElementById('role').value;

  try {
    const endpoint = editingUserId ? `users/update/${editingUserId}` : 'users/create';
    const method = editingUserId ? 'PUT' : 'POST';

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, role }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de l\'enregistrement de l\'utilisateur.');
    }

    alert(editingUserId ? 'Utilisateur modifié avec succès.' : 'Utilisateur créé avec succès.');
    userModal.classList.add('hidden');
    fetchUsers(); // Rafraîchir la liste des utilisateurs
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
});

/**
 * Ouvre la modale pour modifier un utilisateur.
 * @param {string} userId - ID de l'utilisateur à modifier.
 */
async function editUser(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des informations de l\'utilisateur.');
    const user = await response.json();

    editingUserId = userId;
    modalTitle.textContent = 'Modifier un utilisateur';
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('role').value = user.role;
    userModal.classList.remove('hidden');
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
}

// Charger les utilisateurs et les utilisateurs en attente au démarrage
document.addEventListener('DOMContentLoaded', () => {
  fetchUsers();
  fetchPendingUsers();
});