"use strict";

document.getElementById('loginForm').addEventListener('submit', function _callee(e) {
  var button, inputs, email, password, response, data, userRole;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          button = this.querySelector('button');
          inputs = Array.from(this.querySelectorAll('input')); // Désactiver les champs et afficher une animation

          inputs.forEach(function (input) {
            input.disabled = true;
            input.classList.add('opacity-70');
          });
          button.innerHTML = '<span class="inline-block animate-spin mr-2">↻</span> Connexion...';
          button.classList.add('bg-blue-800'); // Récupérer les données du formulaire

          email = this.querySelector('input[name="email"]').value;
          password = this.querySelector('input[name="password"]').value;
          _context.prev = 8;
          _context.next = 11;
          return regeneratorRuntime.awrap(fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          }));

        case 11:
          response = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(response.json());

        case 14:
          data = _context.sent;

          if (response.ok) {
            _context.next = 17;
            break;
          }

          throw new Error(data.error || 'Une erreur est survenue.');

        case 17:
          // Redirection en fonction du rôle
          userRole = data.user.role;

          if (userRole === 'admin') {
            window.location.href = 'admin.html';
          } else if (userRole === 'membre') {
            window.location.href = 'member.html';
          } else if (userRole === 'responsable') {
            window.location.href = 'manager.html';
          } else {
            alert('Rôle inconnu. Veuillez contacter l\'administrateur.');
          }

          _context.next = 24;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](8);
          alert(_context.t0.message);

        case 24:
          _context.prev = 24;
          // Réinitialiser les champs et le bouton
          button.innerHTML = 'Se connecter';
          button.classList.remove('bg-blue-800');
          inputs.forEach(function (input) {
            input.disabled = false;
            input.classList.remove('opacity-70');
          });
          return _context.finish(24);

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, null, this, [[8, 21, 24, 29]]);
});