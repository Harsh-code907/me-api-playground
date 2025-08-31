const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true, min: 1, max: 10 }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);