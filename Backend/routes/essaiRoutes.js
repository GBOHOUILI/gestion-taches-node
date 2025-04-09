const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

// Exemple de route protégée, accessible uniquement si connecté
router.get('/profile', auth, (req, res) => {
  // req.user contient { userId, role }
  res.json({ message: 'Accès autorisé', user: req.user });
});

module.exports = router;
