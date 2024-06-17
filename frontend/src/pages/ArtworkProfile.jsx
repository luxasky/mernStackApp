import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ArtworkCard from '../components/ArtworkCard';
import Comments from '../components/Comments';
import CommentForm from '../components/CommentForm';

function ArtworkProfile() {
  const [artData, setArtData] = useState({});
  const [artComments, setArtComments] = useState([]);
  let { id: artId } = useParams(); // extract artwork id from the URL

  useEffect(() => {
    // Fetch the artwork and all comments related to it
    const getFullData = async () => {
      try {
        // Fetch artwork data (using artId)
        const artRes = await axios.get(
          `http://localhost:4000/api/artworks/${artId}`,
          { withCredentials: true }
        );
        setArtData(artRes.data);

        // Fetch comments (using artId)
        const commentsRes = await axios.get(
          `http://localhost:4000/api/comments/${artId}`,
          { withCredentials: true }
        );
        setArtComments(commentsRes.data);
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    getFullData();
  }, [artId]);

  // Update state of Comments after adding a new comment
  const handleCommentPosted = newComment => {
    setArtComments(c => [...c, newComment]);
  };

  return (
    <div className="artwork-profile">
      <h1>Artwork Profile Page</h1>
      <div className="section-card">
        <ArtworkCard
          artwork={artData}
          isDeleteButton={true}
          deleteArtworkFromGallery={() => false} // disable the ability to delete artwork when user browsers the entire Art Gallery
        />
      </div>
      <div className="comments">
        <p>Comment Section</p>
        <Comments artId={artId} comments={artComments} />
        <CommentForm artId={artId} onCommentPosted={handleCommentPosted} />
      </div>
    </div>
  );
}

export default ArtworkProfile;
