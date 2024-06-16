"use client";
import React from "react";

const Header = () => {
  return (
    <div className="top-0 left-0 w-full z-[20]">
      <div className="sticky bg-green-950 max-w-screen md:h-32 md:pt-5 px-4 lg:px-6 text-yellow-100 border-b-4 border-yellow-100">
        <div className="flex justify-around gap-2 lg:gap-14 items-center h-20 ">
          <div className="flex flex-row">
            <img
              src="/images/lil-bits.svg"
              alt="logo"
              className="w-32 h-32 md:w-44 lg:w-52 "
            />
          </div>
          <p className="flex items-center text-sm md:text-2xl lg:text-4xl ">
            Dishes
          </p>
          <p className="flex items-center text-sm md:text-2xl lg:text-4xl">
            Drinks
          </p>
          <p className="flex items-center text-sm md:text-2xl lg:text-4xl">
            Order
          </p>
          <p className="flex items-center text-sm md:text-2xl lg:text-4xl">
            Receipt
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
