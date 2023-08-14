import axios from "axios";
import React, { useEffect, useState } from "react";
import PLayerStats from "./PlayerStats";

const Players = () => {
 
  const [isLiked, setIsLiked] = useState(false);
  const playerId = localStorage.getItem("playerId");
  console.log("playerId",playerId)

  const [playerData, setPlayerData] = useState(null); // Initialize with null

  
  const [activeButton, setActiveButton] = useState("Stats");

  const handleButtonClick = (btnName) => {
    setActiveButton(btnName);
  };

  useEffect(() => {
    // Fetch player data when the component mounts
    fetchPlayerData();
    fetchFavouriePlayerData();
  }, []);

  const fetchPlayerData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/football/players/${playerId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const player = response.data.data[0];

      setPlayerData(player);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFavouriePlayerData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/players/favourites/player/${playerId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const favouritePlayer = response.data.data;
      if(favouritePlayer ){
        setIsLiked(true);
        console.log("favouritePlayer",favouritePlayer);
      }
      else{
        setIsLiked(false);
      }
      }catch (error) {
        console.error("not favourite player");
      }
    };

  // Check if playerData is available before rendering the component
  if (!playerData) {
    return <div>Loading...</div>; // Display a loading state while waiting for data
  }

  const playerStatsComponent =
    activeButton === "Stats" ? (
      <PLayerStats data={playerData.statistics[0]} />
    ) : null;

  const handleLike = async () => {
    setIsLiked(!isLiked); // Toggle the like state

    // If the player is being liked (added to favorites)
    if (!isLiked) {
      try {
        // Call the addfavourite_player API endpoint to add the player to favorites
        await axios.post(
          "http://localhost:3001/api/v1/players/favourites/player/add",
          {
            playerId: playerData.player.id,
            playerName: playerData.player.name,
            photoUrl: playerData.player.photo,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    }else {
      // If the player is being unliked (removed from favorites)
      try {
        // Call the removefavourite_player API endpoint to remove the player from favorites
        await axios.delete(
          `http://localhost:3001/api/v1/players/unfavourite/player/${playerData.player.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-slate-800 w-[100%] min-h-screen flex flex-col pt-4 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="bg-slate-600 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center">
            <img
              className="w-20 lg:w-20 h-20 rounded-full mr-4"
              src={playerData.player.photo}
              alt={playerData.player.name}
            />
            <div>
              <h2 className="text-2xl font-semibold">
                {playerData.player.name}
              </h2>
              <p>Height: {playerData.player.height}</p>
              <p>Nationality: {playerData.player.nationality}</p>
              <div className="flex items-center mt-4">
                <img
                  className="w-8 h-8 rounded-full mr-2"
                  src={playerData.statistics[0].team.logo}
                  alt={playerData.statistics[0].team.name}
                />
                <p>{playerData.statistics[0].team.name}</p>
              </div>
            </div>
            <button
              className={`ml-auto text-3xl focus:outline-none transition-colors duration-300 hover:text-red-500 ${
                isLiked ? "text-red-500" : "text-white"
              }`}
              onClick={handleLike}
            >
              &#x2764;
            </button>
          </div>
        </div>
      </div>
      <div className="rounded-lg text-white p-6 mt-4">
        <nav className="flex justify-between">
          <button
            onClick={() => handleButtonClick("Stats")}
            className={`px-4 py-2 rounded-lg hover:bg-[#007ea7] focus:outline-none`}
          >
            Stats
          </button>
        </nav>
      </div>
      {playerStatsComponent}
    </div>
  );
};

export default Players;
