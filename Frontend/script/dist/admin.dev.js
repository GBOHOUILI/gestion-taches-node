"use strict";

// Sélection des éléments DOM
var userTableBody = document.getElementById('userTableBody');
var userModal = document.getElementById('userModal');
var modalTitle = document.getElementById('modalTitle');
var userForm = document.getElementById('userForm');
var cancelBtn = document.getElementById('cancelBtn');
var createUserBtn = document.getElementById('createUserBtn');
var pendingUsersTableBody = document.getElementById('pendingUsersTableBody');
var editingUserId = null; // URL de base de l'API

var API_BASE_URL = 'http://localhost:8080/api';
/**
 * Récupère et affiche les utilisateurs en attente depuis l'API.
 */

function fetchPendingUsers() {
  var response, pendingUsers;
  return regeneratorRuntime.async(function fetchPendingUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('http://localhost:8080/api/users/pending'));

        case 3:
          response = _context.sent;

          if (response.ok) {
            _context.next = 6;
            break;
          }

          throw new Error('Erreur lors de la récupération des utilisateurs en attente.');

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          pendingUsers = _context.sent;
          pendingUsersTableBody.innerHTML = pendingUsers.map(function (user) {
            return "\n      <tr>\n        <td>".concat(user.nom, "</td>\n        <td>").concat(user.prenoms, "</td>\n        <td>").concat(user.email, "</td>\n        <td>").concat(user.role, "</td>\n        <td>\n          <button class=\"text-green-500 hover:text-green-600\" onclick=\"handleUserValidation('").concat(user._id, "')\">\n            Valider\n          </button>\n          <button class=\"text-red-500 hover:text-red-600\" onclick=\"handleUserDeletion('").concat(user._id, "', true)\">\n            Supprimer\n          </button>\n        </td>\n      </tr>\n    ");
          }).join('');
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0.message);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}
/**
 * Valide un utilisateur en attente via l'API.
 * @param {string} userId - ID de l'utilisateur à valider.
 */


function handleUserValidation(userId) {
  var response, errorData;
  return regeneratorRuntime.async(function handleUserValidation$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch("".concat(API_BASE_URL, "/users/validate"), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId: userId
            })
          }));

        case 3:
          response = _context2.sent;

          if (response.ok) {
            _context2.next = 9;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          errorData = _context2.sent;
          throw new Error(errorData.message || 'Erreur lors de la validation de l\'utilisateur.');

        case 9:
          alert('Utilisateur validé avec succès.');
          fetchPendingUsers(); // Rafraîchir la liste des utilisateurs en attente

          _context2.next = 17;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0.message);
          alert(_context2.t0.message);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
}
/**
 * Supprime un utilisateur (en attente ou non) via l'API.
 * @param {string} userId - ID de l'utilisateur à supprimer.
 * @param {boolean} isPending - Indique si l'utilisateur est en attente.
 */


function handleUserDeletion(userId) {
  var isPending,
      endpoint,
      response,
      errorData,
      _args3 = arguments;
  return regeneratorRuntime.async(function handleUserDeletion$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          isPending = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
          _context3.prev = 1;
          endpoint = isPending ? 'users/pending/delete' : 'users/delete';
          _context3.next = 5;
          return regeneratorRuntime.awrap(fetch("".concat(API_BASE_URL, "/").concat(endpoint), {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId: userId
            })
          }));

        case 5:
          response = _context3.sent;

          if (response.ok) {
            _context3.next = 11;
            break;
          }

          _context3.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          errorData = _context3.sent;
          throw new Error(errorData.message || 'Erreur lors de la suppression de l\'utilisateur.');

        case 11:
          alert('Utilisateur supprimé avec succès.');

          if (isPending) {
            fetchPendingUsers(); // Rafraîchir la liste des utilisateurs en attente
          } else {
            fetchUsers(); // Rafraîchir la liste des utilisateurs
          }

          _context3.next = 19;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0.message);
          alert(_context3.t0.message);

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 15]]);
}
/**
 * Récupère et affiche les utilisateurs depuis l'API.
 */


