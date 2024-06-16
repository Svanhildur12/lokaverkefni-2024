"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const GuestCounter = () => {
  const [count, setCount] = useState<number>(0);
  const { guests, setGuests } = useCart();

  useEffect(() => {
    setCount(guests);
  }, [guests]);

  const handleSubmit = () => {
    console.log(" number of guests:", count);
    setGuests(count);
  };

  return (
    <>
      <div className="text-center text-yellow-100 underline font-bold md:text-2xl mt-5 md:mt-14 lg:text-4xl">
        <p>Please select number of people</p>
      </div>
      <div className="flex justify-center text-4xl md:text-6xl m-5 gap-2 rounded-md">
        <button
          className=" text-green-500 font-bold text-3xl md:text-4xl"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
        <p className="flex justify-center  text-white">{count}</p>
        <button
          className="text-red-500 font-bold"
          onClick={() => setCount(count > 0 ? count - 1 : 0)}
        >
          -
        </button>
        <div>
          <button
            className="text-green-950 border-2 rounded-md p-1 bg-yellow-100 text-sm border-white flex justify-end mt-2 font-bold md:text-4xl"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default GuestCounter;
