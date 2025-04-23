const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
// const authMiddleware  = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//         return res.status(401).json({ message: 'Non authentifié. Aucun jeton fourni.' });
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: 'Accès non autorisé. Jeton manquant.' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Ajoute les informations de l'utilisateur au `req`
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Token invalide ou expiré.' });
//     }
// };

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.error('Non authentifié : aucun jeton fourni.');
    return res.status(401).json({ message: 'Non authentifié. Aucun jeton fourni.' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Jeton reçu :', token);

  if (!token) {
    console.error('Non authentifié : jeton manquant.');
    return res.status(401).json({ message: 'Accès non autorisé. Jeton manquant.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Données décodées :', decoded); // Vérifie si `decoded.role` existe
    req.user = decoded; // Ajoute les informations de l'utilisateur au `req`
    console.log('Utilisateur authentifié :', req.user);
    next();
  } catch (error) {
    console.error('Token invalide ou expiré :', error.message);
    return res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
};


// const generateToken = (user) => {
//  ;
//   return jwt.sign(
//     {
//       id: user._id,
//       role: user.role
//     }, // Payload
//     console.log('le role est:', user.role),

//     process.env.JWT_SECRET, // Clé secrète
//     { expiresIn: '1h' } // Durée de validité
//   );
// };



const generateToken = async (user) => {
  return await jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

module.exports = { authMiddleware, generateToken };
