const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');  // Adapte le chemin si nécessaire

async function createAdmin() {
  // Connexion à la base de données
  await mongoose.connect('mongodb://localhost:27017/nom_de_ta_base_de_donnees', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Vérifier si l'administrateur existe déjà
  const adminExists = await User.findOne({ email: 'admin@exemple.com' });
  if (adminExists) {
    console.log('L\'administrateur existe déjà.');
    return;
  }

  // Créer un administrateur par défaut
  const hashedPassword = await bcrypt.hash('motdepasseadmin', 10);  // Hashage du mot de passe par défaut

  const admin = new User({
    nom: 'Admin',
    prenoms: 'Administrateur',
    email: 'admin@exemple.com',
    password: hashedPassword,
    role: 'admin',
    isActive: true,  // Administrateur déjà validé
  });

  await admin.save();
  console.log('Administrateur créé avec succès.');

  // Fermer la connexion
  mongoose.connection.close();
}

createAdmin().catch(console.error);
