const mongoose = require('mongoose');
const Comment = require('../models/commentModel');

// GET all comments (related to an artwork)
const getAllCommentsByArtId = async (req, res) => {
  const { artId } = req.params;
  // Query all comments related to the artwork and populate the 'user' field with 'username'
  try {
    const comments = await Comment.find({ artwork: artId }).populate(
      'user',
      'username'
    );
    // send response with all comments
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// POST (create) a comment
const createComment = async (req, res) => {
  // earlier, the auth middleware defines userId property
  const userId = req.userId;
  const { content, artId } = req.body; // get the rest of the  properties of comment from

  try {
    // create new comment
    const comment = await Comment.create({
      content,
      user: userId,
      artwork: artId
    });
    // Send the new comment object to the client
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// DELETE a comment
const deleteComment = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  try {
    // Find the comment using its ID
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ err: 'Comment Not Found' });
    }

    // If the user is authorise to delete it
    if (comment.user.toString() !== userId) {
      return res.status(403).json({ err: 'Not Authorised' });
    }
    // Delete the comment
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: 'Comment successfully deleted' });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  getAllCommentsByArtId,
  createComment,
  deleteComment
};
