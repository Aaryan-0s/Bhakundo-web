import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import FavouritePlayer from "./Favourite_Player";
import FavouriteTeam from "./Favourite_team";

const Favourite = ({handleTabClick}) => {
  const [activeTab, setActiveTab] = useState("players");
  const [player, setPlayer] = useState([]);
  const [team, setTeam] = useState([]);
 

  const handleTabClickFav = (tab) => {
    setActiveTab(tab);
  };
  
 

  const fetchFavouriePlayerData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/players/favourites/player`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const favouritePlayer = response.data.data;
      
      setPlayer(favouritePlayer);
      
    } catch (error) {
      console.error("not favourite player");
    }
  };


  const fetchFavourieTeamData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/teams/favourites`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const favouriteTeam = response.data.data;
      
      setTeam(favouriteTeam);
      
    } catch (error) {
      console.error("not favourite player");
    }
  };

  useEffect(() => {
    fetchFavouriePlayerData();
    fetchFavourieTeamData();
  }, []);
 

  

  return (
    <div className="bg-slate-800 w-full min-h-screen flex flex-col">
      <div className="rounded-lg shadow-lg border m-4">
        <nav className="flex w-full">
          <div
            className={`cursor-pointer w-1/2 flex p-4 items-center justify-center border-r rounded-l-lg ${
              activeTab === "players" ? "bg-slate-500" : "hover:bg-slate-500"
            } transition-colors duration-300`}
            onClick={() => handleTabClickFav("players")}
          >
            <FaHeart className="mr-2 text-slate-300" />
            <p className="font-bold text-slate-300">Players</p>
          </div>

          <div
            className={`cursor-pointer w-1/2 flex p-4 items-center justify-center rounded-r-lg ${
              activeTab === "teams" ? "bg-slate-500" : "hover:bg-slate-500"
            } transition-colors duration-300`}
            onClick={() => handleTabClickFav("teams")}
          >
            <FaStar className="mr-2 text-slate-300" />
            <p className="font-bold text-slate-300">Team</p>
          </div>
        </nav>
      </div>

      {activeTab === "teams" && <FavouriteTeam  team={team}  handleTabClick={handleTabClick} onUpdate={fetchFavourieTeamData}/>}

      {activeTab === "players" && <FavouritePlayer player={player} handleTabClick={handleTabClick} onUpdate={fetchFavouriePlayerData} />}
    </div>
  );
};

export default Favourite;
