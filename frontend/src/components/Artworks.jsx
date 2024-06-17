import { useEffect, useState } from 'react';
import axios from 'axios';

import ArtworkCard from './ArtworkCard';

function Artworks() {
  // Define state to keep track of all existing artworks
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/artworks', { withCredentials: true })
      .then(res => {
        console.log('Fetched artworks:', res.data);
        // Update the artworks state after fetching all artworks
        setArtworks(res.data);
      })
      .catch(err => {
        console.error('Error fetching artworks:', err);
      });
  }, []);

  // Handle state change of artworks array
  function handleDeleteArtwork(id) {
    setArtworks(artworks => artworks.filter(a => a._id !== id));
  }

  return (
    <ul className="artworks">
      {artworks.map(artwork => {
        return (
          <ArtworkCard
            key={artwork._id} // key required for each item of Artworks list
            artwork={artwork} // artwork data
            deleteArtworkFromGallery={handleDeleteArtwork} // handle artwork deletion
            isDeleteButton={false} // hide delete button when showing all artworks
          />
        );
      })}
    </ul>
  );
}

export default Artworks;
