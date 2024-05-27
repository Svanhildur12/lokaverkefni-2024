"use client";
import React from "react";
import Header from "../components/Header";
import ReceiptComponent from "../components/ReceiptComponent";

const ReceiptPage = () => {
  return (
    <>
      <Header />
      {/* make the "Receipt" in navbar highlighted! */}
      <ReceiptComponent />
    </>
  );
};

export default ReceiptPage;
