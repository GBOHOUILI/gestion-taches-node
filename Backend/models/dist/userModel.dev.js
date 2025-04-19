"use strict";

var mongoose = require('mongoose');

var bcrypt = require('bcryptjs'); // Définition du schéma utilisateur


var userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true
  },
  prenoms: {
    type: String,
    required: [true, 'Les prénoms sont requis'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function validator(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validation de l'email
      },
      message: function message(props) {
        return "".concat(props.value, " n'est pas un email valide !");
      }
    }
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères']
  },
  role: {
    type: String,
    "enum": ['admin', 'responsable', 'membre'],
    "default": 'membre'
  },
  isActive: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true // Ajoute createdAt et updatedAt automatiquement

}); // Middleware pour hacher le mot de passe avant de sauvegarder

userSchema.pre('save', function _callee(next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (this.isModified('password')) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", next());

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, 10));

        case 4:
          this.password = _context.sent;
          // Hachage du mot de passe
          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
}); // Méthode pour comparer les mots de passe

userSchema.methods.comparePassword = function _callee2(password) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(bcrypt.compare(password, this.password));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
}; // Exportation du modèle


module.exports = mongoose.model('User', userSchema);