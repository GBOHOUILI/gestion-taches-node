// filepath: c:\projetDCLIC\gestion-taches-node\Backend\controllers\userController.js

const User = require('../models/UsersModel'); // Assurez-vous que le modèle User est correctement défini

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Récupère tous les utilisateurs
    if (users.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ message: 'Erreur interne du serveur lors de la récupération des utilisateurs.' });
  }
};

// Récupérer les utilisateurs en attente
exports.getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ status: 'pending' }); // Filtre les utilisateurs en attente
    if (pendingUsers.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur en attente.' });
    }
    res.status(200).json(pendingUsers);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs en attente:', error);
    res.status(500).json({ message: 'Erreur interne du serveur lors de la récupération des utilisateurs en attente.' });
  }
};
