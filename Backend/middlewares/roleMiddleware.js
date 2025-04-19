const roleMiddleware = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      console.error('Accès refusé : utilisateur non authentifié.');
      return res.status(401).json({ message: 'Non authentifié' });
    }
    console.log(`Utilisateur authentifié : ${req.user.id}, rôle : ${req.user.role}`);
    console.log(`Rôle requis : ${role}`);
    if (req.user.role !== role) {
      console.error('Accès refusé : rôle insuffisant.');
      return res.status(403).json({ message: 'Accès interdit' });
    }
    next();
  };
};

module.exports = roleMiddleware; // Assurez-vous que la fonction est exportée