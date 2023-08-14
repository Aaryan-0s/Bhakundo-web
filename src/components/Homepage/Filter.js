import React from "react";
import { BsFilterLeft } from "react-icons/bs";

const Filter = ({ handleFilterClick, activeFilter }) => {
  return (
    <div className="flex flex-row bg-slate-600 h-16 py-4 items-center border-solid">
      <button onClick={() => handleFilterClick("all")} className="pl-4">
        <span
          className={`px-4 bg-slate-400 text-18 text-white rounded-full flex justify-center items-center h-full text-center ${
            activeFilter === "all" ? "bg-slate-500" : "hover:bg-slate-500"
          } transition-colors`}
        >
          All
        </span>
      </button>
      <button onClick={() => handleFilterClick("ongoing")} className="pl-4">
        <span
          className={`px-4 bg-slate-400 text-18 text-white rounded-full flex justify-center items-center h-full text-center ${
            activeFilter === "ongoing" ? "bg-slate-500" : "hover:bg-slate-500"
          } transition-colors`}
        >
          Ongoing
        </span>
      </button>
      <button onClick={() => handleFilterClick("finished")} className="pl-4">
        <span
          className={`px-4 bg-slate-400 text-18 text-white rounded-full flex justify-center items-center h-full text-center ${
            activeFilter === "finished" ? "bg-slate-500" : "hover:bg-slate-500"
          } transition-colors`}
        >
          Finished
        </span>
      </button>
      <div className="hidden sm:visible pl-4 flex items-center">
        <BsFilterLeft className="text-white hover:text-orange-400 transition-colors" size={20} />
        <input
          type="text"
          className="bg-white text-black rounded-full py-2 px-4 ml-2 outline-none w-48 sm:w-auto"
          placeholder="Filter"
        />
      </div>
    </div>
  );
};

export default Filter;
