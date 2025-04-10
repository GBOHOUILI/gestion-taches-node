const Project = require('../models/projectModel');

const createProject = async (req, res) => {
    try {
        const { name, description, } = req.body;
        const project = new Project({
            name,
            description,
            createdBy: req.user.userid,
        });
        await project.save();
        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ createdBy: req.user.userid }).populate('teamMembers', 'nom prenoms email');
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const project = await Project.findOneAndUpdate(
            { _id: id, createdBy: req.user.userid },
            { name, description },
            { new: true }
        );
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project updated successfully', project });
    } catch (error) {
        res.status(500).json({ error: 'Error ' })
    }

};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findOneAndDelete({ _id: id, createdBy: req.user.userid });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createProject, getProjects, updateProject, deleteProject };