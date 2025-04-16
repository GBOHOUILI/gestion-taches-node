"use strict";

var mongoose = require('mongoose');

var PendingUserSchema = new mongoose.Schema({
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
  role: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model('PendingUser', PendingUserSchema);