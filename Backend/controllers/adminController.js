const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Types.ObjectId;
const { sendUserCredentials } = require('./emailcontroller');

// Fonction utilitaire pour vérifier l'existence d'un utilisateur
const findUserById = async (userId) => {
  if (!ObjectId.isValid(userId)) throw new Error('ID utilisateur invalide.');
  const user = await User.findById(userId);
  if (!user) throw new Error("Utilisateur non trouvé.");
  return user;
};

// Fonction pour envoyer une notification
const sendNotification = (message, icon) => {
  const io = req.app.get('io');
  io.emit('newNotification', {
    message,
    icon,
    time: new Date(),
  });
};

// Création d'un utilisateur
const createUser = async (req, res) => {
  console.log('Données reçues pour la création :', req.body);
  const { nom, prenoms, email, password, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ nom, prenoms, email, password: hashedPassword, role, isActive: true });
    await sendUserCredentials({ email, nom }, password || 'defaultPassword123');

    sendNotification(`Nouvel utilisateur créé : ${newUser.nom} ${newUser.prenoms}`, 'check-circle');

    res.status(201).json({ message: "Utilisateur créé avec succès.", user: newUser });
  } catch (err) {
    console.error('Erreur lors de la création de l\'utilisateur :', err);
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur.", error: err.message });
  }
};

// Fonction pour mettre à jour un utilisateur
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { nom, prenoms, email, role, isActive } = req.body;

  try {
    const user = await findUserById(userId);

    user.nom = nom || user.nom;
    user.prenoms = prenoms || user.prenoms;
    user.email = email || user.email;
    user.role = role || user.role;
    user.isActive = isActive !== undefined ? isActive : user.isActive;

    await user.save();

    sendNotification(`Utilisateur modifié : ${user.nom} ${user.prenoms}`, 'edit');

    res.status(200).json({ message: "Utilisateur mis à jour avec succès.", user });
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur :', err);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur.", error: err.message });
  }
};

// Fonction pour supprimer un utilisateur
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await findUserById(userId);

    await user.deleteOne();

    sendNotification(`Utilisateur supprimé : ${user.nom} ${user.prenoms}`, 'trash');

    res.status(200).json({ message: "Utilisateur supprimé avec succès." });
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', err);
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur.", error: err.message });
  }
};

// Fonction pour changer le rôle d'un utilisateur
const changeRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    const user = await findUserById(userId);

    if (!['responsable', 'membre'].includes(role)) {
      return res.status(400).json({ message: "Rôle invalide." });
    }

    user.role = role;
    await user.save();

    sendNotification(`Rôle modifié pour : ${user.nom} ${user.prenoms} (${role})`, 'user-tag');

    res.status(200).json({ message: `Rôle de l'utilisateur modifié en ${role} avec succès.`, user });
  } catch (err) {
    console.error('Erreur lors du changement de rôle :', err);
    res.status(500).json({ message: "Erreur lors du changement de rôle.", error: err.message });
  }
};

// Fonction pour activer un utilisateur
const activateUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await findUserById(userId);

    if (user.isActive) {
      return res.status(400).json({ message: "L'utilisateur est déjà actif." });
    }

    user.isActive = true;
    await user.save();

    sendNotification(`Utilisateur activé : ${user.nom} ${user.prenoms}`, 'check-circle');

    res.status(200).json({ message: "Utilisateur activé avec succès." });
  } catch (err) {
    console.error('Erreur lors de l\'activation de l\'utilisateur :', err);
    res.status(500).json({ message: "Erreur lors de l'activation de l'utilisateur.", error: err.message });
  }
};

// Fonction pour récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ users });
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs :', err);
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs.", error: err.message });
  }
};

// Fonction pour récupérer un utilisateur par ID
const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await findUserById(userId).select('-password');
    res.status(200).json(user);
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', err);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Exportation des fonctions
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  changeRole,
  activateUser,
  getAllUsers,
  getUserById,
};
