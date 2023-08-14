import axios from "axios";
import React, { useEffect, useState } from "react";

const Sidebar = ({ isOpen, handleTabClick }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/football/standings/teams",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const teamData = response.data.data;
        setTeams(teamData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchTeamsData();
  }, []);

  return (
    <div className={`fixed z-10 sm:h-full h-[calc(100vh-128px)] bg-white dark:bg-[#00171f] top-[4.5rem] lg:bg-[#00171f] w-[280px] lg:min-h-[100vh] flex flex-col justify-between py-5 overflow-y-scroll transform ease-in-out duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="flex flex-col gap-10">
        <div className="block px-8">
          <img alt="" className="w-44" />
        </div>

        <nav className="w-full px-4">
          <p className="text-white font-bold mb-2 block ml-4">
            Teams
          </p>

          {loading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
            </div>
          ) : (
            <ul className="flex flex-col gap-4 items-center justify-between px-6 py-4 border-t flex-col gap-2 items-start border-none p-0">
              {teams.map((team) => (
                <li
                  key={team.id}
                  onClick={() => {
                    localStorage.setItem("teamId", team.id);
                    handleTabClick("TeamStat");
                  }}
                  className={`cursor-pointer transition duration-200 ease-linear text-white flex items-center gap-3 w-full px-4 py-2.5 rounded-lg hover:bg-[#007ea7]`}
                >
                  <img
                    src={team.logo}
                    className="h-8"
                    alt={team.name}
                  />
                  <p className="font-semibold block">{team.name}</p>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
