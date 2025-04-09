// middleware/roleMiddleware.js

const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: 'Vous devez être connecté pour accéder à cette ressource.' });
      }
  
      const userRole = req.user.role; // Le rôle de l'utilisateur connecté
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Accès interdit : vous n\'avez pas les permissions nécessaires.' });
      }
  
      // Si le rôle est valide, passer à la suite
      next();
    };
  };
  
  module.exports = verifyRole;
  