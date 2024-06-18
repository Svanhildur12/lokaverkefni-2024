"use client";
import React from "react";
import Header from "../components/Header";
import { CartProvider } from "../context/CartContext";
import ReceiptComponent from "../components/ReceiptComponent";

const ReceiptPage = () => {
  return (
    <>
      <CartProvider>
        <Header />
        <ReceiptComponent />
      </CartProvider>
    </>
  );
};

export default ReceiptPage;
