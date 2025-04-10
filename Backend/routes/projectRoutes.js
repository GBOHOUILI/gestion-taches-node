const express = require('express');
const router = express.Router();

const { createProject, getProjects, updateProject, deleteProject } = require('../controllers/projectController');
const auth = require('../middlewares/authMiddleware');
const verifyRole = require('../middlewares/roleMiddleware');

// Route pour créer un projet (accessible uniquement aux responsable)

router.post('/', auth, verifyRole('responsable'), createProject);

//liste des projets

router.get('/', auth, verifyRole('responsable'), getProjects);

//Modifier un projet
router.put('/:id', auth, verifyRole('responsable'), updateProject);

//supprimer un projet

router.delete('/:id', auth, verifyRole('responsable'), deleteProject);

module.exports = router;