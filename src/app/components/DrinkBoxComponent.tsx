"use client";
import React from "react";
import { Drink } from "../SelectDrink/DrinkSelection";
import Image from "next/image";

type DrinkBoxProps = {
  drink: Drink;
  onSelect: (drink: Drink) => void;
  isSelected: boolean;
  quantity: number | undefined;
  onQuantityChange: (quantity: number) => void;
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
    onQuantityChange(newQuantity || 0);
  };
  return (
    <div className="flex justify-center md:w-52 lg:w-96">
      <div className="md:w-72 md:h-96 lg:w-72 lg:h-96 lg:mb-32 lg:inline-table">
        <div
          className="text-center w-32 md:w-52 md:h-80 lg:w-96 lg:h-full bg-black p-1 cursor-pointer"
          onClick={() => onSelect(drink)}
          style={{
            border: `5px solid ${isSelected ? "green" : "white"}`,
          }}
        >
          <Image
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            style={{ width: "100%" }}
            width={5000}
            height={1000}
            priority
          />
          <div className="md:flex md:justify-center text-yellow-100">
            <div className="md:text-2xl">
              <h1>{drink.strDrink}</h1>
              <p>{drink.strCategory}</p>
              <p>{price}kr</p>
            </div>
          </div>
        </div>
        {isSelected && (
          <label className="md:text-2xl text-yellow-100 lg:text-3xl">
            Q:
            <input
              name="quantity"
              className="text-black w-14 m-2 md:w-32 md:h-10 md:text-2xl lg:w-24 lg:h-14 lg:text-3xl"
              type="number"
              value={quantity !== undefined ? quantity : ""}
              onChange={handleQuantityBlur}
              min="0"
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default DrinkBox;
