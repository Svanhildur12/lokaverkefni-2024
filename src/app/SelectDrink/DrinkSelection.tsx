"use client";
import { useState, useEffect, Key } from "react";
import DrinkBox from "../components/DrinkBoxComponent";
import { useRouter } from "next/navigation";

export type Drink = {
  idDrink: number;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
  strCategory: string;
};

export const fetchDrinkById = async (idDrink: number): Promise<Drink> => {
  const res = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  return response.drinks[idDrink];
};

export const fetchDrinksById = async (idDrinks: number[]): Promise<Drink[]> => {
  const drinkPromises = idDrinks.map((idDrink) => fetchDrinkById(idDrink));
  return Promise.all(drinkPromises);
};

type SelectDrink = {
  drink: Drink;
  quantity: number | undefined;
};

const DrinksPage = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [selectedDrink, setSelectedDrink] = useState<{
    [Key: string]: SelectDrink;
  }>({});
  const [error, setError] = useState<string | null>(null);
  const drinksIds = [0, 2, 7, 4, 5, 6];
  const router = useRouter();

  useEffect(() => {
    const getDrink = async () => {
      try {
        const fetchedDrinks = await fetchDrinksById(drinksIds);
        setDrinks(fetchedDrinks);
      } catch (error) {
        console.log("error fetching drinks:", error);
        setError;
      }
    };
    getDrink();
  }, []);

  useEffect(() => {
    console.log("current drink:", drinksIds);
  }, [drinksIds]);

  if (!drinksIds) {
    return <p>Loading...</p>;
  }

  const handleSelectDrink = (drink: Drink) => {
    setSelectedDrink((prevSelectedDrinks) => {
      const newSelectedDrinks = { ...prevSelectedDrinks };
      if (newSelectedDrinks[drink.idDrink]) {
        delete newSelectedDrinks[drink.idDrink];
      } else {
        newSelectedDrinks[drink.idDrink] = { drink, quantity: undefined };
      }
      return newSelectedDrinks;
    });
  };

  const handleQuantityChange = (
    idDrink: number,
    quantity: number | undefined
  ) => {
    setSelectedDrink((prevSelectedDrinks) => ({
      ...prevSelectedDrinks,
      [idDrink]: { ...prevSelectedDrinks[idDrink], quantity },
    }));
  };

  return (
    <div>
      {error ? (
        <div style={{ color: "red" }}>Error: {error}</div>
      ) : (
        <div className="flex flex-wrap">
          {drinks.map((drink) => (
            <DrinkBox
              key={drink.idDrink}
              drink={drink}
              onSelect={handleSelectDrink}
              isSelected={!!selectedDrink[drink.idDrink]}
              quantity={selectedDrink[drink.idDrink]?.quantity}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
      )}
      <div>
        <h2>Selected Drinks</h2>
        {Object.values(selectedDrink).map(({ drink, quantity }) => (
          <div key={drink.idDrink}>
            <p>
              {drink.strDrink} - Quantity: {quantity}
            </p>
          </div>
        ))}
        <button type="submit" className="">
          {" "}
          Add To Cart
        </button>
        <div className="mt-2"></div>
        <button
          className="text-white text-xl"
          onClick={() => router.push("/OrderPage")}
        >
          next page
        </button>
      </div>
    </div>
  );
};

export default DrinksPage;
