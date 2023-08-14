import React, { useState } from "react";

const Games = ({ handleTabClick, game, date, year }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div className={`h-[100px] flex justify-center mb-5`}>
      <div
        className={`bg-gray-700 hover:bg-gray-600 rounded-lg w-[95%] shadow-lg p-6 transition-all ${
          isHovered ? "hover:shadow-xl" : ""
        }`}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <div
          className="flex items-center justify-between"
          onClick={() => {
            handleTabClick("live");
            localStorage.setItem("fixture", JSON.stringify(game));
            localStorage.setItem("year", year);
            localStorage.setItem("date", date);
          }}
        >
          <div className="sm:flex items-center mr-4">
            <img
              className="w-12 h-12 rounded-full mr-2"
              src={game.homeTeamLogo}
              alt={game.homeTeam}
            />
            <span className="text-gray-200">{game.homeTeam}</span>
          </div>
          <div className="flex items-center">
            <span className="text-3xl font-semibold mr-4 text-white">
              {game.score.split(" - ")[0]}
            </span>
            <span className="text-gray-200">
              {game.status === "90" ? "FT" : game.status}
            </span>
            <span className="text-3xl font-semibold ml-4 text-white">
              {game.score.split(" - ")[1]}
            </span>
          </div>
          <div className="sm:flex items-center ml-4">
            <img
              className="w-12 h-12 rounded-full mr-2"
              src={game.awayTeamLogo}
              alt={game.awayTeam}
            />
            <span className="text-gray-200">{game.awayTeam}</span>
          </div>
        </div>
        {isHovered && <div className="mt-4"></div>}
      </div>
    </div>
  );
};

export default Games;
