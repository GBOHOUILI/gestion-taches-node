require('dotenv').config(); // Chargement des variables d'environnement
require('./config/db'); // Connexion à la base de données

const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");

const app = express();

// Configuration des CORS
const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Remplacez par l'origine de votre frontend
  credentials: true, // Autoriser l'envoi de cookies ou d'en-têtes d'authentification
};

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

// Importation des routes
const essaiRoutes = require('./routes/essaiRoutes');
const adminRoutes = require('./routes/adminRoute');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const usersRoutes = require('./routes/users');

// Routes par défaut
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Déclaration des routes API
app.use('/api/admin', adminRoutes);
app.use('/api/responsable/projet', projectRoutes);
app.use('/api/responsable/task', taskRoutes);
app.use('/api/users', essaiRoutes); // Assurez-vous que cette route est nécessaire
app.use('/api/users', usersRoutes); // Route principale pour les utilisateurs
app.use('/api/member', usersRoutes); // Alias pour les utilisateurs (si nécessaire)

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur détectée :', err.stack);
  res.status(500).json({ message: 'Une erreur interne est survenue.' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 8080; // Port par défaut si non défini dans .env
app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}...`);
});