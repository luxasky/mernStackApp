const mongoose = require('mongoose');
const Schema = mongoose.Schema; // ref to Schema constructor

// Define Artwork Schema
const artworkSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    // URL to the image in Cloudinary
    imageUrl: {
      type: String,
      required: true,
      unique: true
    },
    publicId: {
      // public ID of an image in Cloudinary
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId, // Ref to the user model
      ref: 'User',
      required: true
    }
  },

  { timestamps: true } // createdAt and updatedAt fields
);

// create a mongoose model using Artwork Schema and export it
module.exports = mongoose.model('Artwork', artworkSchema);
