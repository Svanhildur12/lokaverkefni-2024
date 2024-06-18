"use client";
import React from "react";
import Header from "../components/Header";
import CalendarComponent from "../components/CalendarComponent";
import TimeSelection from "../components/TimeSelection";
import GuestCounter from "../components/GuestCounter";
import { CartProvider } from "../context/CartContext";
import OrderComponent from "../components/OrderComponent";

const OrderPage = () => {
  return (
    <>
      <CartProvider>
        <Header />
        <CalendarComponent />
        <TimeSelection />
        <GuestCounter />
        <OrderComponent />
      </CartProvider>
    </>
  );
};

export default OrderPage;
