const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Routes protégées par l'authentification et le rôle (responsable uniquement pour certaines actions)
router.post('/', authMiddleware, roleMiddleware('responsable'), projectController.createProject);
router.get('/', authMiddleware, projectController.getProjects);
router.get('/:id', authMiddleware, projectController.getProjectById);
router.put('/:id', authMiddleware, roleMiddleware('responsable'), projectController.updateProject);
router.delete('/:id', authMiddleware, roleMiddleware('responsable'), projectController.deleteProject);

module.exports = router;
