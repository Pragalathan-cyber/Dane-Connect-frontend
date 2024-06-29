import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostComments = ({ postId, commentsKey, username }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [postId, commentsKey]); // Include postId and commentsKey in dependency array to fetch comments when postId changes or commentsKey changes

  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://dane-test-backend.vercel.app/posts/${postId}/comments`);
      setComments(response.data); // Assuming response.data is an array of comments
    } catch (error) {
      console.error('Error fetching comments:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      {comments.map(comment => (
        <div key={comment._id}>
          <p><strong>{username}: </strong>{comment.text}</p>
          {/* Render other comment details as needed */}
        </div>
      ))}
    </div>
  );
};

export default PostComments;
