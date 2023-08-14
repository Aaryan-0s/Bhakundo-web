import axios from "axios";
import React, { useEffect, useState } from "react";

const League = () => {
  const [league,setLeague] = useState(null);
  const fetchLeagueData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/football/league`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const league = response.data;
      setLeague(league);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchLeagueData();
  }, []);

  
  if (league === null) {
    return <div>Loading...</div>;
  }



    return(
    <div className="flex items-center h-[60px] pl-[20px] text-[18px]">
    <div className="w-[20px] h-[20px]">
      <img
        src={league.logo}
        alt=""
        height={20}
        width={20}
      />
    </div>
    <a
      className="w-[100%] h-[100%] flex items-center ml-[20px] text-[12px] sm:text-[18px]"
      href="#"
    >
      <span className="text-white">
        {league.name}
      </span>
    </a>
  </div>);
};


export default League;