const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date_debut: {
      type: Date,
      required: false,
    },
    date_fin: {
      type: Date,
      required: false,
    },
    responsable_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Référence au modèle User
      required: true,
    },
    membres: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
