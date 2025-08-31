const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  education: { type: String, required: true },
  institute:{type:String, required:true},
  work: { type: String, required: true },
  links: {
    github: { type: String },
    linkedin: { type: String },
    portfolio: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);