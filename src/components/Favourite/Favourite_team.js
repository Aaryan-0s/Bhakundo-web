import axios from "axios";
import React, { useState } from "react";

const Team = ({ team ,handleTabClick,onUpdate}) => {
  const [isLiked, setIsLiked] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLike = async (id) => {
    // Toggle the like state
    setIsLiked(!isLiked);

    try {
      // Call the addfavourite_team API endpoint to add/remove the team from favorites
      const apiUrl = `http://localhost:3001/api/v1/teams/unfavourite/${id}`;
      const token = localStorage.getItem("token");
      await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Team is successfully removed, close the confirmation modal
      setShowConfirmation(false)
      onUpdate()
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
          src={team.logoUrl}
          alt="Team Photo"
        />
        <p className="font-bold" onClick={() =>{ handleTabClick("TeamStat") 
                    localStorage.setItem("teamIdFromPointTable", team.teamId)}} >{team.teamName}</p>
      </div>
      <div className="flex items-center">
        {showConfirmation ? null : (
          <button
            className={`text-3xl focus:outline-none transition-colors duration-300 hover:text-red-500 ${
              isLiked ? "text-red-500" : "text-white"
            }`}
            onClick={handleConfirmation}
            data-testid="teams-hearts"
          >
            &#x2764;
          </button>
        )}
        {showConfirmation && (
          <div className="ml-4 flex items-center gap-2">
            <p>Are you sure?</p>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => handleLike(team.teamId)}
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

const FavouriteTeam = ({ team,handleTabClick,onUpdate }) => {
  return (
    <div className="flex flex-col gap-5 px-4 mt-4">
      {/* Favourite Teams */}
      {team.map((team) => (
        <Team key={team.teamId} team={team} handleTabClick={handleTabClick}  onUpdate={onUpdate}/>
      ))}
    </div>
  );
};

export default FavouriteTeam;
