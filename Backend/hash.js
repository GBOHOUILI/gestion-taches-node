const bcrypt = require('bcryptjs');

(async () => {
  const password = 'eldo-moreo'; // Mot de passe en clair
  const hashedPassword = await bcrypt.hash(password, 10); // Hachage du mot de passe
  console.log('Mot de passe haché :', hashedPassword);
})();