const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getAllArtworks,
  getOneArtwork,
  createArtwork,
  deleteArtwork,
  uploadArtImage
} = require('../controllers/artworkController');

// Create an instance of an artwork router
const router = express.Router();

// Public Access Routes
router.get('/', getAllArtworks);
router.get('/:id', getOneArtwork);

// Private Routes - Require Authentication
router.post('/', auth, createArtwork);
router.delete('/:id', auth, deleteArtwork);

// Upload Image File
router.post('/upload', auth, upload.single('image'), uploadArtImage);

// Export this router
module.exports = router;
