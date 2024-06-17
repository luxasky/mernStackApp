const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const Artwork = require('../models/artworkModel');

// GET all artworks
const getAllArtworks = async (req, res) => {
  // query all artworks and populate 'user' field with 'username'
  const artworks = await Artwork.find({})
    .populate('user', 'username')
    .sort({ createdAt: -1 }); // Sort in a descending order (the recently added artworks will be shown first)
  res.status(200).json(artworks);
};

// GET a single artwork
const getOneArtwork = async (req, res) => {
  const { id } = req.params; // retrieve artwork id
  const artwork = await Artwork.findById(id).populate('user', 'username');
  // Validate artwork ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No art with such id!' });
  }
  // Check if the artwork exists
  if (!artwork) {
    return res.status(404).json({ error: 'No such art!' });
  }
  // Send the artwork object to the client
  res.status(200).json(artwork);
};

// POST (create) a new artwork
const createArtwork = async (req, res) => {
  console.log('Cookies:', req.cookies); // Log for debug.

  // get artwork data from the request body
  const { title, description, imageUrl, publicId } = req.body;
  const userId = req.userId;

  try {
    // Create an artwork document and save it to the db
    const artwork = new Artwork({
      title,
      description,
      imageUrl,
      publicId,
      user: userId
    });
    await artwork.save();

    console.log(artwork); // Log for debug.
    res.status(201).send(artwork);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// UPLOAD artwork image
const uploadArtImage = (req, res) => {
  // If the file has been uploaded
  if (!req.file) {
    return res.status(400).send('No file upload');
  }
  // Send a respond with an imageUrl and publicId retrieved from Cloudinary
  res.json({ image: req.file.path, publicId: req.file.filename });
};

// DELETE an artwork
const deleteArtwork = async (req, res) => {
  const { id } = req.params; // artwork id
  const userId = req.userId; // user id

  // Validate artwork id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No artwork with such id!' });
  }

  const artwork = await Artwork.findById(id);

  // Check if the artwork exists
  if (!artwork) {
    return res.status(400).json({ error: 'No such artwork!' });
  }
  // Check if the user is authorised to delete the artwork
  if (artwork.user.toString() !== userId) {
    return res
      .status(403)
      .json({ error: 'Not authorised to delete this artwork' });
  }
  // Assign public id of an artwork to a variable for ease of use
  const publicId = artwork.publicId;

  // Try to delete the image from Cloudinary
  try {
    await cloudinary.uploader.destroy(publicId);
    // and then delete from db as well
    await Artwork.findByIdAndDelete(id);
    res
      .status(200)
      .json({ artwork: artwork, msg: 'Artwork successfully deleted' });
  } catch (err) {
    res.status(401).json({ err: 'Error deleting artwork' });
  }
};

module.exports = {
  getAllArtworks,
  getOneArtwork,
  createArtwork,
  deleteArtwork,
  uploadArtImage
};
