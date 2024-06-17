const jwt = require('jsonwebtoken');

// Auth Middleware
const auth = (req, res, next) => {
  const token = req.cookies.token; // retrieve token
  console.log(`req.cookies.token ${req.cookies.token}`); // Log for debug.
  // If token doesn't exist, set 'isAuth' to false to imply failure in authorisation
  if (!token) {
    return res.status(401).json({ isAuth: false });
  }

  // Token verfification
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // decode token set userId property on request obj
    req.isAuth = true; // Set isAuth flag

    // Log for debug
    console.log('Token found:', token);
    console.log('Decoded token:', decoded);

    next(); // move to the next middleware
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ isAuth: false }); // response if the auth failed
  }
};

module.exports = auth;
