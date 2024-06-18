"use client";
import React from "react";
import Header from "../components/Header";
import { CartProvider } from "../context/CartContext";
import Orders from "../components/Orders";

const ReceiptPage = () => {
  return (
    <>
      <CartProvider>
        <Header />
        <Orders />
      </CartProvider>
    </>
  );
};

export default ReceiptPage;
