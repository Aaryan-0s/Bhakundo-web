import Graph from "./goalChart";

const Overview = ({ goalData }) => {
  return (
    <div className="bg-slate-800 text-white pt-8 px-4">
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full py-2 text-sm lg:text-base bg-slate-800 rounded-lg">
          <thead>
            <tr className="text-center bg-slate-700 h-32px">
              <th className="text-base lg:text-[15px] text-center"> </th>
              <th className="text-base lg:text-[15px] text-center">Home</th>
              <th className="text-base lg:text-[15px] text-center">Away</th>
              <th className="text-base lg:text-[15px] text-center">All</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center bg-slate-700 h-32px hover:bg-slate-600">
              <td className="text-start pl-4">Goals for</td>
              <td>{goalData.for.total.home}</td>
              <td>{goalData.for.total.away}</td>
              <td>{goalData.for.total.total}</td>
            </tr>
            <tr className="text-center bg-slate-700 h-32px hover:bg-slate-600">
              <td className="text-start pl-4">Goals against</td>
              <td>{goalData.against.total.home}</td>
              <td>{goalData.against.total.away}</td>
              <td>{goalData.against.total.total}</td>
            </tr>
          
          </tbody>
        </table>
      </div>
      <Graph goalData={goalData} />
    </div>
  );
};

export default Overview;
