const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

// Middleware to parse JSON requests
app.use(express.json());

// Sample data (users)
const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];

// Endpoint to Get a list of users
app.get('/getUsers', (req, res) => {
  res.json(users);
});

// Endpoint to Get a single user by ID
app.get('/getUser/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    res.json(user);
  }
});

// Endpoint to Create a new user
app.post('/createUser', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: 'Name is required' });
  } else {
    const newUser = { id: users.length + 1, name };
    users.push(newUser);
    res.status(201).json(newUser);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`REST API demo app listening at http://localhost:${port}`);
});
