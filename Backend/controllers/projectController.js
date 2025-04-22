const Project = require('../models/projectModel');  

const createProject = async (req, res) => {
  const { titre, description, date_debut, date_fin, membres } = req.body;
  const responsable_id = req.user.id;  // ID récupéré depuis le token

  try {
    const newProject = new Project({
      titre,
      description,
      date_debut,
      date_fin,
      responsable_id,
      membres: membres || []
    });

    await newProject.save();
    res.status(201).json({ message: 'Projet créé avec succès', newProject });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du projet', error: error.message });
  }
};


const getProjects = async (req, res) => {
  const responsable_id = req.user.id;

  try {
    const projects = await Project.find({ responsable_id }).populate('responsable_id', 'nom email');
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des projets', error: error.message });
  }
};


const getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id).populate('responsable_id', 'nom email').populate('membres', 'nom prenoms email');
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du projet', error: error.message });
  }
};


const updateProject = async (req, res) => {
  const { id } = req.params;
  const { titre, description, date_debut, date_fin } = req.body;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    project.titre = titre || project.titre;
    project.description = description || project.description;
    project.date_debut = date_debut || project.date_debut;
    project.date_fin = date_fin || project.date_fin;

    await project.save();
    res.status(200).json({ message: 'Projet mis à jour avec succès', project });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du projet', error: error.message });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    await project.deleteOne();
    res.status(200).json({ message: 'Projet supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du projet', error: error.message });
  }
};


const getProjectsForMember = async (req, res) => {
  const memberId = req.user.id;

  try {
    const projects = await Project.find({ membres: memberId }).populate('responsable_id', 'nom prenoms email');
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des projets", error: error.message });
  }
};


module.exports = { createProject, getProjects, getProjectById, updateProject, deleteProject, getProjectsForMember };
