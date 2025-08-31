const mongoose = require('mongoose');
require('dotenv').config();

const Profile = require('./models/Profile');
const Skill = require('./models/Skill');
const Project = require('./models/Project');

const sampleProfile = {
  name: "Harsh",
  email: "Harshjoshi030406@gmail.com",
  education: "Bachelor's of Technology in Electronics and Communication Engineering",
  institute:"National Institute of Technology, Nagaland",
  work: "Full Stack Developer ",
  links: {
    github: "https://github.com/harsh-code907",
    linkedin: "https://www.linkedin.com/in/harsh-joshi-932aa42aa ",
    portfolio: "https://my-portfolio-three-tau-51.vercel.app/"
  }
};

const sampleSkills = [
  { name: "Python", level: 7 },
  { name: "C++", level: 6 },
  { name: "C", level: 6 },
  { name: "JavaScript", level: 7 },
  { name: "React", level: 6 },
  { name: "Node.js", level: 8 },
  { name: "MongoDB", level: 5 },
  { name: "MySQL", level: 6 },
  { name: "Express.js", level: 6 },
  { name: "Machine Learning", level: 3 }
];

const sampleProjects = [
  {
    title: "Health Care Website",
    description: " Designed and developed a responsive web platform with frontend and basic backend integration to help users locate nearby pharmacies and healthcare resources. The site was visited by 100+ users in the first month..",
    skills: ["HTML", "CSS", "Firebase", "Javascript"],
    links: {
      github: "https://github.com/Harsh-code907/Rcare-App-prototype",
      demo: "https://harsh-code907.github.io/Rcare-App-prototype/"
    }
  },
  {
    title: "SAAS AI Application",
    description: "This SaaS app, built with the PERN stack, lets users analyze resumes for ATS optimization, remove or replace image backgrounds, generate AI images, and create content like articles and blog titles—all in one platform designed to boost productivity and professional growth.",
    skills: ["React", "PostgreSQL", "Express", "Node.js"]
  
  },
  
  {
    title: " Text-to-Voice Converter AI",
    description: " Built a web app converting user text into speech using external TTS APIs; processed 500+ inputs with an average response time of ¡1.2s and achieved 90%+ speech clarity accuracy",
    skills: ["HTML", "CSS", "Javascript"],
    links: {
      github: "https://github.com/Harsh-code907/Text-to-speech-html-CSS-javascript",
      demo: "https://harsh-code907.github.io/Text-to-speech-html-CSS-javascript/"
    }
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Profile.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});

    // Insert sample data
    await Profile.create(sampleProfile);
    await Skill.insertMany(sampleSkills);
    await Project.insertMany(sampleProjects);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();