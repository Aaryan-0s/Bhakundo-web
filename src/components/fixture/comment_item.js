import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import LikeButton from './like_button';

const CommentItem = ({ userId,comment,gameId,onUpdate, onDelete}) => {
  console.log(comment)
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(comment.content);
  const {user,setUser}=useContext(UserContext);
  console.log(user.data[0]._id);
  console.log(comment.userId._id)
  


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    // Send updated content to the backend API
    axios.put(`http://localhost:3001/api/v1/comment/${gameId}/${comment._id}`, {
        content: updatedContent,
     },{headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        
      },})
      .then((response) => {
        setIsEditing(false);
        onUpdate(comment._id, updatedContent)
        // Optionally, update the comment object in the parent component's state
        // to reflect the changes immediately without requiring another API call.
      })
      .catch((error) => {
        console.error('Error updating comment:', error);
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedContent(comment.content);
  };

  const handleDelete = () => {
    // Send a DELETE request to the backend API to delete the comment
    handleDeleteComment(comment._id);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/comment/${gameId}/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          
        },
      });

      onDelete(comment._id);

    } catch (error) {
        console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="my-4 border rounded p-4">
      <div className="flex items-start">
      <img
         src={ comment.userId.image
          ? `http://localhost:3001/uploads/${comment.userId.image}`
          : "https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"} // Replace with the actual profile picture URL
          alt={`${comment.userId.username}`}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className="flex-1">
          <p className="text-white font-medium mb-1">
            {comment.userId.username} {/* Replace with the actual name */}
          </p>
      {isEditing ? (
        <>
          <textarea
            className="w-full border rounded p-2 mb-2 text-black"
            rows={3}
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 mr-2 rounded"
              onClick={handleUpdate}
            >
              Save
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-2 whitespace-normal break-words" data-testid="theme-sun-button">{comment.content}</p>
          <div className="flex items-center mb-2">
          <LikeButton commentId={comment._id} gameId={gameId} comment={comment} user={user}/>
            
            
            {user.data[0]._id === comment.userId._id && (
                <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded ml-2"
              onClick={handleDelete}
            >
              Delete
            </button>
            </div>)}
          </div>
          {/* <CommentForm gameId={comment.gameId} parentId={comment._id} />
          {comment.childComments.map((childComment) => (
            <CommentItem key={childComment._id} comment={childComment} />
          ))} */}
        </>
      )}
      </div>
      </div>
    </div>
  );
};

export default CommentItem;
