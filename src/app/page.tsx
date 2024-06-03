"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ImageCarousel from "./HomePage/ImageCarousel";
import OrderBox from "./HomePage/OrderBox";
import UserInfo from "./HomePage/UserInfo";
import SpecialOffer from "./HomePage/SpecialOffer";

export default function Home() {
  /*   const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []); */
  return (
    <>
      {/* <h1>{isClient ? "This is never prerendered" : "Prerendered"}</h1> */}
      <Header />
      <ImageCarousel />
      <OrderBox />
      <UserInfo />
      <SpecialOffer />
    </>
  );
}
