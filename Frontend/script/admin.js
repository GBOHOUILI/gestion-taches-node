// const { compareSync } = require("bcrypt");

const userTableBody = document.getElementById('userTableBody');
const userModal = document.getElementById('userModal');
const modalTitle = document.getElementById('modalTitle');
const userForm = document.getElementById('userForm');
const cancelBtn = document.getElementById('cancelBtn');
const createUserBtn = document.getElementById('createUserBtn');
const pendingUsersTableBody = document.getElementById('pendingUsersTableBody');

let editingUserId = null;

// Fonction pour renouveler le jeton
async function renewToken() {
  try {
    const response = await fetch('http://localhost:8080/api/users/renew-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: localStorage.getItem('token') }),
    });

    if (!response.ok) {
      throw new Error('Impossible de renouveler le jeton.');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token); // Stockez le nouveau jeton
    console.log('Jeton renouvelé avec succès.');
    return data.token;
  } catch (error) {
    console.error('Erreur lors du renouvellement du jeton :', error);
    localStorage.removeItem('token'); // Supprimez le jeton expiré
    window.location.href = '/login.html'; // Redirigez vers la page de connexion
  }
}

// Fonction pour charger les utilisateurs depuis le backend

async function fetchUsers() {
  try {
    const response = await fetch('http://localhost:8080/api/admin/users', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.warn('Jeton expiré ou invalide. Tentative de renouvellement...');
        await renewToken(); // Renouvelle le jeton
        return fetchUsers(); // Relance la requête avec le nouveau jeton
      }
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();
    console.log('Utilisateurs récupérés :', data);
    return data.users || []; // Retourne uniquement le tableau des utilisateurs
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
}

// Fonction pour afficher les utilisateurs actifs
async function renderUsers() {
  const users = await fetchUsers();
  const activeUsers = users.filter(user => user.isActive); // Filtre les utilisateurs actifs
  userTableBody.innerHTML = activeUsers
    .map(
      (user) => `
    <tr>
        <td class="p-4">${user.nom} ${user.prenoms}</td>
        <td class="p-4">${user.email}</td>
        <td class="p-4">${user.role}</td>
        <td class="p-4">
            <button class="text-yellow-500 hover:text-yellow-600" onclick="editUser('${user._id}')">
                <i class="fas fa-edit"></i>
            </button>
            <button class="text-red-500 hover:text-red-600" onclick="deleteUser('${user._id}')">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    </tr>
`
    )
    .join('');
}

// Fonction pour afficher les utilisateurs en attente

async function renderPendingUsers() {
  const users = await fetchUsers();
  const pendingUsers = users.filter(user => !user.isActive); // Filtre les utilisateurs en attente
  pendingUsersTableBody.innerHTML = pendingUsers
    .map(
      (user) => `
    <tr>
        <td class="p-4">${user.nom} ${user.prenoms}</td>
        <td class="p-4">${user.email}</td>
        <td class="p-4">${user.role}</td>
        <td class="p-4 flex space-x-4">
            <button class="text-green-500 hover:text-green-600" onclick="validateUser('${user._id}')">
                <i class="fas fa-check"></i>
            </button>
            <button class="text-red-500 hover:text-red-600" onclick="deleteUser('${user._id}')">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    </tr>
`
    )
    .join('');
}


// Fonction pour valider un utilisateur
async function validateUser(id) {
  try {
    const response = await fetch(`http://localhost:8080/api/admin/users/${id}/validate`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.warn('Jeton expiré ou invalide. Tentative de renouvellement...');
        await renewToken();
        return validateUser(id); // Relance la requête après renouvellement
      }
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    await renderPendingUsers();
    await renderUsers();
  } catch (error) {
    console.error('Erreur lors de la validation de l’utilisateur :', error);
  }
}

// Fonction pour supprimer un utilisateur
async function deleteUser(id) {
  try {
    const response = await fetch(`http://localhost:8080/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.warn('Jeton expiré ou invalide. Tentative de renouvellement...');
        await renewToken();
        return deleteUser(id); // Relance la requête après renouvellement
      }
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    await renderPendingUsers();
    await renderUsers();
  } catch (error) {
    console.error('Erreur lors de la suppression de l’utilisateur :', error);
  }
}

// Initialiser les utilisateurs
(async function initialize() {
  await renderPendingUsers();
  await renderUsers();
})();