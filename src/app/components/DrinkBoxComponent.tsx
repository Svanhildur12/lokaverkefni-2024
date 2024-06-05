"use client";
import React from "react";
import { Drink } from "../SelectDrink/DrinkSelection";
import Image from "next/image";

type DrinkBoxProps = {
  drink: Drink;
  onSelect: (drink: Drink) => void;
  isSelected: boolean;
  quantity: number | undefined;
  onQuantityChange: (quantity: number | undefined) => void;
  price: 2500;
};

const DrinkBox = ({
  drink,
  onSelect,
  isSelected,
  quantity,
  onQuantityChange,
  price,
}: DrinkBoxProps) => {
  const handleQuantityBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newQuantity = value === "" ? undefined : parseInt(value, 10);
    onQuantityChange(newQuantity);
  };
  return (
    <div>
      <div
        onClick={() => onSelect(drink)}
        style={{
          cursor: "pointer",
          border: `5px solid ${isSelected ? "green" : "white"}`,
          padding: "5px",
          width: "115px",
          textAlign: "center",
          backgroundColor: "black",
        }}
      >
        <Image
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          style={{ width: "100%" }}
          width={50}
          height={10}
          priority
        />
        <h1>{drink.strDrink}</h1>
        <p>{drink.strCategory}</p>
        <p>{price}kr</p>
      </div>
      {isSelected && (
        <div>
          <label>
            Q:
            <input
              name="quantity"
              className="text-black"
              type="number"
              value={quantity !== undefined ? quantity : ""}
              onChange={handleQuantityBlur}
              min="0"
              style={{ width: "50px", margin: "5px" }}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default DrinkBox;
