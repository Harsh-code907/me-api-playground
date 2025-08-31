const express = require('express');
const Profile = require('../models/Profile');
const router = express.Router();

// GET /profile
router.get('/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /profile
router.put('/profile', async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, { 
      new: true, 
      upsert: true 
    });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;