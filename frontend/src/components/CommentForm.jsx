import { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
function CommentForm({ artId, onCommentPosted }) {
  const [text, setText] = useState('');

  const handleSubmitComment = async e => {
    e.preventDefault(); // prevent the default behaviour, i.e. automatic page reload
    // try to add a comment
    try {
      const res = await axios.post(
        `http://localhost:4000/api/comments`,
        { content: text, artId: artId }, // data payload
        { withCredentials: true }
      );
      onCommentPosted(res.data);
      setText(''); // clear the field after adding a comment
    } catch (err) {
      console.error('Error adding comment: ', err);
    }
  };

  return (
    <form className="form" onSubmit={e => handleSubmitComment(e)}>
      <textarea
        value={text} // text state
        onChange={e => setText(e.target.value)} // updates the state of the'value' of <textarea> (the comment input field)
        placeholder="Leave a comment..."
      />
      <button className="btn btn-add-comment" type="submit">
        Add Comment
      </button>
    </form>
  );
}

export default CommentForm;
