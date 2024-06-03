"use client";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useCart } from "../context/CartContext";

const Calendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { setDate } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      console.log("date picked:", date.toISOString().split("T")[0]);
      setSelectedDate(date);
      setDate(date);
    } else {
      setSelectedDate(undefined);
      setDate(null);
    }
  };

  if (!isClient) return null;

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
