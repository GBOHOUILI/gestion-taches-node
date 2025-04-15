const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const createTokenAndSetCookie = (res, payload) => {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1d' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  });
  return token;
};


const signUp = async (req, res) => {
  const { nom, prenoms, email, password, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email déjà utilisé." });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    nom,
    prenoms,
    email,
    password: hashedPassword,
    role 
  });

  res.status(201).json({ message: "Compte créé, en attente de validation par un administrateur." });
};


const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: 'Email ou mot de passe incorrects.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Email ou mot de passe incorrect.' });
  }
  
  if (!user.isActive) {
    return res.status(403).json({ error: 'Votre compte est en attente de validation par un administrateur.' });
  }

  const token = createTokenAndSetCookie(res, { userId: user._id, role: user.role });

  res.status(200).json({
    message: 'Connexion réussie.',
    user: { id: user._id, nom: user.nom, prenoms: user.prenoms, email: user.email, role: user.role, token: token }
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
