const nodemailer = require('nodemailer');

// Configuration du transporteur Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Serveur SMTP de Gmail
  port: 587, // Port SMTP
  secure: false, // Utilisation de TLS
  auth: {
    user: process.env.EMAIL_USER, // Adresse email (variable d'environnement)
    pass: process.env.EMAIL_PASS, // Mot de passe ou mot de passe d'application
  },
});

// Fonction pour envoyer un email
const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Expéditeur
    to, // Destinataire
    subject, // Sujet
    html, // Contenu HTML
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email envoyé à ${to}`);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    throw new Error('Erreur lors de l\'envoi de l\'email');
  }
};

module.exports = { sendEmail };