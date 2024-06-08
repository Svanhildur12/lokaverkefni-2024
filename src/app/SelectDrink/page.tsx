"use client";
import React from "react";
import Header from "../components/Header";
import DrinkSelection from "./DrinkSelection";

const SelectDrink = () => {
  return (
    <>
      <Header />
      {/* make the "drink" in navbar highlighted! */}
      <div className=" text-white text-center font-bold md:flex md:justify-center lg:flex lg:justify-between lg:mx-96">
        <DrinkSelection />
      </div>
    </>
  );
};

export default SelectDrink;
