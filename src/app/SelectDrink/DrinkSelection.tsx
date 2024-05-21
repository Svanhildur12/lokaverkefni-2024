"use client";
import { useState, useEffect } from "react";
import DrinkBox from "../components/DrinkBoxComponent";

export type Drink = {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
  strCategory: string;
};

const API_BASE_URL =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";

export const fetchDrinkById = async (idDrink: number): Promise<Drink> => {
  const res = await fetch(`${API_BASE_URL}/${idDrink}`);
  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  const response = await res.json();
  return response;
};

export const fetchDrinksById = async (idDrinks: number[]): Promise<Drink[]> => {
  const drinkPromises = idDrinks.map((idDrink) => fetchDrinkById(idDrink));
  return Promise.all(drinkPromises);
};

const DrinksPage = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const drinksIds = [17225, 14610, 17837, 17835, 15182, 11014];

  const fetchDrink = async () => {
    try {
      const fetchedDrinks = await fetchDrinksById(drinksIds);
      setDrinks(fetchedDrinks);
    } catch (error) {
      console.log("Error fetching drink:", error);
    }
  };

  useEffect(() => {
    fetchDrink();
  }, []);

  useEffect(() => {
    console.log("current drink:", drinksIds);
  }, [drinksIds]);

  if (!drinksIds) {
    return <p>Loading...</p>;
  }

  const handleSelectDrink = (drink: Drink) => {
    setSelectedDrink(drink);
  };

  return (
    <div className="flex flex-wrap">
      {drinks.map((drink) => (
        <DrinkBox
          key={drink.idDrink}
          drink={drink}
          onSelect={handleSelectDrink}
          isSelected={selectedDrink?.idDrink === drink.idDrink}
        />
      ))}
    </div>
  );
};

export default DrinksPage;
