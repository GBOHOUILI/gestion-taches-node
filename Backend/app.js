require('dotenv').config();
require('./config/db');

const express = require("express");
const cookieParser = require('cookie-parser');
const http = require('http');
const socketIo = require('socket.io');
const cors = require("cors");

const app = express();
const server = http.createServer(app); // Créez un serveur HTTP
const io = socketIo(server, {
  cors: {
    origin: 'http://127.0.0.1:5500', // Origine de votre frontend
    methods: ['GET', 'POST'],
  },
});

// ==================== Configuration des CORS ====================
const corsOptions = {
  origin: 'http://127.0.0.1:5501', // Remplacez par l'origine de votre frontend
  credentials: true, // Autoriser l'envoi de cookies ou d'en-têtes d'authentification
};
app.use(cors(corsOptions));

app.set('io', io);
app.use(cookieParser());
app.use(express.json());

const adminRoutes = require('./routes/adminRoute');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

// Routes API
app.use('/api/admin', adminRoutes); 
app.use('/api/responsable/projet', projectRoutes);
app.use('/api/responsable/task', taskRoutes);
app.use('/api/users', userRoutes);

// Route par défaut
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de gestion des tâches !");
});

io.on('connection', (socket) => {
  console.log('Un client est connecté.');

  // Exemple : Envoyer un message de test au client
  socket.emit('testEvent', { message: 'Connexion réussie avec Socket.IO' });

  socket.on('disconnect', () => {
    console.log('Un client s\'est déconnecté.');
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).json({ message: 'Une erreur interne est survenue.' });
});


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}...`);
});