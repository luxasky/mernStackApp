// Load environment variables from .env file
require('dotenv').config();

// Import third-party modules
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// Import routers
const artworkRouter = require('./routes/artworkRoutes');
const userRouter = require('./routes/userRoutes');
const commentRouter = require('./routes/commentRoutes');

// Insert the actual password value from env. var. into URL
const mongoUri = process.env.MONGO_URI.replace(
  '${PASSWORD}',
  process.env.PASSWORD
);

// Create an instance of express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Logging middleware (to log out the incoming requests)
app.use((req, res, next) => {
  console.log(req.path, req.method);
  console.log('Cookies:', req.cookies);
  next();
});

// Routes
app.use('/api/artworks', artworkRouter);
app.use('/api/users', userRouter);
app.use('/api/comments', commentRouter);

// Connect to MongoDB
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // listen for requests after connecting to db
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch(error => console.log(error));
