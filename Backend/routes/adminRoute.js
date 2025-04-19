const express = require('express');
const router = express.Router();
const {
  createUser,
  updateUser,
  deleteUser,
  changeRole,
  activateUser,
  getAllUsers
} = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { searchUsers } = require('../controllers/searchUser');


// Middleware pour vérifier l'authentification et le rôle d'administrateur
const adminAuth = [authMiddleware, roleMiddleware('admin')];

// Route pour créer un utilisateur
router.post('/create', authMiddleware, roleMiddleware('admin'), createUser);

// Route pour modifier un utilisateur (changer les informations ou le rôle)
router.put('/update/:userId', authMiddleware, roleMiddleware('admin'), updateUser);

// Route pour supprimer un utilisateur
router.delete('/delete/:userId', authMiddleware, roleMiddleware('admin'), deleteUser);

// Route pour changer le rôle d'un utilisateur
router.put('/role/:userId', authMiddleware, roleMiddleware('admin'), changeRole);

// Route pour activer un utilisateur
router.patch('/activate/:userId',authMiddleware, roleMiddleware('admin'), activateUser);

// Route pour récupérer tous les utilisateurs
router.get('/users', authMiddleware, roleMiddleware('admin'), getAllUsers);

// Route pour rechercher un utilisateur
router.get('/users/search', authMiddleware, roleMiddleware('admin'), searchUsers);

module.exports = router;