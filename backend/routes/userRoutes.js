const express = require('express');
const auth = require('../middleware/auth');
const {
  register,
  login,
  logout,
  isValidSession
} = require('../controllers/userController');

// Create an instance of a user router
const router = express.Router();

// Routes to handle user registration, login and logout
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Route to check if the login session is valid
router.get('/is-valid-session', auth, isValidSession);

// Export this router
module.exports = router;
