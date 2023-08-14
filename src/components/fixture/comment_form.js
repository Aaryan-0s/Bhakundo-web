import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';

const CommentForm = ({ gameId,onAddComment}) => {
  const [content, setContent] = useState('');
  const {user,setUser}=useContext(UserContext);


  

//   const handleSubmit = () => {
//     console.log(content);
//     // const newComment = {
//     //   content: content,
//     // };

//     // Send a POST request to the backend API to create a new comment
//     // handleSubmitComment(content);
//   };

  const handleSubmitComment = async () => {
    try {
       await axios.post(
        `http://localhost:3001/api/v1/comment/${gameId}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            
          },
        }
      );
      const response=await axios.get(
        `http://localhost:3001/api/v1/comment/${gameId}`,
       
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            
          },
        }
      );
      console.log(response.data[0]._id)
      const newComment = {
        _id: response.data[0]._id, // Use a temporary ID until the actual ID is assigned by the backend
        content: content,
        userId: {
          _id: user.data[0]._id,
          username: user.data[0].username,
          image: user.data[0].image,
        }, // Use a temporary user ID or any value that represents the current user
        gameId: gameId,
        likes: [],
        likeCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      // Add the new comment to the state locally
      onAddComment(newComment);
  
      setContent('');
      
    } catch (error) {
      console.error("Failed to create comment",error);
    }
  };
 


  return (
    <div className="mb-4">
      <textarea
        className="w-full border rounded p-2 text-black"
        rows={3}
        
        placeholder="Write your comment here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        onClick={handleSubmitComment}
      >
        Post Comment
      </button>
    </div>
  );
};

export default CommentForm;
