const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', require('./routes/profile'));
app.use('/api', require('./routes/skills'));
app.use('/api', require('./routes/projects'));

// Health check
app.get('/health', (req, res) => {
  res.json('OK');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});