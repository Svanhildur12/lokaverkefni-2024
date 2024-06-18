"use client";
import React from "react";
import RandomDish from "./RandomDish";
import Header from "../components/Header";
import { CartProvider } from "../context/CartContext";

const SelectDish = () => {
  return (
    <>
      <CartProvider>
        <Header />
        <div className="m-5 text-white text-center font-bold">
          <RandomDish />{" "}
        </div>
      </CartProvider>
    </>
  );
};

export default SelectDish;
