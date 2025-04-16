const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenoms: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Vérifie si le modèle existe déjà avant de le définir
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);