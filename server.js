const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const ACCOUNTS = {
  'admin@example.com': 'Test123',
  'user@example.com': 'Password1',
};

// Login: 200 success, 401 failure
app.post('/login', (req, res) => {
  const email = req.body.email || req.body.username;
  const password = req.body.password;
  if (ACCOUNTS[email] && ACCOUNTS[email] === password) {
    return res.status(200).send('Login successful');
  }
  res.status(401).send('Login failed');
});

// Authentication: always 401 for failure testing
app.post('/authentication', (req, res) => {
  res.status(401).send('Authentication failed');
});

// Sign-in: alias for login regex matching
app.post('/signin', (req, res) => {
  res.status(401).send('Sign-in failed');
});

// Everything else: 200
app.get('*', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
