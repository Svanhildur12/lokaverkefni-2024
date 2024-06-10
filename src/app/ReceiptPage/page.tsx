"use client";
import React from "react";
import Header from "../components/Header";
import CartComponent from "../components/CartComponent";
import { CartProvider } from "../context/CartContext";
import Orders from "../components/Orders";

const ReceiptPage = () => {
  return (
    <>
      <CartProvider>
        <Header />
        {/* make the "Receipt" in navbar highlighted! */}
        <CartComponent />
        {/*  <Orders /> */}
      </CartProvider>
    </>
  );
};

export default ReceiptPage;
