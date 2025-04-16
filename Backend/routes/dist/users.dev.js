"use strict";

var express = require('express');

var router = express.Router();

var PendingUsersModel = require('../models/pendingusermodel'); // Assurez-vous que le chemin est correct


var UsersModel = require('../models/UsersModel'); // Assurez-vous que le chemin est correct

/**
 * Récupérer les utilisateurs en attente
 */


router.post('/pending', function _callee(req, res) {
  var _req$body, nom, prenoms, email, password, role, newPendingUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, nom = _req$body.nom, prenoms = _req$body.prenoms, email = _req$body.email, password = _req$body.password, role = _req$body.role;

          if (!(!nom || !prenoms || !email || !password || !role)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Tous les champs sont requis.'
          }));

        case 3:
          _context.prev = 3;
          newPendingUser = new PendingUsersModel({
            nom: nom,
            prenoms: prenoms,
            email: email,
            password: password,
            role: role
          });
          _context.next = 7;
          return regeneratorRuntime.awrap(newPendingUser.save());

        case 7:
          res.status(201).json({
            message: 'Utilisateur ajouté à la liste d\'attente.'
          });
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](3);
          console.error('Erreur lors de l\'ajout de l\'utilisateur en attente :', _context.t0);
          res.status(500).json({
            message: 'Erreur interne du serveur.'
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 10]]);
});
/**
 * Valider un utilisateur
 */

router.post('/users/validate', function _callee2(req, res) {
  var userId, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userId = req.body.userId; // Vérification des données d'entrée

          if (userId) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'L\'ID utilisateur est requis.'
          }));

        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(PendingUsersModel.findById(userId));

        case 6:
          user = _context2.sent;

          if (user) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'Utilisateur non trouvé.'
          }));

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(UsersModel.create(user));

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(PendingUsersModel.findByIdAndDelete(userId));

        case 13:
          res.status(200).json({
            message: 'Utilisateur validé avec succès.'
          });
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](3);
          console.error('Erreur lors de la validation de l\'utilisateur:', _context2.t0);
          res.status(500).json({
            message: 'Erreur interne du serveur.'
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 16]]);
});
module.exports = router;