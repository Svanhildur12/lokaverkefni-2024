"use client";
import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { useReceipt } from "../context/ReceiptContext";

const TimeSelection = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);
  const { addTime } = useReceipt();

  const handleTimeChange = (time: string | null) => {
    if (time) {
      const [hours, minutes] = time.split(":").map(Number);
      console.log("add time;", time);
      if (hours < 16 || hours > 23 || (hours === 23 && minutes > 0)) {
        setTimeError("Please select time from 16:00 - 23:00");
        setSelectedTime(null);
      } else {
        setTimeError(null);
        setSelectedTime(time);
      }
    } else {
      setTimeError(null);
      setSelectedTime(null);
    }
  };

  return (
    <>
      <p className="flex justify-center text-white mt-10 ml-5 mr-5 underline font-bold text-xl bg-green-950">
        Pick a time
      </p>
      <div className="flex justify-center text-white ml-5 mr-5 underline font-bold text-xl bg-green-950">
        <TimePicker
          onChange={handleTimeChange}
          value={selectedTime}
          disableClock
          clockIcon={null}
          clearIcon={null}
          onSubmit={setSelectedTime}
          name="time"
        />
      </div>
      {timeError && (
        <p className="text-center text-white bg-red-500 ml-5 mr-5 mt-2">
          {timeError}
        </p>
      )}
    </>
  );
};

export default TimeSelection;
