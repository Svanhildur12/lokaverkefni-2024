"use client";
import React from "react";
import Header from "../Header";
import ImageCarousel from "./ImageCarousel";
import OrderBox from "./OrderBox";
import UserInfo from "./UserInfo";
import SpecialOffer from "./SpecialOffer";

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
