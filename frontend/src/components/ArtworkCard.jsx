/* eslint-disable react/prop-types */

// Import axios for http requests, hooks and context values
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function ArtworkCard({ artwork, deleteArtworkFromGallery, isDeleteButton }) {
  // Destructure Auth Context values
  const { isLoggedIn, curUserId } = useContext(AuthContext);
  const navigate = useNavigate();

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
        // the props function for updating artworks state
        if (deleteArtworkFromGallery) {
          deleteArtworkFromGallery(id);

          navigate('/my-portfolio'); // return to portfolio page after deleting an artwork
        } else {
          console.log(
            'deleteArtworkFromGallery UNIDEFINED:',
            deleteArtworkFromGallery
          );
        }
      })
      .catch(err => console.log('Error deleting artwork:', err));
  }

  // Display 'Unknown Artist' if the username is missing
  const username =
    artwork.user && artwork.user.username
      ? artwork.user.username
      : 'Unknown Artist';

  // Check if the signed user is authorised to delete the artwork
  const isAuthorised = artwork.user && curUserId === artwork.user._id;

  return (
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
      <div className="artwork-card">
        <img src={artwork.imageUrl} alt={artwork.title} />
      </div>
      <div className="artwork-description">{artwork.description}</div>
    </li>
  );
}

export default ArtworkCard;
