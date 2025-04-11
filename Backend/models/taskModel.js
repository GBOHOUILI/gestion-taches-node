const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: String,
  statut: {
    type: String,
    enum: ['en cours', 'terminée', 'bloquée'],
    default: 'en cours'
  },
  priorité: {
    type: String,
    enum: ['haute', 'moyenne', 'basse'],
    default: 'moyenne'
  },
  date_creation: { type: Date, default: Date.now },
  date_echeance: Date,
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projet_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
});

module.exports = mongoose.model('Task', taskSchema);
