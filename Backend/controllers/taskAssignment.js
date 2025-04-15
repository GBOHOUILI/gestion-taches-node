// controllers/taskAssignmentController.js
const TaskAssignment = require('../models/taskAssignment');

const addComment = async (req, res) => {
  const { id } = req.params;
  const { contenu } = req.body;

  try {
    const assignment = await TaskAssignment.findById(id);
    if (!assignment) {
      return res.status(404).json({ message: "Tâche assignée non trouvée" });
    }

    assignment.commentaires.push({
      auteur: req.user.id,
      contenu
    });

    await assignment.save();
    res.status(201).json({ message: 'Commentaire ajouté', assignment });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

const getComments = async (req, res) => {
    const { id } = req.params;
  
    try {
      const assignment = await TaskAssignment.findById(id)
        .populate('commentaires.auteur', 'nom email')
        .populate({
          path: 'tache',
          populate: {
            path: 'projet',
            select: 'responsable_id'
          }
        });
  
      if (!assignment) {
        return res.status(404).json({ message: "Tâche assignée non trouvée" });
      }
  
      const responsableProjet = assignment.tache.projet.responsable_id.toString();
  
      // Seul le responsable du projet peut voir les commentaires
      if (responsableProjet !== req.user.id) {
        return res.status(403).json({ message: "Accès refusé" });
      }
  
      res.status(200).json({ commentaires: assignment.commentaires });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
    }
  };
  
module.exports = { addComment, getComments };
    
