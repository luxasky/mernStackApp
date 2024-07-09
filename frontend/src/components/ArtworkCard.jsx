/* eslint-disable react/prop-types */

// Import axios for http requests, hooks and context values
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import PopupMsg from './PopupMsg';

function ArtworkCard({ artwork, deleteArtworkFromGallery, isDeleteButton }) {
  // Destructure Auth Context values
  const { isLoggedIn, curUserId } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
  const [popupMsg, setPopupMsg] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (popupMsg) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setPopupMsg(null);
        navigate('/my-portfolio');
      }, 2000);

      // Clear the timeout
      return () => clearTimeout(timer);
    }
  }, [navigate, popupMsg, setIsVisible]);

  // Go to the individual artwork's page
  function handleArtworkClick(id) {
    navigate(`/artworks/${id}`);
  }

  // Delete an artwork
  function handleClickDeleteIcon(e, id) {
    // stop event from bubbling up onto other elements
    e.stopPropagation();
    axios
      .delete(`http://localhost:4000/api/artworks/${id}`, {
        withCredentials: true // includes cookies in the request
      })
      .then(() => {
        deleteArtworkFromGallery(id);
        setPopupMsg('Artwork has been deleted');
        setIsVisible(true);
      })
      .catch(err => {
        console.error('Error! Artwork not deleted!', err);
        setPopupMsg('Failed to delete artwork');
        setIsVisible(true);
      });
  }

  // Display 'Unknown Artist' if the username is missing
  const username =
    artwork.user && artwork.user.username
      ? artwork.user.username
      : 'Unknown Artist';

  // Check if the signed user is authorised to delete the artwork
  const isAuthorised = artwork.user && curUserId === artwork.user._id;

  return (
    <>
      <li
        className="artwork"
        onClick={() => {
          handleArtworkClick(artwork._id);
        }}>
        <div className="artwork-title">
          <div>
            <span>{artwork.title} </span>
            {'  '}
            <span>By {username}</span>
          </div>
          {isLoggedIn && isAuthorised && isDeleteButton && (
            <button
              className="btn btn-delete"
              onClick={e => handleClickDeleteIcon(e, artwork._id)}>
              <i className="fa-solid fa-trash"></i>
            </button>
          )}
        </div>
        {isVisible && <PopupMsg popupMsg={popupMsg} />}
        <div className="artwork-card">
          <img src={artwork.imageUrl} alt={artwork.title} />
        </div>
        <div className="artwork-description">{artwork.description}</div>
      </li>
    </>
  );
}

export default ArtworkCard;
