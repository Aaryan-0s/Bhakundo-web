import { addDays, format, subDays } from "date-fns"; // Import addDays, subDays, and format functions
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AiFillCaretDown } from "react-icons/ai";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";

const DateCal = ({handledate}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleTodayClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    handledate(formatDateApi(date));
 
  };

  const handleLeftArrowClick = () => {
    const newDate = subDays(selectedDate, 1);
    setSelectedDate(newDate);
    handledate(formatDateApi(newDate));
    
  };

  const handleRightArrowClick = () => {
    const newDate = addDays(selectedDate, 1);
    setSelectedDate(newDate);
    handledate(formatDateApi(newDate));
    
  };

  const formatDateApi = (date) => {
    return format(date, "yyyy-MM-dd");
  };


  // Function to format the date as "Today" or the actual date
  const formatDate = (date) => {
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    return format(date, "MMM d, yyyy");
  };

  return (
    <nav className="bg-slate-600 w-[100%] h-[80px] py-[25px] items-center">
      <div className="w-[100%] flex flex-row items-center justify-between">
        <a
          href="#"
          className="w-[30px] h-[30px] cursor-pointer pl-[1.3rem]"
          onClick={handleLeftArrowClick}
        >
          <BiChevronLeftCircle size={30} color="white" />
        </a>
        <div className="block relative">
          <button
            className="w-[100%] h-[100%] flex items-center"
            onClick={handleTodayClick}
          >
            <span className="flex items-center text-[21px] text-white hover:text-orange-500">
              {formatDate(selectedDate)}
            </span>
            <AiFillCaretDown className="hover:text-orange-400 text-white" size={30} />
          </button>
          {showCalendar && (
            <div className="absolute top-[2rem] left-[2rem] transform translate-y-[0%] -translate-x-[45%] sm:-translate-x-1/2">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                className="bg-blue-500 rounded border border-gray-300 shadow sm:p-2 p-[2.5rem]"
              />
            </div>
          )}
        </div>
        <a
          href="#"
          className="w-[30px] h-[30px] cursor-pointer pr-[3.3rem] "
          onClick={handleRightArrowClick}
        >
          <span className="hover:text-orange-500">
            <BiChevronRightCircle size={25} color="white" />
          </span>
        </a>
      </div>
    </nav>
  );
};

export default DateCal;
