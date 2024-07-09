/* eslint-disable react/prop-types */
import { useContext } from 'react';
import ArtworkCard from './ArtworkCard';
import { ArtworksContext } from '../context/ArtworksContext';

function Artworks({ artworks }) {
  // Get artworks state setter from the context
  const { setArtworks } = useContext(ArtworksContext);

  // Handle state change of artworks array
  function handleDeleteArtwork(id) {
    setArtworks(artworks => artworks.filter(a => a._id !== id));
  }

  return (
    <>
      <ul className="artworks">
        {Array.isArray(artworks) &&
          artworks.map(artwork => (
            <ArtworkCard
              key={artwork._id} // key required for each item of Artworks list
              artwork={artwork}
              deleteArtworkFromGallery={handleDeleteArtwork} // handle artwork deletion
              isDeleteButton={false} // hide delete button when showing all artworks
            />
          ))}
      </ul>
    </>
  );
}

export default Artworks;
