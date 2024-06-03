"use client";
import React from "react";
import Header from "../components/Header";
import CalendarComponent from "../components/CalendarComponent";
import TimeSelection from "../components/TimeSelection";
import CartComponent from "../components/CartComponent";
import GuestCounter from "../components/GuestCounter";

const OrderPage = () => {
  return (
    <>
      <Header />
      {/* make the "order" in navbar highlighted! */}
      <CalendarComponent />
      <TimeSelection />
      <GuestCounter />
      <CartComponent />
    </>
  );
};

export default OrderPage;
