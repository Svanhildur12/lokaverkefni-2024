"use client";
import React from "react";
import Header from "./components/Header";
import ImageCarousel from "./components/ImageCarousel";
import OrderBox from "./components/OrderBox";
import UserInfo from "./components/UserInfo";
import SelectDish from "./components/SelectDish";

export default function Home() {
  return (
    <>
      <Header />
      <ImageCarousel />
      <OrderBox />
      <UserInfo />
    </>
  );
}
