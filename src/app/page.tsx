"use client";
import React from "react";
import Header from "./components/Header";
import ImageCarousel from "./HomePage/ImageCarousel";
import OrderBox from "./HomePage/OrderBox";
import UserInfo from "./HomePage/UserInfo";
import SpecialOffer from "./HomePage/SpecialOffer";
import { CartProvider } from "./context/CartContext";

export default function Home() {
  return (
    <>
      <CartProvider>
        <Header />
        <ImageCarousel />
        <OrderBox />
        <UserInfo />
        <SpecialOffer />
      </CartProvider>
    </>
  );
}
