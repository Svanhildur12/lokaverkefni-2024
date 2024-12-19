"use client";
import React from "react";
import Header from "../components/Header";
import { CartProvider } from "../context/CartContext";
import CustomerBox from "./CustomerBox";

const CustomerPage = () => {
  return (
    <>
      <CartProvider>
        <Header />
        <CustomerBox />
      </CartProvider>
    </>
  );
};

export default CustomerPage;
