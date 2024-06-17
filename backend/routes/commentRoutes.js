const express = require('express');
const auth = require('../middleware/auth');
const {
  getAllCommentsByArtId,
  createComment,
  deleteComment
} = require('../controllers/commentController');

// Create an instance of a comment router
const router = express.Router();

// GET all comments (of an artwork) by specifying artwork ID
router.get('/:artId', getAllCommentsByArtId);

// Private Routes - Require Authentication
router.post('/', auth, createComment);
router.delete('/:id', auth, deleteComment);

// Export this router
module.exports = router;
