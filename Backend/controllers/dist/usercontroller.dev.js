"use strict";

// filepath: c:\projetDCLIC\gestion-taches-node\Backend\controllers\userController.js
var User = require('../models/UsersModel'); // Assurez-vous que le modèle User est correctement défini
// Récupérer tous les utilisateurs


exports.getAllUsers = function _callee(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.find());

        case 3:
          users = _context.sent;

          if (!(users.length === 0)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: 'Aucun utilisateur trouvé.'
          }));

        case 6:
          res.status(200).json(users);
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error('Erreur lors de la récupération des utilisateurs:', _context.t0);
          res.status(500).json({
            message: 'Erreur interne du serveur lors de la récupération des utilisateurs.'
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // Récupérer les utilisateurs en attente


exports.getPendingUsers = function _callee2(req, res) {
  var pendingUsers;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.find({
            status: 'pending'
          }));

        case 3:
          pendingUsers = _context2.sent;

          if (!(pendingUsers.length === 0)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'Aucun utilisateur en attente.'
          }));

        case 6:
          res.status(200).json(pendingUsers);
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error('Erreur lors de la récupération des utilisateurs en attente:', _context2.t0);
          res.status(500).json({
            message: 'Erreur interne du serveur lors de la récupération des utilisateurs en attente.'
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
};