"use strict";

var express = require('express');

var router = express.Router(); // Contrôleurs d'authentification

var _require = require('../controllers/authController'),
    signUp = _require.signUp,
    signIn = _require.signIn,
    logout = _require.logout; // Routes d'authentification


router.post('/register', signUp); // router.post('/login', signIn);

router.post('/login', function (req, res, next) {
  console.log('Route /login appelée');
  next();
}, signIn);
router.post('/logout', logout); // Middleware d'authentification

var authMiddleware = require('../middlewares/authMiddleware'); // Contrôleurs de projet


var _require2 = require('../controllers/projectController'),
    getProjectsForMember = _require2.getProjectsForMember;

router.get('/mes-projets', authMiddleware, getProjectsForMember); // Contrôleurs des tâches

var _require3 = require('../controllers/taskController'),
    getTasksForMemberInProject = _require3.getTasksForMemberInProject,
    updateTaskStatusByMember = _require3.updateTaskStatusByMember;

router.get('/projets/:projectId/mes-taches', authMiddleware, getTasksForMemberInProject);
router.put('/projets/:projectId/mes-taches/:taskId', authMiddleware, updateTaskStatusByMember); // Contrôleurs pour les commentaires de tâche

var _require4 = require('../controllers/taskAssignment'),
    addComment = _require4.addComment,
    getComments = _require4.getComments;

router.post('/:taskId/comment', authMiddleware, addComment);
router.get('/:taskId/comments', authMiddleware, getComments);
module.exports = router;