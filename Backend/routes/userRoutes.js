const express = require('express');
const router = express.Router();
const { signUp, signIn, logout } = require('../controllers/authController');

// Inscription
router.post('/register', signUp);

// Connexion
router.post('/login', signIn);

// Déconnexion
router.post('/logout', logout);

module.exports = router;