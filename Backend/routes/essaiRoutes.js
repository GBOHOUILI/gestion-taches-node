const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

// Exemple de route protégée, accessible uniquement si connecté
router.get('/profile', auth, (req, res) => {
  // req.user contient { userId, role }
  res.json({ message: 'Accès autorisé', user: req.user });
});


// Exemple de contrôleur pour récupérer les utilisateurs en attente
router.get('/pending', async (req, res) => {
  try {
    // Remplacez cette logique par votre propre logique pour récupérer les utilisateurs en attente
    const pendingUsers = [
      { nom: 'Doe', prenoms: 'John', email: 'john.doe@example.com', role: 'Membre' },
      { nom: 'Smith', prenoms: 'Jane', email: 'jane.smith@example.com', role: 'Admin' },
    ];
    res.status(200).json(pendingUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs en attente.' });
  }
});

module.exports = router;