function fetchUsers() {
  var response, users;
  return regeneratorRuntime.async(function fetchUsers$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(fetch("".concat(API_BASE_URL, "/users")));

        case 3:
          response = _context4.sent;

          if (response.ok) {
            _context4.next = 6;
            break;
          }

          throw new Error('Erreur lors de la récupération des utilisateurs.');

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          users = _context4.sent;
          userTableBody.innerHTML = users.map(function (user) {
            return "\n      <tr>\n        <td>".concat(user.name, "</td>\n        <td>").concat(user.email, "</td>\n        <td>").concat(user.role, "</td>\n        <td>\n          <button class=\"text-yellow-500 hover:text-yellow-600\" onclick=\"editUser('").concat(user._id, "')\">\n            Modifier\n          </button>\n          <button class=\"text-red-500 hover:text-red-600\" onclick=\"handleUserDeletion('").concat(user._id, "')\">\n            Supprimer\n          </button>\n        </td>\n      </tr>\n    ");
          }).join('');
          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0.message);

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 12]]);
}
/**
 * Ouvre la modale pour créer un utilisateur.
 */


createUserBtn.addEventListener('click', function () {
  editingUserId = null;
  modalTitle.textContent = 'Créer un utilisateur';
  userForm.reset();
  userModal.classList.remove('hidden');
});
/**
 * Ferme la modale.
 */

cancelBtn.addEventListener('click', function () {
  userModal.classList.add('hidden');
});
/**
 * Enregistre un utilisateur (création ou modification) via l'API.
 */

userForm.addEventListener('submit', function _callee(e) {
  var name, email, role, endpoint, method, response, errorData;
  return regeneratorRuntime.async(function _callee$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          e.preventDefault();
          name = document.getElementById('name').value;
          email = document.getElementById('email').value;
          role = document.getElementById('role').value;
          _context5.prev = 4;
          endpoint = editingUserId ? "users/update/".concat(editingUserId) : 'users/create';
          method = editingUserId ? 'PUT' : 'POST';
          _context5.next = 9;
          return regeneratorRuntime.awrap(fetch("".concat(API_BASE_URL, "/").concat(endpoint), {
            method: method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              email: email,
              role: role
            })
          }));

        case 9:
          response = _context5.sent;

          if (response.ok) {
            _context5.next = 15;
            break;
          }

          _context5.next = 13;
          return regeneratorRuntime.awrap(response.json());

        case 13:
          errorData = _context5.sent;
          throw new Error(errorData.message || 'Erreur lors de l\'enregistrement de l\'utilisateur.');

        case 15:
          alert(editingUserId ? 'Utilisateur modifié avec succès.' : 'Utilisateur créé avec succès.');
          userModal.classList.add('hidden');
          fetchUsers(); // Rafraîchir la liste des utilisateurs

          _context5.next = 24;
          break;

        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](4);
          console.error(_context5.t0.message);
          alert(_context5.t0.message);

        case 24:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[4, 20]]);
});
/**
 * Ouvre la modale pour modifier un utilisateur.
 * @param {string} userId - ID de l'utilisateur à modifier.
 */

function editUser(userId) {
  var response, user;
  return regeneratorRuntime.async(function editUser$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(fetch("".concat(API_BASE_URL, "/users/").concat(userId)));

        case 3:
          response = _context6.sent;

          if (response.ok) {
            _context6.next = 6;
            break;
          }

          throw new Error('Erreur lors de la récupération des informations de l\'utilisateur.');

        case 6:
          _context6.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          user = _context6.sent;
          editingUserId = userId;
          modalTitle.textContent = 'Modifier un utilisateur';
          document.getElementById('name').value = user.name;
          document.getElementById('email').value = user.email;
          document.getElementById('role').value = user.role;
          userModal.classList.remove('hidden');
          _context6.next = 21;
          break;

        case 17:
          _context6.prev = 17;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0.message);
          alert(_context6.t0.message);

        case 21:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 17]]);
} // Charger les utilisateurs et les utilisateurs en attente au démarrage


document.addEventListener('DOMContentLoaded', function () {
  fetchUsers();
  fetchPendingUsers();
});