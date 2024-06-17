const mongoose = require('mongoose');
const Schema = mongoose.Schema; // ref to Schema constructor

// Define Comment Schema
const commentSchema = new Schema({
  content: {
    // the actual comment text
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId, // ref to a user
    ref: 'User',
    required: true
  },
  artwork: {
    type: Schema.Types.ObjectId, // ref to an artwork
    ref: 'Artwork',
    required: true
  }
});

// create a mongoose model using Comment Schema and export it
module.exports = mongoose.model('Comment', commentSchema);
