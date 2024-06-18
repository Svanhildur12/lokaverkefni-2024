"use client";
import React from "react";
import Header from "../components/Header";
import DrinkSelection from "./DrinkSelection";
import { CartProvider } from "../context/CartContext";

const SelectDrink = () => {
  return (
    <>
      <CartProvider>
        <Header />
        <div className=" text-white text-center font-bold md:flex md:justify-center lg:flex lg:justify-between lg:mx-96">
          <DrinkSelection />
        </div>
      </CartProvider>
    </>
  );
};

export default SelectDrink;
