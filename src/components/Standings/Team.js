import { BsArrowDown, BsArrowUp } from "react-icons/bs";

const Team = ({ handleTabClick, teamData }) => {
  const {
    rank,
    id,
    logo,
    name,
    played,
    win,
    draw,
    lose,
    goalsDiff,
    points,
    status,
  } = teamData;

  const getStatusIcon = () => {
    if (status === "up") {
      return <BsArrowUp className="text-green-500 text-xl" />;
    } else if (status === "down") {
      return <BsArrowDown className="text-red-500 text-xl" />;
    } else {
      return "-";
    }
  };

  return (
    <tr>
      <td className="px-6 py-2">{rank}</td>
      <td className="px-6 py-2 flex justify-center">{getStatusIcon()}</td>
      <td className="px-6 py-2">
        <div
          className="cursor-pointer flex items-center justify-center"
          onClick={
            ()=>{
              handleTabClick("TeamStat")
              localStorage.setItem("teamIdFromPointTable", id)

            }
          } 
        >
          <img src={logo} alt="Team Logo" className="w-12" />
          <p>{name}</p>
        </div>
      </td>
      <td className="px-6 py-2">{played}</td>
      <td className="px-6 py-2">{win}</td>
      <td className="px-6 py-2">{lose}</td>
      <td className="px-6 py-2">{draw}</td>
      <td className="px-6 py-2">{goalsDiff}</td>
      <td className="px-6 py-2">{points}</td>
    </tr>
  );
};

export default Team;
