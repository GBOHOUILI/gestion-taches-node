const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    console.log('Utilisateur authentifié dans roleMiddleware :', req.user);
    // Vérifie si l'utilisateur est authentifié
    if (!req.user) {
      console.error('Accès refusé : utilisateur non authentifié.');
      return res.status(401).json({ message: 'Non authentifié' });
    }

    console.log(`Utilisateur authentifié : ${req.user.id}, rôle : ${req.user.role}`);
    console.log(`Rôle requis : ${requiredRole}`);

    // Vérifie si l'utilisateur a le rôle requis
    if (req.user.role !== requiredRole) {
      console.error('Accès refusé : rôle insuffisant.');
      return res.status(403).json({ message: 'Accès interdit : rôle insuffisant.' });
    }

    // Si tout est bon, passe au middleware suivant
    next();
  };
};

module.exports = roleMiddleware;
