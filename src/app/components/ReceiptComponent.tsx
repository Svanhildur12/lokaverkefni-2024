"use client";
import React from "react";

// DISHES, DRINKS, QUANTITY AND PRICE

const Text = () => {
  return <p className="text-white">hello</p>;
};

const Container = () => {
  return <Text />;
};

const ReceiptComponent = () => {
  return (
    <div>
      <div className="container bg-green-950 m-5 w-32 h-64"></div>
      <Container />
    </div>
  );
};

export default ReceiptComponent;
