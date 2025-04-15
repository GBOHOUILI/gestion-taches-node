const express = require('express');
const router = express.Router();

// Contrôleurs d'authentification
const { signUp, signIn, logout } = require('../controllers/authController');

// Routes d'authentification
router.post('/register', signUp);
router.post('/login', signIn);
router.post('/logout', logout);

// Middleware d'authentification
const authMiddleware = require('../middlewares/authMiddleware');

// Contrôleurs de projet
const { getProjectsForMember } = require('../controllers/projectController');
router.get('/mes-projets', authMiddleware, getProjectsForMember);

// Contrôleurs des tâches
const { getTasksForMemberInProject, updateTaskStatusByMember } = require('../controllers/taskController');
router.get('/projets/:projectId/mes-taches', authMiddleware, getTasksForMemberInProject);
router.put('/projets/:projectId/mes-taches/:taskId', authMiddleware, updateTaskStatusByMember);

// Contrôleurs pour les commentaires de tâche
const { addComment, getComments } = require('../controllers/taskAssignment');
router.post('/:taskId/comment', authMiddleware, addComment);
router.get('/:taskId/comments', authMiddleware, getComments);

module.exports = router;