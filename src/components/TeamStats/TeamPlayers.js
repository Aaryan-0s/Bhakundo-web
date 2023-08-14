import axios from "axios";
import React, { useEffect, useState } from "react";

const TeamPlayers = ({ handleTabClick }) => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Fetch team players' data when the component mounts
    fetchTeamPlayersData();
  }, []);

  const fetchTeamPlayersData = async () => {
    const teamIdFromPointTable = localStorage.getItem("teamIdFromPointTable");

    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/football/${teamIdFromPointTable}/players`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const playersData = response.data.data;
      setPlayers(playersData);
      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error(error);
      setIsLoading(false); // Set loading to false in case of error as well
    }
  };

  return (
    <div className="bg-slate-800 relative min-h-screen">
      <div className="py-10">
        <div className="container mx-auto px-4">
          {isLoading ? (
            // Show loading circle while waiting for the API response
            <div className="flex justify-center items-center h-96">
              <div className="w-12 h-12 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            // Render the player list after data is fetched
            <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {players.map((playerData) => {
                const { player, statistics } = playerData;
                return (
                  <li
                    key={player.id}
                    className="bg-slate-600 text-white rounded-lg shadow-lg p-6 transition-colors duration-300 hover:bg-slate-500 cursor-pointer flex flex-col items-center"
                    onClick={() =>{ handleTabClick("Player") 
                    localStorage.setItem("playerId", player.id)}}
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                      <img
                        className="w-full h-full object-cover"
                        src={player.photo}
                        alt={player.name}
                      />
                    </div>
                    <h2 className="text-xl font-semibold mb-1">{player.name}</h2>
                    <div className="flex items-center mb-4">
                      <p className="mr-2">Age: {player.age}</p>
                      <p className="mr-2">Weight: {player.weight}</p>
                      <p>Nationality: {player.nationality}</p>
                    </div>
                    <p className="text-gray-600">Height: {player.height}</p>
                    <p className="text-gray-600">Position: {statistics[0]?.games?.position}</p>
                    <p className="text-gray-600">Rating: {statistics[0]?.games?.rating}</p>
                    {/* Add more player statistics as needed */}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamPlayers;
