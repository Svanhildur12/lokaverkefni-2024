"use client";
import React from "react";
import Header from "../components/Header";
import DrinkSelection from "./DrinkSelection";

const SelectDrink = () => {
  return (
    <>
      <Header />
      {/* make the "drink" in navbar highlighted! */}
      <div className="m-5 text-white text-center font-bold">
        <DrinkSelection />
      </div>
    </>
  );
};

export default SelectDrink;
