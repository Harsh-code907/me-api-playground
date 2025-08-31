const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// GET /projects
router.get('/projects', async (req, res) => {
  try {
    const { skill } = req.query;
    let query = {};
    
    if (skill) {
      query.skills = { $in: [skill] };
    }
    
    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /projects/search
router.get('/projects/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const projects = await Project.find({
      title: { $regex: q, $options: 'i' }
    }).sort({ createdAt: -1 });
    
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /projects/:id - GET SINGLE PROJECT
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /projects - CREATE NEW PROJECT
router.post('/projects', async (req, res) => {
  try {
    const { title, description, skills, links } = req.body;
    
    const project = new Project({
      title,
      description,
      skills: skills || [],
      links: links || {}
    });
    
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /projects/:id - UPDATE PROJECT
router.put('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /projects/:id - DELETE PROJECT
router.delete('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;