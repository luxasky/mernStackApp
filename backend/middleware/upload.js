const multer = require('multer'); // Handles uploading of artwork images
const cloudinary = require('cloudinary').v2; // Cloud service for image storage
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Cloudinary storage engine for multer

// Configure Cloudinary and set its enviroment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure storage settings for multer
const storage = new CloudinaryStorage({
  cloudinary,
  folder: (req, file) => `artworks/${req.user.id}`, // folder with dynamic naming of its files (uploaded images)
  allowedFormats: ['jpeg', 'png', 'jpg'] // Img formats allowed for upload
});

// Create a multer instance and set it up to use Cloudinary storage
const upload = multer({ storage: storage });

module.exports = upload;
