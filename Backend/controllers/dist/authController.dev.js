"use strict";

var User = require('../models/userModel');

var jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

var createTokenAndSetCookie = function createTokenAndSetCookie(res, payload) {
  var token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: '1d'
  });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  });
  return token;
};

var signUp = function signUp(req, res) {
  var _req$body, nom, prenoms, email, password, role, existing, hashedPassword, newUser;

  return regeneratorRuntime.async(function signUp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, nom = _req$body.nom, prenoms = _req$body.prenoms, email = _req$body.email, password = _req$body.password, role = _req$body.role;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 3:
          existing = _context.sent;

          if (!existing) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "Email déjà utilisé."
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 8:
          hashedPassword = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(User.create({
            nom: nom,
            prenoms: prenoms,
            email: email,
            password: hashedPassword,
            role: role
          }));

        case 11:
          newUser = _context.sent;
          res.status(201).json({
            message: "Compte créé, en attente de validation par un administrateur."
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
};

var signIn = function signIn(req, res) {
  var _req$body2, email, password, user, isMatch, token;

  return regeneratorRuntime.async(function signIn$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('Requête reçue :', req.body);
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password)) {
            _context2.next = 5;
            break;
          }

          console.log('Validation échouée : email ou mot de passe manquant.');
          return _context2.abrupt("return", res.status(400).json({
            error: 'Veuillez fournir un email et un mot de passe.'
          }));

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          user = _context2.sent;
          console.log('Utilisateur trouvé :', user);

          if (user) {
            _context2.next = 12;
            break;
          }

          console.log('Utilisateur non trouvé.');
          return _context2.abrupt("return", res.status(400).json({
            error: 'Email ou mot de passe incorrects.'
          }));

        case 12:
          if (user) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            error: 'Email ou mot de passe incorrects.'
          }));

        case 14:
          _context2.next = 16;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 16:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 20;
            break;
          }

          console.log('Mot de passe incorrect.');
          return _context2.abrupt("return", res.status(400).json({
            error: 'Email ou mot de passe incorrect.'
          }));

        case 20:
          if (user.isActive) {
            _context2.next = 23;
            break;
          }

          console.log('Compte inactif.');
          return _context2.abrupt("return", res.status(403).json({
            error: 'Votre compte est en attente de validation par un administrateur.'
          }));

        case 23:
          token = createTokenAndSetCookie(res, {
            userId: user._id,
            role: user.role
          });
          console.log('connexion reussie');
          res.status(200).json({
            message: 'Connexion réussie.',
            user: {
              id: user._id,
              nom: user.nom,
              prenoms: user.prenoms,
              email: user.email,
              role: user.role,
              token: token
            }
          });

        case 26:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var logout = function logout(req, res) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  res.status(200).json({
    message: 'Déconnexion réussie.'
  });
};

module.exports = {
  signUp: signUp,
  signIn: signIn,
  logout: logout
};