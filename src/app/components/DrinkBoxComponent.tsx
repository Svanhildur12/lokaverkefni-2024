"use client";
import React from "react";
import { Drink } from "../SelectDrink/DrinkSelection";

type DrinkBoxProps = {
  drink: Drink;
  onSelect: (drink: Drink) => void;
  isSelected: boolean;
};

const DrinkBox = ({ drink, onSelect, isSelected }: DrinkBoxProps) => {
  return (
    <div
      onClick={() => onSelect(drink)}
      style={{
        cursor: "pointer",
        border: `2px solid ${isSelected ? "white" : "green"}`,
        padding: "20px",
        margin: "10px",
        width: "150px",
        textAlign: "center",
      }}
    >
      <img
        src={drink.strDrinkThumb}
        alt={drink.strDrink}
        style={{ width: "100%" }}
      />
      <h1>{drink.strDrink}</h1>
      <p>{drink.strCategory}</p>
    </div>
  );
};

export default DrinkBox;
