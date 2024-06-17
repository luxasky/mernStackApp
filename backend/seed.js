// Some test data needed in the middle of development phase
// But rather not required later, after images were stored in Cloudinary instead of locally

require('dotenv').config();
const mongoose = require('mongoose');
const Artwork = require('./models/artworkModel');

const mongoUri = process.env.MONGO_URI.replace(
  '${PASSWORD}',
  process.env.PASSWORD
);

const artworks = [
  {
    title: 'Starry Night',
    description:
      'A famous painting by Vincent van Gogh, depicting a night sky filled with swirling clouds, stars ablaze with their own luminescence, and a bright crescent moon.',
    imageUrl:
      '/Users/lexasky/Desktop/art/tyler-clemmensen-DQ_KYf1LF6E-unsplash.jpg'
  },
  {
    title: 'The Persistence of Memory',
    description:
      'A surreal painting by Salvador Dalí, known for its depiction of melting clocks in a desert landscape.',
    imageUrl: '/Users/lexasky/Desktop/art/kelly-sikkema-jIrsEPB4_iU-unsplash'
  },
  {
    title: 'The Scream',
    description:
      'An iconic painting by Edvard Munch, representing a figure with an agonized expression against a tumultuous orange sky.',
    imageUrl: '/Users/lexasky/Desktop/art/engin-akyurt-psJACB3sgdc-unsplash.jpg'
  },
  {
    title: 'Girl with a Pearl Earring',
    description:
      "A beautiful painting by Johannes Vermeer, often referred to as the 'Mona Lisa of the North'.",
    imageUrl:
      '/Users/lexasky/Desktop/art/cristina-anne-costello-6warLmT92Mc-unsplash.jpg'
  },
  {
    title: 'The Birth of Venus',
    description:
      'A painting by Sandro Botticelli, depicting the goddess Venus emerging from the sea as a fully grown woman.',
    imageUrl: '/Users/lexasky/Desktop/art/nathan-cima-TXpUwpCIY2g-unsplash.jpg'
  }
];

const seedDb = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await Artwork.deleteMany({});
    await Artwork.insertMany(artworks);
    console.log('Data successfully added');
  } catch (err) {
    console.error('Error inserting data: ', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDb();
