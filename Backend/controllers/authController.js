const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createTokenAndSetCookie = (res, payload) => {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1d' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 
  });
};


const signUp = async (req, res) => {
  const { nom, prenoms, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ error: 'Email déjà utilisé.' });
  }

  const user = new User({ nom, prenoms, email, password});
  await user.save();

  res.status(201).json({
    message: 'Inscription réussie.',
    user: { id: user._id, nom: user.nom, prenoms: user.prenoms, email: user.email, role: user.role }
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: 'Email ou mot de passe incorrect.' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Email ou mot de passe incorrect.' });
  }

  createTokenAndSetCookie(res, { userId: user._id, role: user.role });

  res.status(200).json({
    message: 'Connexion réussie.',
    user: { id: user._id, nom: user.nom, prenoms: user.prenoms, email: user.email, role: user.role }
  });
};

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  res.status(200).json({ message: 'Déconnexion réussie.' });
};

module.exports = { signUp, signIn, logout };
