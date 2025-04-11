const userTableBody = document.getElementById('userTableBody');
const userModal = document.getElementById('userModal');
const modalTitle = document.getElementById('modalTitle');
const userForm = document.getElementById('userForm');
const cancelBtn = document.getElementById('cancelBtn');
const createUserBtn = document.getElementById('createUserBtn');
const pendingUsersTableBody = document.getElementById('pendingUsersTableBody');

let editingUserId = null;

// Mock data (à remplacer par des appels API)
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'responsable' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'membre' },
];

// Afficher les utilisateurs dans le tableau
function renderUsers() {
userTableBody.innerHTML = users
    .map(
        (user) => `
    <tr>
        <td class="p-4">${user.name}</td>
        <td class="p-4">${user.email}</td>
        <td class="p-4">${user.role}</td>
        <td class="p-4">
            <button class="text-yellow-500 hover:text-yellow-600" onclick="editUser(${user.id})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="text-red-500 hover:text-red-600" onclick="deleteUser(${user.id})">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    </tr>
`
    )
    .join('');
}

// Ouvrir la modale pour créer un utilisateur
createUserBtn.addEventListener('click', () => {
  editingUserId = null;
  modalTitle.textContent = 'Créer un utilisateur';
  userForm.reset();
  userModal.classList.remove('hidden');
});

// Fermer la modale
cancelBtn.addEventListener('click', () => {
  userModal.classList.add('hidden');
});

// Enregistrer un utilisateur (création ou modification)
userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const role = document.getElementById('role').value;

  if (editingUserId) {
    // Modifier un utilisateur existant
    const user = users.find((u) => u.id === editingUserId);
    user.name = name;
    user.email = email;
    user.role = role;
  } else {
    // Créer un nouvel utilisateur
    users.push({ id: Date.now(), name, email, role });
  }

  renderUsers();
  userModal.classList.add('hidden');
});

// Modifier un utilisateur
function editUser(id) {
  const user = users.find((u) => u.id === id);
  editingUserId = id;
  modalTitle.textContent = 'Modifier un utilisateur';
  document.getElementById('name').value = user.name;
  document.getElementById('email').value = user.email;
  document.getElementById('role').value = user.role;
  userModal.classList.remove('hidden');
}

// Supprimer un utilisateur
function deleteUser(id) {
  const index = users.findIndex((u) => u.id === id);
  users.splice(index, 1);
  renderUsers();
}



// Mock data pour les utilisateurs en attente
const pendingUsers = [
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'membre' },
];

// Afficher les utilisateurs en attente
function renderPendingUsers() {
pendingUsersTableBody.innerHTML = pendingUsers
    .map(
        (user) => `
    <tr>
        <td class="p-4">${user.name}</td>
        <td class="p-4">${user.email}</td>
        <td class="p-4">${user.role}</td>
        <td class="p-4 flex space-x-4">
            <button class="text-green-500 hover:text-green-600" onclick="validateUser(${user.id})">
                <i class="fas fa-check"></i>
            </button>
            <button class="text-red-500 hover:text-red-600" onclick="deletePendingUser(${user.id})">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    </tr>
`
    )
    .join('');
}

// Valider un utilisateur
function validateUser(id) {
  const index = pendingUsers.findIndex((u) => u.id === id);
  const user = pendingUsers.splice(index, 1)[0];
  users.push(user); // Ajouter l'utilisateur validé à la liste principale
  renderPendingUsers();
  renderUsers();
}

// Supprimer un utilisateur en attente
function deletePendingUser(id) {
  const index = pendingUsers.findIndex((u) => u.id === id);
  pendingUsers.splice(index, 1);
  renderPendingUsers();
}

// Initialiser les utilisateurs en attente
renderPendingUsers();
// Initialiser le tableau
renderUsers();