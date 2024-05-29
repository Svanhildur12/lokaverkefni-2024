"use client";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReceipt } from "../context/ReceiptContext";

const Calendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const { addDate } = useReceipt();

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      console.log("date picked:", date);
      setSelectedDate(date);
      addDate(date);
    }
  };

  return (
    <>
      <p className="text-center text-white m-5 ml-5 mr-5 underline font-bold text-xl bg-green-950">
        Please pick a date
      </p>
      <div className="flex justify-center text-white m-5 bg-green-950 rounded-md">
        <DayPicker
          mode="single"
          fromDate={today}
          onDayClick={handleDateSelect}
          selected={selectedDate}
          required
        />
      </div>
    </>
  );
};

export default Calendar;
