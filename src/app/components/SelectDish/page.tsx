"use client";
import React from "react";
import Header from "../Header";
import RandomDish from "./RandomDishes";

const SelectDish = () => {
  return (
    <>
      <Header />
      {/* make the "dishes" in navbar highlighted! */}
      <div className="m-20 text-white text-center font-bold">
        <RandomDish />{" "}
        {/* Work on the design part here! image and ingredient-box */}
      </div>
      <div className="m-10 text-red-600">
        box that shows what dishes have been selected, how many and price +
        button to navigate to drinks
      </div>
    </>
  );
};

export default SelectDish;
