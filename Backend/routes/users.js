const express = require('express');
const router = express.Router();
const PendingUsersModel = require('../models/pendingusermodel'); // Assurez-vous que le chemin est correct
const UsersModel = require('../models/UsersModel'); // Assurez-vous que le chemin est correct

/**
 * Récupérer les utilisateurs en attente
 */
router.post('/pending', async (req, res) => {
  const { nom, prenoms, email, password, role } = req.body;

  if (!nom || !prenoms || !email || !password || !role) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  try {
    const newPendingUser = new PendingUsersModel({ nom, prenoms, email, password, role });
    await newPendingUser.save();
    res.status(201).json({ message: 'Utilisateur ajouté à la liste d\'attente.' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur en attente :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

/**
 * Valider un utilisateur
 */
router.post('/users/validate', async (req, res) => {
  const { userId } = req.body;

  // Vérification des données d'entrée
  if (!userId) {
    return res.status(400).json({ message: 'L\'ID utilisateur est requis.' });
  }

  try {
    // Recherche de l'utilisateur en attente
    const user = await PendingUsersModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Déplacer l'utilisateur validé dans la base de données principale
    await UsersModel.create(user);

    // Supprimer l'utilisateur de la liste d'attente
    await PendingUsersModel.findByIdAndDelete(userId);

    res.status(200).json({ message: 'Utilisateur validé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la validation de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

module.exports = router;