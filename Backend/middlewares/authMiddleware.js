const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authMiddleware  = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Non authentifié. Aucun jeton fourni.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Jeton manquant.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Ajoute les informations de l'utilisateur au `req`
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }
};

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, // Payload
    process.env.JWT_SECRET, // Clé secrète
    { expiresIn: '1h' } // Durée de validité
  );
};

module.exports = { authMiddleware, generateToken };
