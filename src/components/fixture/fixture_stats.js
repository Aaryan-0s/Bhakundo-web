const FixtureStats = ({statsData}) => {
    return (
        <div className="py-6 px-4 text-sm sm:text-base">
            <h1 className="text-center text-base font-semibold mb-4 sm:text-[17px]">
              Match Statistics
            </h1>

            <div className="flex">
            <div
              className="bg-slate-900 rounded-l-lg py-2 text-center"
              style={{ flex: `${statsData[0].ballPossession}` }}
            >
            {statsData[0].ballPossession}
            </div>
            <div
              className="bg-slate-700 rounded-r-lg py-2 text-center"
              style={{ flex: `${statsData[1].ballPossession}` }}
            >
              {statsData[1].ballPossession}
            </div>
          </div>

          <div className="p-4 flex flex-col gap-4 text-sm sm:text-base">
            <div className="flex justify-between">
              <div className="bg-slate-900 rounded-full w-10 h-10 font-medium flex items-center justify-center">
                {statsData[0].shotsOnGoal}
              </div>
              <div className="font-semibold">Shots On Goal</div>
              <div className="bg-slate-700 rounded-full w-10 h-10 font-medium flex items-center justify-center ">
                {statsData[1].shotsOnGoal}
              </div>
            </div>

            <div className="flex justify-between">
              <div className="bg-slate-900 rounded-full w-10 h-10 font-medium flex items-center justify-center">
                {statsData[0].shotsOffGoal}
              </div>
              <div className="font-semibold">Shots off goal</div>
              <div className="bg-slate-700 rounded-full w-10 h-10 font-medium flex items-center justify-center ">
                {statsData[1].shotsOffGoal}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="bg-slate-900 rounded-full w-10 h-10 font-medium flex items-center justify-center">
                {statsData[0].blockedShots}
              </div>
              <div className="font-semibold">Blocked shots </div>
              <div className="bg-slate-700 rounded-full w-10 h-10 font-medium flex items-center justify-center ">
                {statsData[1].blockedShots}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="bg-slate-900 rounded-full w-10 h-10 font-medium flex items-center justify-center">
                {statsData[0].shotsInsideBox}
              </div>
              <div className="font-semibold">Shots inside the box</div>
              <div className="bg-slate-700 rounded-full w-10 h-10 font-medium flex items-center justify-center ">
                {statsData[1].shotsInsideBox}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="bg-slate-900 rounded-full w-10 h-10 font-medium flex items-center justify-center">
                {statsData[0].shotsOutsideBox}
              </div>
              <div className="font-semibold">Shot outside the box </div>
              <div className="bg-slate-700 rounded-full w-10 h-10 font-medium flex items-center justify-center ">
                {statsData[1].shotsOutsideBox}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="bg-slate-900 rounded-full w-10 h-10 font-medium flex items-center justify-center">
                {statsData[0].totalShots}
              </div>
              <div className="font-semibold">Total Shots</div>
              <div className="bg-slate-700 rounded-full w-10 h-10 font-medium flex items-center justify-center ">
                {statsData[1].totalShots}
              </div>
            </div>
            
          </div>
          </div>

    );
}

export default FixtureStats;