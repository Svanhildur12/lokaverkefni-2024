"use client";
import React from "react";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-10">
      <div className="relative bg-green-950 backdrop-filter px-4  rounded-lg text-white mx-4 lg:mx-24  mt-4">
        <div className="flex flex-row gap-5 items-center">
          <div className="flex flex-row items-center gap-10">
            <img src="/images/lil-bits.svg" className="w-16 pt-1 pb-1" />
          </div>
          <p className="flex items-center text-sm">Dishes</p>
          <p className="flex items-center text-sm">Drinks</p>
          <p className="flex items-center text-sm">Order</p>
          <p className="flex items-center text-sm">Receipt</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
