"use strict";

require('dotenv').config(); // Charger les variables d'environnement


var express = require('express');

var nodemailer = require('nodemailer');

var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // Configuration du transporteur Nodemailer

var transporter = nodemailer.createTransport({
  service: 'gmail',
  // Vous pouvez utiliser un autre service comme Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER,
    // Chargé depuis .env
    pass: process.env.EMAIL_PASS // Chargé depuis .env

  }
}); // Route pour envoyer un email

app.post('/send-email', function _callee(req, res) {
  var _req$body, to, subject, message;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, to = _req$body.to, subject = _req$body.subject, message = _req$body.message;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(transporter.sendMail({
            from: process.env.EMAIL_USER,
            // Chargé depuis .env
            to: to,
            subject: subject,
            text: message
          }));

        case 4:
          res.status(200).send({
            message: 'Email envoyé avec succès !'
          });
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          console.error('Erreur lors de l\'envoi de l\'email :', _context.t0);
          res.status(500).send({
            message: 'Erreur lors de l\'envoi de l\'email.'
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
}); // Démarrage du serveur

var PORT = 8080; // Vous pouvez changer le port si nécessaire

app.listen(PORT, function () {
  console.log("Serveur d'email en cours d'ex\xE9cution sur http://localhost:".concat(PORT));
});