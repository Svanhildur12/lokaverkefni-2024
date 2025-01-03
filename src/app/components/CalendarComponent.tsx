"use client";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useCart } from "../context/CartContext";

const Calendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { setDate } = useCart();
  const [numberOfMonths, setNumberOfMonths] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setNumberOfMonths(1);
      } else {
        setNumberOfMonths(2);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const Date = date.toISOString();
      console.log("date picked:", Date);
      setSelectedDate(date);
      setDate(date);
      console.log("stored date in context:", date);
    } else {
      setSelectedDate(undefined);
      setDate(null);
    }
  };

  return (
    <>
      <div className="lg:flex lg:justify-center md:mt-10 lg:mt-10">
        <p className="text-center m-5 ml-5 mr-5 border-8 border-double rounded-md underline font-bold text-xl bg-green-950 text-yellow-100 md:text-4xl lg:text-6xl lg:p-2">
          Please pick a date
        </p>
      </div>
      <div className="lg:flex lg:justify-center">
        <div className="flex justify-center border-8 border-double  text-yellow-100 m-5 bg-opacity-70 rounded-md md:text-2xl bg-green-950 lg:h-96 ">
          <DayPicker
            numberOfMonths={numberOfMonths}
            className="md:w-full md:flex md:justify-center lg:inline-f"
            mode="single"
            fromDate={today}
            onDayClick={handleDateSelect}
            selected={selectedDate}
          />
        </div>
      </div>
    </>
  );
};

export default Calendar;
