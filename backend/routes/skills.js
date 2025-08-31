const express = require('express');
const Skill = require('../models/Skill');
const router = express.Router();

// GET /skills
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ level: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /skills/top
router.get('/skills/top', async (req, res) => {
  try {
    const topSkills = await Skill.find().sort({ level: -1 }).limit(5);
    res.json(topSkills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /skills - CREATE NEW SKILL
router.post('/skills', async (req, res) => {
  try {
    const { name, level } = req.body;
    
    // Check if skill already exists
    const existingSkill = await Skill.findOne({ name: name });
    if (existingSkill) {
      return res.status(400).json({ message: 'Skill already exists' });
    }
    
    const skill = new Skill({ name, level });
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /skills/:id - UPDATE SKILL
router.put('/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    res.json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /skills/:id - DELETE SKILL
router.delete('/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
