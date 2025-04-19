"use strict";

var bcrypt = require('bcryptjs');

(function _callee() {
  var password, hashedPassword;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          password = 'eldo-moreo'; // Mot de passe en clair

          _context.next = 3;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 3:
          hashedPassword = _context.sent;
          // Hachage du mot de passe
          console.log('Mot de passe haché :', hashedPassword);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
})();