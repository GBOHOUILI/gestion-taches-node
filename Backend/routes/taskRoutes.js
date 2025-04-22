const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Routes protégées par l'authentification et le rôle (responsable uniquement pour certaines actions)
router.post('/', authMiddleware, roleMiddleware('responsable'), taskController.createTask);
router.get('/', authMiddleware, roleMiddleware('responsable'), taskController.getTasks);
router.get('/:id', authMiddleware, taskController.getTaskById);
router.put('/:id', authMiddleware, roleMiddleware('responsable'), taskController.updateTask);
router.delete('/:id', authMiddleware, roleMiddleware('responsable'), taskController.deleteTask);

module.exports = router;
 