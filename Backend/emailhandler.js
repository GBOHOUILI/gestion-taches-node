require('dotenv').config(); // Charger les variables d'environnement
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Configuration du transporteur Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Vous pouvez utiliser un autre service comme Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER, // Chargé depuis .env
    pass: process.env.EMAIL_PASS, // Chargé depuis .env
  },
});

// Route pour envoyer un email
app.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Chargé depuis .env
      to,
      subject,
      text: message,
    });

    res.status(200).send({ message: 'Email envoyé avec succès !' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    res.status(500).send({ message: 'Erreur lors de l\'envoi de l\'email.' });
  }
});

// Démarrage du serveur
const PORT = 8080; // Vous pouvez changer le port si nécessaire
app.listen(PORT, () => {
  console.log(`Serveur d'email en cours d'exécution sur http://localhost:${PORT}`);
});