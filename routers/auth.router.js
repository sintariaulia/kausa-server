const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
} = require('../controllers/auth.controller');
const { verifyToken, authorizeRoles } = require('../middleware/auth.middleware');

// Register
router.post('/register', registerUser);
// Login
router.post('/login', loginUser);
// Check
router.get('/dashboard', verifyToken, (req, res) => {
  res.send(`Selamat datang, ${req.user.email}! Anda memiliki akses ke dashboard.`);
});

module.exports = router;