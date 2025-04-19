"use strict";

// const jwt = require('jsonwebtoken');
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ message: 'Token manquant.' });
//   }
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(401).json({ message: 'Token invalide ou expiré.' });
//     }
//     req.user = user; // Ajouter les informations utilisateur à la requête
//     next();
//   });
// }
// module.exports = authenticateToken;
var jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  var authHeader = req.headers['authorization'];
  var token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Token manquant.'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        message: 'Token invalide ou expiré.'
      });
    }

    req.user = user; // Ajouter les informations utilisateur à la requête

    next();
  });
}

module.exports = authenticateToken;