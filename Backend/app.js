require('dotenv').config(); // Chargement des variables d'environnement
require('./config/db'); // Connexion à la base de données

const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");

const app = express();

// ==================== Configuration des CORS ====================
const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Remplacez par l'origine de votre frontend
  credentials: true, // Autoriser l'envoi de cookies ou d'en-têtes d'authentification
};
app.use(cors(corsOptions));

// ==================== Middlewares ====================
app.use(cookieParser());
app.use(express.json());


// ==================== Routes ====================
const adminRoutes = require('./routes/adminRoute');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

// Route par défaut
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de gestion des tâches !");
});

// Routes API
app.use('/api/admin', adminRoutes); // Routes pour l'admin
app.use('/api/responsable/projet', projectRoutes); // Routes pour les projets
app.use('/api/responsable/task', taskRoutes); // Routes pour les tâches
app.use('/api/users', userRoutes); // Routes pour les utilisateurs (authentification incluse)

// ==================== Gestion des erreurs ====================
app.use((err, req, res, next) => {
  console.error(err.stack); // Log de l'erreur pour le débogage
  res.status(500).json({ message: 'Une erreur interne est survenue.' });
});

// ==================== Démarrage du serveur ====================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}...`);
});