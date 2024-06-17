/* eslint-disable react/prop-types */

function Comments({ comments }) {
  return (
    // List of all the comments
    <ul className="comments-list">
      {comments.map(comment => (
        <li key={comment._id} className="comments-list-item">
          <p className="comments-content">{comment.content}</p>
          <p className="comments-cite">
            <cite>By &#64;{comment.user.username}</cite>
          </p>
        </li>
      ))}
    </ul>
  );
}

export default Comments;
