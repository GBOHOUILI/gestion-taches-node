const express = require('express');
const router = express.Router();
const { 
    createUser, 
    updateUser, 
    deleteUser, 
    changeRole, 
    activateUser, 
    getAllUsers, 
    getUserById 
} = require('../controllers/adminController');  

const { searchUsers } = require('../controllers/searchUser');
const { 
    getNotifications, 
    createNotification, 
    deleteNotification 
} = require('../controllers/notificationController');
const { authMiddleware ,generateToken} = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Vérification des imports
console.log({
    createUser,
    updateUser,
    deleteUser,
    changeRole,
    activateUser,
    getAllUsers,
    getUserById,
    searchUsers,
    getNotifications,
    createNotification,
    deleteNotification
});

console.log('authMiddleware:', typeof authMiddleware);
console.log('roleMiddleware:', typeof roleMiddleware('admin'));

// Middleware pour vérifier l'authentification et le rôle d'administrateur
const adminAuth = [authMiddleware, roleMiddleware('admin')];

// Vérification des middlewares et gestionnaires
if (typeof authMiddleware !== 'function') {
    throw new Error('authMiddleware doit être une fonction');
}
if (typeof roleMiddleware('admin') !== 'function') {
    throw new Error('roleMiddleware doit retourner une fonction');
}
if (typeof getNotifications !== 'function') {
    throw new Error('getNotifications doit être une fonction');
}

// Routes pour la gestion des utilisateurs
router.post('/create', adminAuth, createUser);
router.put('/update/:userId', adminAuth, updateUser);
router.delete('/delete/:userId', adminAuth, deleteUser);
router.put('/role/:userId', adminAuth, changeRole);
router.patch('/activate/:userId', adminAuth, activateUser);
router.get('/users', authMiddleware,roleMiddleware('admin'), getAllUsers);
router.get('/users/search', adminAuth, searchUsers);
router.get('/users/:userId', adminAuth, getUserById);

// Routes pour la gestion des notifications
router.get('/notification', adminAuth, getNotifications);
router.post('/notification', adminAuth, createNotification); 
router.delete('/notification/:notificationId', adminAuth, deleteNotification);

module.exports = router;