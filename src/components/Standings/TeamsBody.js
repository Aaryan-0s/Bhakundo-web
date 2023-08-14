import axios from "axios";
import React, { useEffect, useState } from "react";
import Team from "./Team";

const TeamsBody = ({ handleTabClick }) => {
  const [teamData, setTeamData] = useState([]);
  const [leagueData, setLeagueData] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchTeamData = async () => {
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

        const data = response.data.data;
        setTeamData(data);

        // Assuming the league data is available in the response as leagueName and leagueLogo
        const leagueName = response.data.data[0].leagueNames;
        const leagueLogo = response.data.data[0].leagueLogo;
        setLeagueData({ name: leagueName, logo: leagueLogo });

        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false in case of an error
      }
    };
    fetchTeamData();
  }, []);

  return (
    <section className="bg-slate-800 flex flex-col gap-6 w-[100%] p-4 lg:w-[calc(100vw)] lg:absolute lg:top-[72px] lg:pl-[278px] lg:py-8 lg:left-8 lg:pr-12 ">
      <div className="bg-slate-600 rounded-xl p-4 text-white">
        {loading ? (
          // Show the loading spinner while data is being fetched
          <div className="flex justify-center items-center h-22">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500" />
          </div>
        ) : (
          // Show league logo and name once data is available
          <div className="relative flex">
            <div className="flex items-center gap-4">
              <img
                src={leagueData.logo}
                alt="League Logo"
                className="w-20 h-20 object-cover"
              />
              <div className="flex flex-col items-start">
                <p className="text-center text-lg font-semibold">
                  {leagueData.name}
                </p>
              </div>
            </div>
          </div>
        )}

        <div>
          <p className="text-center font-semibold text-xl">Points Table</p>
        </div>
      </div>

      {loading ? (
        // Show a loading state for the table
        <div className="bg-slate-600 rounded-xl text-white flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
        </div>
      ) : (
        // Show the table with team data once data is available
        <div className="bg-slate-600 rounded-xl text-white overflow-x-auto">
          <table className="w-full table-auto text-center">
            {/* Table Header */}
            <thead className="text-slate-300">
              <tr>
                <th className="px-6 py-2">#</th>
                <th className="px-6 py-2">Status</th>
                <th className="px-6 py-2">Team</th>
                <th className="px-6 py-2">GP</th>
                <th className="px-6 py-2">GW</th>
                <th className="px-6 py-2">GL</th>
                <th className="px-6 py-2">GD</th>
                <th className="px-6 py-2">Diff</th>
                <th className="px-6 py-2">PT</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {teamData.map((team,index) => (
                <Team
                  key={index}
                  teamData={team}
                  handleTabClick={handleTabClick}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default TeamsBody;
