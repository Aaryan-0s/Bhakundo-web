import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import Overview from "./Overview";
import TeamPlayers from "./TeamPlayers";

const TeamStat = ({ handleTabClick }) => {
  const [activeButton, setActiveButton] = useState("Players");
  const [isLiked, setIsLiked] = useState(false);
  const [teamData, setTeamData] = useState({});
  const [goalData, setGoalData] = useState(null); // New state to store goal data
  const teamIdFromPointTable = localStorage.getItem("teamIdFromPointTable");
  console.log(teamIdFromPointTable)

  const handleButtonClick = (btnName) => {
    setActiveButton(btnName);
  };

  useEffect(() => {
    // Fetch team standing data when the component mounts
    fetchTeamStandingData();
    fetchGoalData(); 
    fetchFavourieTeamData();// Fetch goal data from the API
  }, []);

  const fetchTeamStandingData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/football/standings/teams/${teamIdFromPointTable}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data.data[0];
      

      setTeamData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGoalData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/football/${teamIdFromPointTable}/stats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const goalData = response.data.data[0];
      setGoalData(goalData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFavourieTeamData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/teams/favourites/${teamIdFromPointTable}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const favouriteTeam = response.data.data;
      if(favouriteTeam ){
        setIsLiked(true);
        console.log("favouriteTeam",favouriteTeam);
      }
      else{
        setIsLiked(false);
      }
      }catch (error) {
        console.error("not favourite team");
      }
    };

  const getStatusIcon = () => {
    if (teamData.status === "up") {
      return <BsArrowUp className="text-green-500 text-xl" />;
    } else if (teamData.status === "down") {
      return <BsArrowDown className="text-red-500 text-xl" />;
    } else {
      return "-";
    }
  };

  const handleLike = async () => {
    setIsLiked(!isLiked); // Toggle the like state

    // If the team is being liked (added to favorites)
    if (!isLiked) {
      try {
        // Call the addfavourite_team API endpoint to add the team to favorites
        await axios.post(
          "http://localhost:3001/api/v1/teams/favourites/add",
          {
           teamId:teamData.id,
           teamName:teamData.name,
            logoUrl:teamData.logo,
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
          `http://localhost:3001/api/v1/teams/unfavourite/${teamIdFromPointTable}`,
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

  const GameComponent =
    activeButton === "Players" ? (
      <TeamPlayers handleTabClick={handleTabClick} />
    ) : activeButton === "Overview" ? (
      <Overview goalData={goalData} />
    ) : null;
  return(
   
    
    <section className="block bg-black w-full lg:w-[calc(100vw)] lg:absolute lg:top-[72px] lg:pl-[278px] lg:left-[2px]">
     
        <div className="pl-[12px] pr-[12px] overflow-hidden w-[100%] bg-slate-400">
          <div className="w-[100%] ml-auto mr-auto justify-between items-center flex ">
            <div className="min-h-[80px] w-[100%] flex-grow-[1] flex-shrink-[1] max-w-[615px] pb-[8px] pt-[8px] justify-start items-center flex">
              <img
                className="h-[72px] w-[72px] max-w-none m-0 realtive " alt=""
                src={teamData.logo}
              />
              <div className="pl-[12px] relative ">
                <h1 className="items-start flex text-[16px] font-[400] ">
                  {teamData.name}
                </h1>
              </div>
            </div>
            <div className="flex text-center mt-[8px]  text-white mt-1 justify-self-auto">
             <p>#{teamData.rank}</p>
             <p>{getStatusIcon()}</p>
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
        <div className="sticky top-[44px] ">
        <nav className="bg-slate-600 block">
          <ul className="max-w-[1400px] realtive items-center flex justify-evenly">
            <li
              className={`items-center inline-flex relative w-[33.33%] text-white hover:text-white hover:bg-slate-400 ${
                activeButton === "Overview" ? "bg-black text-white dark:bg-dark-slate" : ""
              }`}
            >
              <button
                onClick={() => handleButtonClick("Overview")}
                className="h-[44px] pl-[8px] pr-[8px] flex items-center justify-center text-[14px] font-[500] w-[100%]"
              >
                <span className="text-white">Overview</span>
              </button>
            </li>
           
            <li
              className={`items-center inline-flex relative w-[33.33%] text-white hover:text-white hover:bg-slate-400 ${
                activeButton === "Players" ? "bg-black text-white dark:bg-dark-slate" : ""
              }`}
            >
              <button
                onClick={() => handleButtonClick("Players")}
                className="h-[44px] pl-[8px] pr-[8px] flex items-center justify-center text-[14px] font-[500] w-[100%]"
              >
                <span className="text-white">Players</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
        {GameComponent}
      </section>
      
  );
};

export default TeamStat;

