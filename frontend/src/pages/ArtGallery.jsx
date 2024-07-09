/* eslint-disable no-unused-vars */
import Artworks from '../components/Artworks';
import { useContext } from 'react';

import { ArtworksContext } from '../context/ArtworksContext';

function ArtGallery() {
  const { artworks } = useContext(ArtworksContext);

  return (
    <>
      <div className="gallery">
        <h1>Art Gallery Page</h1>
        {/* Shows all existing artworks in the gallery */}
        <Artworks
          key={artworks.length}
          artworks={artworks.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )}
        />
      </div>
    </>
  );
}

export default ArtGallery;
