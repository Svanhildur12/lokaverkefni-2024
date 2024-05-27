"use client";
import React from "react";
import Header from "../components/Header";
import CalendarComponent from "../components/CalendarComponent";
import CounterComponent from "../components/CounterComponent";
import EmailComponent from "../components/EmailComponent";

const OrderPage = () => {
  return (
    <>
      <Header />
      {/* make the "order" in navbar highlighted! */}
      <CalendarComponent />
      <CounterComponent />
      <EmailComponent />
    </>
  );
};

export default OrderPage;
