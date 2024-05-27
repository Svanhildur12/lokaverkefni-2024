"use client";
import React from "react";
import RandomDish from "./RandomDish";
import Header from "../components/Header";

const SelectDish = () => {
  return (
    <>
      <Header />
      {/* make the "dishes" in navbar highlighted! */}
      <div className="m-5 text-white text-center font-bold">
        <RandomDish />{" "}
        {/* Work on the design part here! image and ingredient-box */}
      </div>
    </>
  );
};

export default SelectDish;
