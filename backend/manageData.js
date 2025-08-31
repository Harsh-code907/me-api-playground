//Easy data management script

const mongoose = require('mongoose');
require('dotenv').config();

const Profile = require('./models/Profile');
const Skill = require('./models/Skill');
const Project = require('./models/Project');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Add new skills
const addSkills = async (skillsArray) => {
  try {
    const addedSkills = await Skill.insertMany(skillsArray);
    console.log('Skills added:', addedSkills.map(s => s.name));
    return addedSkills;
  } catch (error) {
    console.error('Error adding skills:', error.message);
  }
};

// Add new project
const addProject = async (projectData) => {
  try {
    const project = await Project.create(projectData);
    console.log('Project added:', project.title);
    return project;
  } catch (error) {
    console.error('Error adding project:', error.message);
  }
};

// Update profile
const updateProfile = async (profileData) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, profileData, { 
      new: true, 
      upsert: true 
    });
    console.log('Profile updated:', profile.name);
    return profile;
  } catch (error) {
    console.error('Error updating profile:', error.message);
  }
};

// List all data
const listAllData = async () => {
  try {
    const profile = await Profile.findOne();
    const skills = await Skill.find().sort({ level: -1 });
    const projects = await Project.find().sort({ createdAt: -1 });
    
    console.log('\n CURRENT DATA:');
    console.log('\n Profile:', profile?.name || 'No profile found');
    console.log('\n Skills:', skills.map(s => `${s.name} (Level ${s.level})`));
    console.log('\n Projects:', projects.map(p => p.title));
    
    return { profile, skills, projects };
  } catch (error) {
    console.error(' Error listing data:', error.message);
  }
};

// Delete skill by name
const deleteSkill = async (skillName) => {
  try {
    const result = await Skill.findOneAndDelete({ name: skillName });
    if (result) {
      console.log(' Skill deleted:', skillName);
    } else {
      console.log(' Skill not found:', skillName);
    }
    return result;
  } catch (error) {
    console.error(' Error deleting skill:', error.message);
  }
};

// Delete project by title
const deleteProject = async (projectTitle) => {
  try {
    const result = await Project.findOneAndDelete({ title: projectTitle });
    if (result) {
      console.log('Project deleted:', projectTitle);
    } else {
      console.log('Project not found:', projectTitle);
    }
    return result;
  } catch (error) {
    console.error(' Error deleting project:', error.message);
  }
};

