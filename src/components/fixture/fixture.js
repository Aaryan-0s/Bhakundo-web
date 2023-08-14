import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiCalendar, BiFootball } from "react-icons/bi";
import { BsArrowLeftCircle } from "react-icons/bs";
import FixtureComments from "./fixture_comments";
import FixtureStats from "./fixture_stats";

const Fixture = () => {
  const fixture = JSON.parse(localStorage.getItem("fixture"));
  const year = localStorage.getItem("year");
  const date1 = localStorage.getItem("date");
  const [p, setP] = useState(0);
  const [statsData, setStatsData] = useState(null);
  const [gamesData, setGamesData] = useState(null);
  const [activeTab, setActiveTab] = useState("stats");
  const date = date1.split("-").reverse().join("-");

  useEffect(() => {
    fetchStatsData();
    fetchGameData();

    const interval = setInterval(() => {
      
      if (fixture.status !== "90" && fixture.status !== "ft") {
        console.log("fetching data");
        fetchGameData();
        fetchStatsData();
      }
    }, 20000);
    return () => clearInterval(interval);
  }, [fixture.status]);

  const fetchStatsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/football/stats/${fixture.fixtureId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const stats = response.data.data;
      setStatsData(stats);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGameData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/football/game/${fixture.fixtureId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const game = response.data.data;
      setGamesData(game);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (statsData === null || gamesData === null) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-slate-800 flex flex-col gap-6 w-[100%] p-4 lg:w-[calc(100vw)] lg:absolute lg:top-[72px] lg:pl-[278px] lg:py-8 lg:left-8 lg:pr-12 ">
      <div className="bg-slate-600 rounded-xl text-white">
        <div className="relative flex justify-center p-4 border-b border-slate-800">
          <div className="absolute left-4 flex gap-4">
            <BsArrowLeftCircle
              className="cursor-pointer text-white text-2xl"
              onClick={() => {
                window.history.back();
              }}
            />
            <p className="hidden md:block">Matches</p>
          </div>

          <div>
            <p>{p}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-10 py-10 md:border-b border-slate-800">
          <div className="flex flex-col items-center gap-1 md:gap-2 md:flex-row">
            <img src={gamesData[0].homeTeamLogo} alt="team1" className="w-14" />
            <p className="font-semibold">{gamesData[0].homeTeam}</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-2xl font-semibold">{gamesData[0].score}</p>
            <p className="text-sm">{gamesData[0].status}</p>
          </div>

          <div className="flex flex-col items-center gap-1 md:gap-2 md:flex-row">
            <img src={gamesData[0].awayTeamLogo} alt="team2" className="w-14" />
            <p className="font-semibold">{gamesData[0].awayTeam}</p>
          </div>
        </div>

        <div className="hidden md:flex justify-center items-center gap-8 py-4">
          <div className="flex items-center gap-2">
            <BiCalendar className="text-white text-lg" />
            <p>{date}</p>
          </div>

          <div className="flex items-center gap-2">
            <BiFootball className="text-white text-lg" />
            <p>Eden Park</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-600 rounded-xl text-white">
        <div className="relative grid grid-cols-2 font-medium border-b border-slate-800">
          <div
            className={`cursor-pointer bg-slate-400 py-3 text-black rounded-tl-xl text-center border-r-[3px] border-r-black ${
              activeTab === "stats" ? "bg-slate-400" : "bg-slate-600"
            }`}
            onClick={() => handleTabChange("stats")}
          >
            Statistics
          </div>

          <div
            className={`cursor-pointer bg-slate-200 py-3 text-black rounded-tr-xl text-center transition-colors duration-300 hover:bg-slate-400 ${
              activeTab === "comments" ? "bg-slate-400" : "bg-slate-600"
            }`}
            onClick={() => handleTabChange("comments")}
          >
            Comments
          </div>
        </div>

        {activeTab === "stats" ? (
          statsData.length === 0 ? (
            <div className="p-4 text-center text-white">No data available.</div>
          ) : (
            <FixtureStats statsData={statsData} />
          )
        ) : (
          <FixtureComments fixtureId={fixture.fixtureId} />
        )}
      </div>
    </section>
  );
};

export default Fixture;
