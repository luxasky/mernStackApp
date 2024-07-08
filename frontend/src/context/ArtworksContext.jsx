/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

// Create Artworks Context to manage artworks state
export const ArtworksContext = createContext();

// Artworks Context Provider
export const ArtworksProvider = ({ children }) => {
  const [artworks, setArtworks] = useState([]);
  const [userArtworks, setUserArtworks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/artworks', {
        withCredentials: true
      })
      .then(res => {
        setArtworks(res.data);
      })
      .catch(error => {
        console.error('Error fetching artworks:', error);
      });
  }, []);

  return (
    <ArtworksContext.Provider
      value={{ artworks, setArtworks, userArtworks, setUserArtworks }}>
      {children}
    </ArtworksContext.Provider>
  );
};
