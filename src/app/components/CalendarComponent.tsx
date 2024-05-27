"use client";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import TimeSelection from "./TimeSelection";

const Calendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);

  useEffect(() => {
    setSelectedDate(today);
  }, [today]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  return (
    <>
      <p className="text-center text-white m-5 ml-5 mr-5 underline font-bold text-xl bg-green-950">
        Please pick a date
      </p>
      <div className="flex justify-center text-white m-5 bg-green-950 rounded-md">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          fromDate={today}
          required
        />
      </div>
      {selectedDate && (
        <div>
          <TimeSelection />
        </div>
      )}
    </>
  );
};

export default Calendar;
