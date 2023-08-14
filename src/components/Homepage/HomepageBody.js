import axios from "axios";
import { format, isSameDay } from "date-fns";
import React, { useEffect, useState } from "react";
import DateCal from "./DateCal";
import Filter from "./Filter";
import Games from "./Games";
import League from "./League";

const HomepageBody = ({ handleTabClick }) => {
  const formatDateApi = (date) => {
    return format(date, "yyyy-MM-dd");
  };

  const getYearFromApiFormat = (date) => {
    return new Date(date).getFullYear();
  };

  const [date, setDate] = useState(formatDateApi(new Date()));
  const [gamesData, setGamesData] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const handledate = (date) => {
    setDate(date);
  };

  useEffect(() => {
    // Function to check if the displayed date matches today's date
    const isTodayDate = () => {
      const today = new Date();
      return isSameDay(new Date(date), today);
    };

    // Fetch player data when the component mounts
    fetchGameData(date);

    // Set up the interval to fetch data every 20 seconds if there are ongoing games and the displayed date matches today's date
    const interval = setInterval(() => {
      if (filter === "ongoing" && isTodayDate()) {
        console.log("fetching data");
        fetchGameData(date);
      }
    }, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [date, filter]);

  const fetchGameData = async (date) => {
    try {
      setIsLoading(true); // Set loading state to true while fetching data
      const response = await axios.get(
        `http://localhost:3001/api/v1/football/game/${getYearFromApiFormat(date)}/${date}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const games = response.data.data;
      setGamesData(games);
      setIsLoading(false); // Set loading state to false when data is fetched
    } catch (error) {
      console.error(error);
      setIsLoading(false); // Set loading state to false on error as well
    }
  };

  const handleFilterClick = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filteredGames = () => {
    if (filter === "finished") {
      
      return gamesData.filter((game) => game.status === "90" || game.status === "ft");
    } else if (filter === "ongoing") {
      return gamesData.filter((game) => game.status !== "90" && game.status !== "ft");
    } else {
      return gamesData;
    }
  };

  return (
    <section className="bg-slate-800 block w-[100%] lg:w-[calc(100vw)] lg:absolute lg:top-[72px] lg:pl-[278px] lg:left-[2px] ">
      <DateCal handledate={handledate} />
      <hr />
      <Filter handleFilterClick={handleFilterClick} activeFilter={filter} />
      <hr />
      <League />
      {isLoading ? (
        // Render the loading indicator while data is being fetched
        <div className="text-white text-center mt-4">Loading...</div>
      ) : filteredGames().length > 0 ? (
        filteredGames().map((game) => (
        
          <Games key={game.fixtureId} handleTabClick={handleTabClick} game={game} date={date} year={getYearFromApiFormat(date)} />
        ))
      ) : (
        <div className="text-white text-center mt-4">No games today</div>
      )}
    </section>
  );
};

export default HomepageBody;
