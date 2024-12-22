"use client";

import CalendarComponent from "../components/CalendarComponent";
import GuestCounter from "../components/GuestCounter";
import Header from "../components/Header";
import OrderInfoComponent from "../components/OrderInfoComponent";
import ReceiptComponent from "../components/ReceiptComponent";
import TimeSelection from "../components/TimeSelection";
import { CartProvider } from "../context/CartContext";

const OrderInfoPage = () => {
  return (
    <>
      <CartProvider>
        <Header />
        <OrderInfoComponent />
      </CartProvider>
    </>
  );
};

export default OrderInfoPage;
