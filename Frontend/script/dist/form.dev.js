"use strict";

var API_BASE_URL = 'http://localhost:8080/api';
var main = document.querySelector('main'); // Fonction pour rediriger vers le dashboard en fonction du rôle

function redirectToDashboard(role) {
  if (role === 'admin') {
    window.location.href = 'admin.html';
  } else if (role === 'responsable') {
    window.location.href = 'responsable.html';
  } else if (role === 'membre') {
    window.location.href = 'membre.html';
  }
} // Gestion de la soumission du formulaire de connexion


document.getElementById('loginForm').addEventListener('submit', function _callee(e) {
  var email, password, response, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          email = document.getElementById('email').value;
          password = document.getElementById('password').value;
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch("".concat(API_BASE_URL, "/auth/login"), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          }));

        case 6:
          response = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          data = _context.sent;

          if (response.ok) {
            localStorage.setItem('token', data.token);
            redirectToDashboard(data.role);
          } else {
            alert(data.message || 'Erreur de connexion');
          }

          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](3);
          console.error('Erreur lors de la connexion :', _context.t0);
          alert('Une erreur est survenue. Veuillez réessayer.');

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 13]]);
});