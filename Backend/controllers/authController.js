const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendAdminNotification, sendUserNotification } = require('./emailcontroller');


const renewToken = (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true }); // Ignore l'expiration pour vérifier le contenu
    const newToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Durée de validité du nouveau jeton
    );

    res.status(200).json({ token: newToken });
  } catch (err) {
    res.status(401).json({ message: 'Impossible de renouveler le jeton.' });
  }
};




// Fonction pour créer un token et le définir dans un cookie
console.log('JWT_SECRET:', process.env.JWT_SECRET);
const createTokenAndSetCookie = (user) => {
  const token = jwt.sign(
    { id: user._id, role: user.role }, // Payload
    process.env.JWT_SECRET, // Clé secrète
    { expiresIn: '1h' } // Durée de validité
  );

  return token;
};

// Inscription d'un utilisateur
const signUp = async (req, res) => {
  const { nom, prenoms, email, password, role } = req.body;

  try {
    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Créez un nouvel utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      nom,
      prenoms,
      email,
      password: hashedPassword,
      role,
      isActive: false, // Par défaut, l'utilisateur n'est pas actif
    });

    // Envoi des notifications
    await sendAdminNotification({
      email: newUser.email,
      nom: newUser.nom,
      prenoms: newUser.prenoms,
      role: newUser.role,
    });

    await sendUserNotification({
      email: newUser.email,
      nom: newUser.nom,
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};



// Connexion d'un utilisateur
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email ou mot de passe incorrects.' });
    }

    // Vérifier si le mot de passe est correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    }

  //Vérifier si le compte est actif
     if (!user.isActive) {
       return res.status(403).json({ message: 'Votre compte est en attente de validation par un administrateur.' });
     }

    // Créer un token et le définir dans un cookie
    const token = createTokenAndSetCookie(res, { userId: user._id, role: user.role });

    res.status(200).json({
      message: 'Connexion réussie.',
      user: { id: user._id, nom: user.nom, prenoms: user.prenoms, email: user.email, role: user.role, token: token ,isActive: user.isActive },
    });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
  }
};

// Déconnexion d'un utilisateur
const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  res.status(200).json({ message: 'Déconnexion réussie.' });
};



module.exports = { signUp, signIn, logout, renewToken, createTokenAndSetCookie };