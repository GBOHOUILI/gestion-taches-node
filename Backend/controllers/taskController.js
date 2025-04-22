const Task = require('../models/taskModel');

const createTask = async (req, res) => {
  const { titre, statut, priorite, date_creation, date_echeance, assignee, projet_id } = req.body;
  const responsable_id = req.user.id;  // On récupère l'id du responsable car c'est lui qui crée la tache

  try {
    const newTask = new Task({
        titre,
        statut,
        priorite,
        date_creation,
        date_echeance,
        assignee,
        projet_id
    });

    await newTask.save();
    res.status(201).json({ message: 'Tache créée avec succès', newTask });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de ta tache', error: error.message });
  }
};

const getTasks = async (req, res) => {
  const responsable_id = req.user.id;

  try {
    const tasks = await Task.find({ responsable_id }).populate('responsable_id', 'nom email').populate('projet_id', 'titre description').populate('assignee', 'nom prenoms');
    res.status(200).json({tasks });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des taches', error: error.message });
  }
};


const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id).populate('responsable_id', 'nom email');
    if (!task) {
      return res.status(404).json({ message: 'Tache non trouvée' });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la tache', error: error.message });
  }
};


const updateTask = async (req, res) => {
  const { id } = req.params;
  const {titre, statut, priorite, date_creation, date_echeance, assignee, projet_id} = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Tache non trouvé' });
    }

    task.titre = titre || task.titre;
    task.statut = statut || task.statut;
    task.priorite = priorite || task.priorite;
    task.date_creation = date_creation || task.date_creation;
    task.date_echeance = date_echeance || task.date_echeance;
    task.assignee = assignee || task.assignee;
    task.projet_id = projet_id || task.projet_id;

    await task.save();
 
    res.status(200).json({ message: 'Tache mis à jour avec succès', task });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tache', error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Tache non trouvé' });
    }

    await task.deleteOne();
    res.status(200).json({ message: 'Tache supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la tache', error: error.message });
  }
};



// permettre aux membre de voir la tache qui leur a été assigné

const getTasksForMemberInProject = async (req, res) => {
  const userId = req.user.id;
  const { projectId } = req.params;

  try {
    const tasks = await Task.find({
      projet: projectId,
      assignes: userId
    }).populate('assignee', 'nom prenoms').populate('projet', 'titre');

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des tâches", error: error.message });
  }
};


const updateTaskStatusByMember = async (req, res) => {
  const { id } = req.params; // ID de la tâche
  const { statut } = req.body;
  const userId = req.user.id; // ID du membre connecté

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    // Vérifier que l'utilisateur fait partie des assignés
    const isAssigned = task.assignes.includes(userId);
    if (!isAssigned) {
      return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier cette tâche" });
    }

    task.statut = statut;
    await task.save();

    res.status(200).json({ message: "Statut de la tâche mis à jour", task });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du statut", error: error.message });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask, getTasksForMemberInProject, updateTaskStatusByMember };
