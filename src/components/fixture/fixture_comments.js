//FixtureComments.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CommentForm from './comment_form';

import CommentItem from './comment_item';

const FixtureComments = ({ fixtureId }) => {
  const gameId = fixtureId;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [gameId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/comment/${gameId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
        
      );

      const stats = response.data;
      setComments(stats);
    } catch (error) {
      console.error(error);
    }
  };
  
 // Function to update a comment in the state without making an API call
 const updateCommentInState = (commentId, updatedContent) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment._id === commentId) {
          return { ...comment, content: updatedContent };
        }
        return comment;
      });
    });
  };

  // Function to delete a comment from the state without making an API call
  const deleteCommentFromState = (commentId) => {
    setComments((prevComments) => {
      return prevComments.filter((comment) => comment._id !== commentId);
    });
  };

  const addCommentToLocalState = (newComment) => {
    // Add the new comment to the state locally
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <div>
        <CommentForm gameId={gameId} onAddComment={addCommentToLocalState}  />
      {comments.map((comment) => (
      
        <CommentItem
          userId={comment.userId}
          key={comment._id}
          comment={comment}
          gameId={gameId}
          onUpdate={updateCommentInState} // Pass the update function as a prop
          onDelete={deleteCommentFromState} // Pass the delete function as a prop
        />
      ))}
    </div>
  );
};

export default FixtureComments;