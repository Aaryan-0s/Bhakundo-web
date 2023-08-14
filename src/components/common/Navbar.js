import { Transition } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import Sidebar from "../common/SideNaveBar";

const logo = require("../../assets/images/bhakundo.png");

const NavigationBar = ({ activeTab, handleTabClick }) => {
  const { user } = useContext(UserContext);
 
  const[username,setUsername]=useState("")
  const [image,setImage]=useState("")
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };



  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleProfile = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick = () => {
    if (activeItem === "Profile") {
      setIsOpen(false);
      setActiveItem(""); // Reset active item when closing the Profile
    } else {
      toggleProfile();
      setActiveItem("Profile"); // Set active item to 'Profile' when the Profile button is clicked
    }
  };

  const handleLogout = () => {
    // Clear the user authentication token from local storage
    localStorage.removeItem("token");

    // Navigate the user to the login page
    window.location.href = "/signin";
  };

  const renderNavbarItems = () => {
    if (isMobile) {
      return (
        <div className="fixed z-20 bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-between">
          <button
            className={`block flex-1 text-center py-4 px-4 transition-colors duration-300 ease-linear ${
              activeItem === "Home" ? "relative" : ""
            } hover:bg-gray-700 hover:text-white`}
            onClick={() => handleTabClick("home")}
          >
            Home
            {activeItem === "Home" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500"></div>
            )}
          </button>
          <button
            className={`block flex-1 text-center py-2 px-4 transition-colors duration-300 ease-linear ${
              activeItem === "Favourite" ? "relative" : ""
            } hover:bg-gray-700 hover:text-white`}
            onClick={()=>handleTabClick("Favourite")}
          >
            Favourite
            {activeItem === "Favourite" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500"></div>
            )}
          </button>
          <button
            to="/Teams"
            className={`block flex-1 text-center py-2 px-4 transition-colors duration-300 ease-linear ${
              activeItem === "Teams" ? "relative" : ""
            } hover:bg-gray-700 hover:text-white`}
            onClick={() => handleTabClick("Teams")}
            

          >
            Teams
            {activeItem === "Teams" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500"></div>
            )}
          </button>
        </div>
      );
    }
    return (
      <ul className="flex space-x-4">
        <li>
          <button
            className={`block py-2 px-4 ${
              activeItem === "Home" ? "relative" : ""
            } hover:bg-gray-700 hover:text-white`}
            onClick={() => handleTabClick("home")}
          >
            Home
            {activeItem === "Home" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500"></div>
            )}
          </button>
        </li>
        <li>
          <button
            href="#"
            className={`block py-2 px-4 ${
              activeItem === "Favourite" ? "relative" : ""
            } hover:bg-gray-700 hover:text-white`}
            onClick={()=>handleTabClick("Favourite")}
            data-testid="Favourite-main-nav-link"
            

          >
            Favourite
            {activeItem === "Favourite" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500"></div>
            )}
          </button>
        </li>
        <li>
          <button
            href="#"
            className={`block py-2 px-4 ${
              activeItem === "Teams" ? "relative" : ""
            } hover:bg-gray-700 hover:text-white`}
            onClick={() => handleTabClick("Teams")}
            data-testid="teams-main-nav-link"
          >
            Teams
            {activeItem === "Teams" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500"></div>
            )}
          </button>
        </li>
      </ul>
    );
  };

  return (
    <div>
      <nav className="fixed min-w-full bg-gray-900 text-white z-10">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <button
            className="lg:hidden text-white focus:outline-none  px-4 lg:absolute lg:left-0"
            onClick={toggleSidebar}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <a href="#" className="flex items-center space-x-2 lg:ml-10">
            <img src={logo} className="h-8" alt="Bhakundo Logo" />
          </a>

          <div className="flex items-center justify-center flex-1">
            {renderNavbarItems()}
          </div>
          <div>
            <button
              id="ProfileNavbarLink"
              className={`flex rounded-lg items-center justify-between py-2 px-4 ${
                activeItem === "Profile" ? "active-item" : ""
              } hover:bg-gray-700 hover:text-white`}
              onClick={handleProfileClick}
            >
              <p className="block px-4 font-medium truncate max-w-[200px]">
                {user.data[0].username}
              </p>
              <img
                src={ user?.data[0].image
                  ? `http://localhost:3001/uploads/${user?.data[0].image}`
                  : "https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"}
                alt=""
                className="w-[23px] h-[23px] rounded-full object-fill"
              />
            </button>

            {/* Profile menu */}
            <Transition
              show={activeItem === "Profile"}
              enter="transition duration-200 ease-out"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition duration-150 ease-in"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div className="absolute right-0 z-50 mt-2 w-44 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-400"
                  aria-labelledby="ProfileNavbarLink"
                >
                  <li>
                    <button
                      className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        handleTabClick("dashboard");
                        setActiveItem(""); // Reset active item when closing the Profile
                      }}
                    >
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button

                      className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </button>
                  </li>
                </ul>
                <div className="py-1">
                  <button
                    className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  onClick={handleLogout}>
                    Sign out
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} handleTabClick={handleTabClick} />
    </div>
  );
};

export default NavigationBar;
