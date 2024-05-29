"use client";
import React, { useEffect, useState } from "react";
import { useReceipt } from "../context/ReceiptContext";

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  const { addCount } = useReceipt();

  useEffect(() => {
    console.log("number of guests:", count);
    addCount(count);
  }, [count, addCount]);

  return (
    <>
      <div className="text-center text-white font-bold">
        <p>Please select number of people</p>
      </div>
      <div className="flex justify-center text-4xl m-5 gap-2 bg-black rounded-md ml-20 mr-20">
        <button
          className=" text-green-500 font-bold text-3xl"
          onClick={() => {
            setCount((s) => s + 1);
          }}
        >
          +
        </button>
        <p className="flex justify-center  text-white">{count}</p>
        <button
          className="text-red-500 font-bold"
          onClick={() => {
            setCount((s) => s - 1);
          }}
        >
          -
        </button>
      </div>
    </>
  );
};

export default Counter;
