"use client";
import React from "react";
import Header from "./components/Header";
import ImageCarousel from "./components/ImageCarousel";
import OrderBox from "./HomePage/OrderBox";
import SpecialOffer from "./HomePage/SpecialOffer";
import { CartProvider } from "./context/CartContext";
import FindOrder from "./components/FindOrder";
import CustomerBox from "./CustomerPage/CustomerBox";

export default function Home() {
  return (
    <>
      <CartProvider>
        <Header />
        <ImageCarousel />
        <OrderBox />
        <FindOrder />
        <SpecialOffer />
      </CartProvider>
    </>
  );
}
