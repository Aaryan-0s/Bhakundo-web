import { useState } from "react";
import Favourite from "../components/Favourite/Favourite";
import HomepageBody from "../components/Homepage/HomepageBody";
import Players from "../components/Player/Players";
import TeamsBody from "../components/Standings/TeamsBody";
import TeamStat from "../components/TeamStats/TeamStat";
import NavigationBar from "../components/common/Navbar";
import DashboardBody from "../components/dashboard/DashboardBody";
import Fixture from "../components/fixture/fixture";
const MainPage = () => {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleProfileClick = () => {
    setActiveTab(""); // Reset active tab when closing the Profile
  };

  const tabConfig = {
    home: {
      body: <HomepageBody handleTabClick={handleTabClick} />,
    },
    dashboard: {
      body: <DashboardBody/>,
    },
    Teams: {
      body: <TeamsBody handleTabClick={handleTabClick} />,
    },
    Favourite:{
      body:<Favourite handleTabClick={handleTabClick}/>
    },
    TeamStat: {
      body: <TeamStat  handleTabClick={handleTabClick}/>,
    },
    Player:{
      body:<Players/>,
    },
    live:{
      body:<Fixture/>,
    },
    
  };

  const { body } = tabConfig[activeTab];

  return (
    <div className=" bg-slate-800  relative min-h-screen">
      <NavigationBar
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        handleProfileClick={handleProfileClick}
      />
      
      <div className="bg-gray-800   pt-[70px] lg:ml-[280px] lg:flex items-center justify-center pb-[50px] sm:pb-0">
       
        
            {body}
          
      
      </div>
    </div>
  );
};

export default MainPage;
