const Notification = require('../models/notifModel'); // Modèle Mongoose

// Récupérer toutes les notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ time: -1 }); // Trier par date décroissante
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des notifications', error });
  }
};

// Créer une nouvelle notification

const createNotification = async (req, res) => {
  try {
    const { action, user } = req.body;

    // Logique pour créer une notification
    const notification = await Notification.create({
      message: `Action ${action} effectuée pour l'utilisateur ${user.nom} ${user.prenoms}`,
      icon: action === 'create' ? 'check-circle' : action === 'delete' ? 'trash' : 'edit',
      time: new Date(),
    });

    // Envoyer la notification en temps réel via Socket.IO
    const io = req.app.get('io');
    console.log('Émission de la notification via Socket.IO :', notification);
    io.emit('newNotification', notification);

    res.status(201).json({ message: 'Notification créée avec succès.', notification });
  } catch (error) {
    console.error('Erreur lors de la création de la notification :', error);
    res.status(500).json({ message: 'Erreur lors de la création de la notification.' });
  }
};

// Supprimer une notification
const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    // Vérification de l'existence de la notification
    const deletedNotification = await Notification.findByIdAndDelete(notificationId);
    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification introuvable.' });
    }

    res.status(200).json({ message: 'Notification supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la notification', error });
  }
};

module.exports = {
  getNotifications,
  createNotification,
  deleteNotification,
};