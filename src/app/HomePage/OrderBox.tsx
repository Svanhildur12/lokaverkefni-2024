"use client";
import React from "react";
import { useRouter } from "next/navigation";

const OrderBox = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-center">
        <div className="border-4 border-double border-green-950 rounded-md ml-10 mr-10 w-96 h-20 bg-green-900 bg-opacity-35">
          <p className="flex justify-center text-white">Pick your meal here!</p>
          <form className="flex justify-center mt-2">
            <button
              onClick={() => router.push("/SelectDish")}
              className="border-2 border-solid rounded-md pl-2 pr-2 bg-white border-white text-green-900"
              type="button"
            >
              Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrderBox;
