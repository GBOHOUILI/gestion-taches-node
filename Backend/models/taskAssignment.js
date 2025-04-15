// Permetre à plusieurs membres d'etre sur un projet et de mettre à jour le statut indépendament des autres membres de la tache
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contenu: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const taskAssignmentSchema = new mongoose.Schema({
  tache: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  membre: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  statut: { type: String, enum: ['En attente', 'En cours', 'Terminée'], default: 'En attente' },
  commentaires: [commentSchema]
}, { timestamps: true });

module.exports = mongoose.model('TaskAssignment', taskAssignmentSchema);