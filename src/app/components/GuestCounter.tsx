"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const GuestCounter = () => {
  const [count, setCount] = useState<number>(0);
  const { setCount: setCartCount } = useCart();

  useEffect(() => {
    setCartCount(count);
  }, [count, setCartCount]);

  const handleSubmit = () => {
    console.log(" number of guests:", count);
  };

  return (
    <>
      <div className="text-center text-white font-bold">
        <p>Please select number of people</p>
      </div>
      <div className="flex justify-center text-4xl m-5 gap-2 bg-black rounded-md ml-20 mr-20">
        <button
          className=" text-green-500 font-bold text-3xl"
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
            className="text-white border-2 rounded-sm bg-green-950 text-sm border-white flex justify-end mt-2 font-bold"
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
