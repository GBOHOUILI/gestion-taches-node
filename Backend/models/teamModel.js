const mongoose = require('mongoose');

const equipeSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  projet_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
});

module.exports = mongoose.model('Equipe', equipeSchema);
