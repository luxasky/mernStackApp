// /* eslint-disable no-unused-vars */
import Artworks from '../components/Artworks';
import { useContext, useEffect } from 'react';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';
import { ArtworksContext } from '../context/ArtworksContext';

function MyPortfolio() {
  // Get state from the contexts
  const { curUserId, setCurUserId, setIsLoggedIn } = useContext(AuthContext);
  const { artworks, userArtworks, setUserArtworks } =
    useContext(ArtworksContext);

  // Validate current login session
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/users/is-valid-session', {
        withCredentials: true
      })
      .then(res => {
        // State updates based on the response from the server
        setIsLoggedIn(res.data.isAuth);
        setCurUserId(res.data.userId);
      })
      .catch(err => {
        console.error(err);
      });
  }, [setCurUserId, setIsLoggedIn]);

  // artworks state
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/artworks', {
        withCredentials: true
      })
      .then(res => {
        const allArtworks = res.data;
        const filteredArtworks = allArtworks
          .filter(artwork => artwork.user && artwork.user._id === curUserId)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setUserArtworks(filteredArtworks);
      })
      .catch(err => {
        console.error('Error updating artworks of the Current User', err);
      });
  }, [artworks, curUserId, setUserArtworks]);

  return (
    <div className="portfolio">
      <h1 className="cursive">Portfolio Page</h1>
      {/* Display artworks of the current user only, i.e. their personal portfolio */}
      <Artworks key={userArtworks.length} artworks={userArtworks} />
    </div>
  );
}

export default MyPortfolio;
