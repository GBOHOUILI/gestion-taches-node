const mongoose = require('mongoose');

const membreEquipeSchema = new mongoose.Schema({
  equipe_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipe', required: true },
  utilisateur_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('MembreEquipe', membreEquipeSchema);
