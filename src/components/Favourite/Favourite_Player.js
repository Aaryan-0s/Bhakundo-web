import axios from "axios";
import React, { useState } from "react";

const Player = ({ player,handleTabClick,onUpdate }) => {
  const [isLiked, setIsLiked] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLike = async (id) => {
    // Toggle the like state
    setIsLiked(!isLiked);

    try {
      // Call the addfavourite_player API endpoint to add/remove the player from favorites
      const apiUrl = `http://localhost:3001/api/v1/players/unfavourite/player/${id}`;
      const token = localStorage.getItem("token");
      await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setShowConfirmation(false)
      
      onUpdate()// Player is successfully removed, close the confirmation modal
      
     
      
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div
      className="bg-slate-700 text-white rounded-lg shadow-lg border p-4 flex items-center justify-between hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full mr-4"
          src={player.photoUrl}
          alt="Player Photo"
        />
        <p className="font-bold" onClick={() =>{  handleTabClick("Player")
                    localStorage.setItem("playerId", player.playerId)}}>{player.playerName}</p>
      </div>
      <div className="flex items-center">
        {showConfirmation ? null : (
          <button
            className={`text-3xl focus:outline-none transition-colors duration-300 hover:text-red-500 ${
              isLiked ? "text-red-500" : "text-white"
            }`}
            onClick={handleConfirmation}
            data-testid="teams-starts"
          >
            &#x2764;
          </button>
        )}
        {showConfirmation && (
          <div className="ml-4 flex items-center gap-2">
            <p>Are you sure?</p>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => handleLike(player.playerId)}
            >
              Yes
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={handleCancel}
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const FavouritePlayer = ({ player,handleTabClick,onUpdate}) => {
  return (
    <div className="flex flex-col gap-5 px-4 mt-4">
      {/* Favourite Players */}
      {player.map((player) => (
        <Player key={player.playerId} player={player} handleTabClick={handleTabClick} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default FavouritePlayer;
