"use client";
import React from "react";
import Header from "./components/Header";
import ImageCarousel from "./HomePage/ImageCarousel";
import OrderBox from "./HomePage/OrderBox";
import UserInfo from "./HomePage/UserInfo";
import SpecialOffer from "./HomePage/SpecialOffer";

export default function Home() {
  return (
    <>
      <Header />
      <ImageCarousel />
      <OrderBox />
      <UserInfo />
      <SpecialOffer />
    </>
  );
}
