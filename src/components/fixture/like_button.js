import axios from 'axios';
import React, { useState } from 'react';


const LikeButton = ({ commentId, gameId,user,comment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
 
  
  useState(() => {
    if(comment.likes.includes(user.data[0]._id)){
      setIsLiked(true);
    }



  },[]);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/v1/comment/${gameId}/${commentId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsLiked(!isLiked);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error("Failed to like comment", error);
    }
  };

  return (
    <div>
      <button
        className={`bg-${isLiked ? "green" : "gray"}-500 hover:bg-${isLiked ? "green" : "gray"}-600 text-white py-1 px-2 rounded`}
        onClick={handleLike}
      >
        
        {isLiked ? "Unlike" : "Like"}
        <span className="ml-1">{likeCount}</span>
      </button>
      
    </div>
  );
};
export default LikeButton;