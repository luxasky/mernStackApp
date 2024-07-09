/* eslint-disable react/prop-types */
// import { useContext } from 'react';
// import { ArtworksContext } from '../context/ArtworksContext';
import ArtworkForm from '../components/ArtworkForm';

function AddArtwork() {
  return (
    <div className="add-artwork">
      <h1 className="cursive">Add Artwork Page</h1>
      <ArtworkForm />
    </div>
  );
}

export default AddArtwork;
