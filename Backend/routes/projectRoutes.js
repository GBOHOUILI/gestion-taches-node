const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { addComment, getComments } = require('../controllers/taskAssignment');
const { getAllUsers } = require('../controllers/adminController');

// Vérification des imports
console.log('projectController:', projectController);
console.log('authMiddleware:', typeof authMiddleware);
console.log('roleMiddleware:', typeof roleMiddleware('responsable'));
console.log('addComment:', typeof addComment);

// Routes protégées par l'authentification et le rôle
router.post('/', authMiddleware, roleMiddleware('responsable'), projectController.createProject);
router.get('/users', authMiddleware, roleMiddleware('responsable'), getAllUsers);
router.get('/', authMiddleware, roleMiddleware('responsable'), projectController.getProjects);
router.get('/:id', authMiddleware, roleMiddleware('responsable'), projectController.getProjectById);
router.put('/:id', authMiddleware, roleMiddleware('responsable'), projectController.updateProject);
router.delete('/:id', authMiddleware, roleMiddleware('responsable'), projectController.deleteProject);


// Routes pour les commentaires
router.post('/:id/comment', authMiddleware, addComment);
router.get('/:id/comment', authMiddleware, getComments);

module.exports = router;