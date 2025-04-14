const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Types.ObjectId;

// 1. Création d'un utilisateur
const createUser = async (req, res) => {
  const { nom, prenoms, email, password, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email déjà utilisé." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      nom,
      prenoms,
      email,
      password: hashedPassword,
      role,
      isActive: true,
    });

    res.status(201).json({ message: "Utilisateur créé, et validé par un administrateur." });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur.", error: err.message });
  }
};

// 2. Modification d'un utilisateur
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { nom, prenoms, email, role, isActive } = req.body;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "ID invalide." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    user.nom = nom || user.nom;
    user.prenoms = prenoms || user.prenoms;
    user.email = email || user.email;
    user.role = role || user.role;
    user.isActive = isActive !== undefined ? isActive : user.isActive;

    await user.save();

    res.status(200).json({ message: "Utilisateur mis à jour avec succès.", user });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur.", error: err.message });
  }
};

// 3. Suppression d'un utilisateur
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "ID invalide." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    await user.deleteOne(); 
    res.status(200).json({ message: "Utilisateur supprimé avec succès." });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur.", error: err.message });
  }
};

// 4. Changer le rôle d'un utilisateur
const changeRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "ID invalide." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    if (!['responsable', 'membre'].includes(role)) {
      return res.status(400).json({ message: "Rôle invalide." });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: `Rôle de l'utilisateur modifié en ${role} avec succès.`, user });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du changement de rôle de l'utilisateur.", error: err.message });
  }
};

// 5. Activer un utilisateur
const activateUser = async (req, res) => {
  const { userId } = req.params;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "ID invalide." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    if (user.isActive) {
      return res.status(400).json({ message: "L'utilisateur est déjà actif." });
    }

    user.isActive = true;
    await user.save();

    res.status(200).json({ message: "Utilisateur activé avec succès." });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'activation de l'utilisateur.", error: err.message });
  }
};

// 6. Récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclure le mot de passe
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs.", error: err.message });
  }
};

module.exports = {createUser, updateUser, deleteUser, changeRole, activateUser, getAllUsers};
