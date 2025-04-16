"use strict";

var express = require('express');

var router = express.Router();

var auth = require('../middlewares/authMiddleware'); // Exemple de route protégée, accessible uniquement si connecté


router.get('/profile', auth, function (req, res) {
  // req.user contient { userId, role }
  res.json({
    message: 'Accès autorisé',
    user: req.user
  });
}); // Exemple de contrôleur pour récupérer les utilisateurs en attente

router.get('/pending', function _callee(req, res) {
  var pendingUsers;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            // Remplacez cette logique par votre propre logique pour récupérer les utilisateurs en attente
            pendingUsers = [{
              nom: 'Doe',
              prenoms: 'John',
              email: 'john.doe@example.com',
              role: 'Membre'
            }, {
              nom: 'Smith',
              prenoms: 'Jane',
              email: 'jane.smith@example.com',
              role: 'Admin'
            }];
            res.status(200).json(pendingUsers);
          } catch (error) {
            console.error(error);
            res.status(500).json({
              message: 'Erreur lors de la récupération des utilisateurs en attente.'
            });
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;