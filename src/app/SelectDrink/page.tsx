"use client";
import React from "react";
import Header from "../components/Header";
import DrinkSelection from "./DrinkSelection";

const SelectDrink = () => {
  return (
    <>
      <Header />
      {/* make the "dishes" in navbar highlighted! */}
      <div className="m-20 text-white text-center font-bold">
        <DrinkSelection />
      </div>
    </>
  );
};

export default SelectDrink;
