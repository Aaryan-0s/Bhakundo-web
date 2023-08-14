const PLayerStats = ({ data }) => {
  const renderValue = (value) => {
    return value !== null ? value : 0;
  };

  return (
    <div className="bg-slate-800 text-white rounded-lg shadow-lg p-6 mt-4 flex-grow">
      <table className="w-full text-sm lg:text-base">
        <thead>
          <tr className="text-left">
            <th className="py-2 px-4">Statistic</th>
            <th className="py-2 px-4">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4">Appearances</td>
            <td className="py-2 px-4">{renderValue(data.games.appearences)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4">Minutes</td>
            <td className="py-2 px-4">{renderValue(data.games.minutes)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4">Goals Conceded</td>
            <td className="py-2 px-4">{renderValue(data.goals.total)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4">Saves</td>
            <td className="py-2 px-4">{renderValue(data.saves)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4">Passes</td>
            <td className="py-2 px-4">{renderValue(data.passes.total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PLayerStats;
