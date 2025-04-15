const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenoms: {
    type: String,
    required: true
  },
  email: { 
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'responsable', 'membre'],
    default: 'membre'
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema);
