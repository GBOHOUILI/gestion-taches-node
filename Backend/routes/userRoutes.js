const express = require('express');
const router = express.Router();

// Contrôleurs d'authentification
const { signUp, signIn, logout } = require('../controllers/authController');

// Middleware d'authentification
const { authMiddleware } = require('../middlewares/authMiddleware');

// Contrôleurs de projet
const { getProjectsForMember } = require('../controllers/projectController');

// Contrôleurs des tâches
const { getTasksForMemberInProject, updateTaskStatusByMember } = require('../controllers/taskController');

// Contrôleurs pour les commentaires de tâche
const { addComment, getComments } = require('../controllers/taskAssignment');

const {renewToken} = require('../controllers/authController');


//router.post('/renew-token', renewToken);
router.post('/register', signUp);
router.post('/login', signIn);
router.post('/logout', logout);

router.get('/mes-projets', authMiddleware, getProjectsForMember);

// Récupérer les tâches d'un membre dans un projet
router.get('/projets/:projectId/mes-taches', authMiddleware, getTasksForMemberInProject);

// Mettre à jour le statut d'une tâche par un membre
router.put('/projets/:projectId/mes-taches/:taskId', authMiddleware, updateTaskStatusByMember);

// ==================== Routes pour les commentaires ====================

// Ajouter un commentaire à une tâche
router.post('/:taskId/comment', authMiddleware, addComment);

// Récupérer les commentaires d'une tâche
router.get('/:taskId/comments', authMiddleware, getComments);



module.exports = router;