const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';
  const jwtSecret = process.env.JWT_SECRET || 'divyanshi_secret_key_2026';

  if (username === adminUser && password === adminPass) {
    const token = jwt.sign({ role: 'admin' }, jwtSecret, {
      expiresIn: '8h',
    });
    return res.json({ token, message: 'Login successful' });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
