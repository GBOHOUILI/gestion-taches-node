const { sendEmail } = require('../utils/emailservice');

// Fonction pour envoyer une notification à l'admin
const sendAdminNotification = async (userDetails) => {
  const { email, nom, prenoms, role } = userDetails;

  const subject = 'Nouvelle inscription utilisateur';
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h3 style="color: #4CAF50;">Un utilisateur vient de s'inscrire</h3>
      <p><strong>Nom :</strong> ${nom} ${prenoms}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Rôle :</strong> ${role}</p>
      <p>
        Veuillez valider son compte dans le tableau de bord admin.
        <a href="http://localhost:8080/admin/dashboard" style="color: #4CAF50; text-decoration: none;">Accéder au tableau de bord</a>
      </p>
    </div>
  `;

  await sendEmail(process.env.ADMIN_EMAIL, subject, html);
};

// Fonction pour envoyer une notification à l'utilisateur
const sendUserNotification = async (userDetails) => {
  const { email, nom } = userDetails;

  const subject = 'Inscription en attente de validation';
const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h3 style="color: #4CAF50;">Bonjour ${nom},</h3>
        <p>Votre inscription a été reçue. Votre compte est en attente de validation par un administrateur.</p>
        <p>Vous recevrez un email une fois votre compte activé.</p>
        <p>
            En attendant, vous pouvez visiter notre page d'accueil :
            <a href="http://localhost:8080" style="color: #4CAF50; text-decoration: none;">Accéder à la page d'accueil</a>
        </p>
    </div>
`;

  await sendEmail(email, subject, html);
};

module.exports = { sendAdminNotification, sendUserNotification };