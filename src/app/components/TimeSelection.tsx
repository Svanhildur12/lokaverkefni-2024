"use client";
import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { useCart } from "../context/CartContext";

const TimeSelection = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);
  const { setTime } = useCart();

  const handleTimeChange = (time: string | null) => {
    if (time) {
      const [hours, minutes] = time.split(":").map(Number);
      console.log("add time;", time);
      if (hours < 16 || hours > 23 || (hours === 23 && minutes > 0)) {
        setTimeError("Please select time from 16:00 - 23:00");
        setSelectedTime(null);
        setTime(null);
      } else {
        setTimeError(null);
        setSelectedTime(time);
        setTime(time);
      }
    } else {
      setTimeError(null);
      setSelectedTime(null);
      setTime(null);
    }
  };

  return (
    <>
      <div className="lg:flex lg:justify-center">
        <p className="flex justify-center md:flex md:justify-start text-yellow-100 border-solid border-white mx-24 md:mx-48 md:h-20 border-4 mt-10 md:text-2xl underline font-bold text-xl bg-green-950 md:pt-5 md:pl-20 lg:w-72 lg:text-left lg:pt-5 lg:pl-1">
          Pick a time
        </p>
      </div>
      <div className="lg:flex lg:justify-center ">
        <div className="flex justify-center md:ml-32 md:-mt-16 text-yellow-100 underline font-bold md:text-2xl text-xl lg:h-10 lg:pt-1">
          <TimePicker
            className="border-4"
            onChange={handleTimeChange}
            value={selectedTime}
            disableClock
            clockIcon={null}
            clearIcon={null}
            name="time"
          />
        </div>
      </div>
      {timeError && (
        <p className="text-center text-white bg-red-500 ml-5 mr-5 mt-2 md:text-2xl underline">
          {timeError}
        </p>
      )}
    </>
  );
};

export default TimeSelection;
