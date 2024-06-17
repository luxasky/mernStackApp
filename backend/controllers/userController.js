const bcrypt = require('bcrypt'); // for password hashing
const jwt = require('jsonwebtoken'); // to create tokens
const User = require('../models/userModel');

// Register
const register = async (req, res) => {
  // Try and create new user account
  try {
    const { username, password } = req.body;
    // hash the password using bcrypt
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      password: hash
    });
    // save the newly created user to the db
    await user.save();

    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Login
const login = async (req, res) => {
  const { username, password } = req.body; // Extract login details from the request body
  const user = await User.findOne({ username }); // Find existing user by username

  // If user doesn't exist
  if (!user) {
    return res.status(404).send('User not found');
  }
  // Validate the given password with the hash value from db
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).send('Invalid credentials');
  }

  // Create a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
  // Cookie configuration
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24
  });
  // Confirm login success and send isAuth property to the client (for later ref in the frontend)
  res.status(200).json({ message: 'Login successful', isAuth: true });
};

// Logout
const logout = (req, res) => {
  // clear the cookie and send a success response
  res.clearCookie('token');
  res.status(200).send('Success logging out');
};

// Validate the Session
const isValidSession = (req, res) => {
  if (req.isAuth) {
    res.json({
      message: 'You are authenticated!',
      isAuth: true,
      // set userId property on the request obj for later use
      userId: req.userId
    });
  } else {
    console.log(`req.isAuth: ${req.isAuth}`); // Log for debug.

    res.status(401).json({ message: 'Authentication failed', isAuth: false }); // Response in case of authentication failure
  }
};

module.exports = { register, login, logout, isValidSession };
