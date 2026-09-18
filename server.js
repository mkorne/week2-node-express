const path = require('path');
require('dotenv').config(); 
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000; 

// --- MIDDLEWARE ---
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
  next(); 
});

// --- ROUTES (Must come before app.listen) ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/user', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Missing required data: Please provide both name and email." });
  }
  res.send(`Hello, ${name}!`);
});

app.post('/user', (req, res) => {
  // Add || {} to ensure destructuring doesn't fail
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: "Missing required data: Please provide both name and email." });
  }
  res.send(`Hello, ${name}!`);
});

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ${userId} profile`);
});

// --- SERVER ACTIVATION (Must be at the very bottom) ---
app.listen(PORT, () => {
  console.log(`Server is successfully running on http://localhost:${PORT}`);
});