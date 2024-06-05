"use client";
import { useState, useEffect } from "react";
import DrinkBox from "../components/DrinkBoxComponent";
import { useRouter } from "next/navigation";
import { CartItem, useCart } from "../context/CartContext";

export type Drink = {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
  strCategory: string;
  quantity: number;
  price: number;
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
  const [drink, setDrink] = useState<Drink[]>();
  const [quantity, setQuantity] = useState("");
  const [selectedDrink, setSelectedDrink] = useState<{
    [Key: string]: SelectDrink;
  }>({});
  const drinksIds = [0, 2, 20, 4, 5, 6];
  const router = useRouter();
  const [price, setPrice] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const getDrink = async () => {
      try {
        const fetchedDrinks = await fetchDrinksById(drinksIds);
        setDrink(fetchedDrinks);
      } catch (error) {
        console.log("error fetching drinks:", error);
      }
    };
    getDrink();
  }, []);

  useEffect(() => {
    console.log("current drink:", drink);
  }, [drink]);

  if (!drink) {
    return <p>Loading...</p>;
  }

  const handleSelectDrink = (drink: Drink) => {
    console.log("selected drink:", drink);
    setSelectedDrink((prevSelectedDrinks) => {
      const newSelectedDrinks = { ...prevSelectedDrinks };
      if (newSelectedDrinks[drink.idDrink]) {
        delete newSelectedDrinks[drink.idDrink];
      } else {
        newSelectedDrinks[drink.idDrink] = {
          drink,
          quantity: undefined,
        };
      }
      console.log("update selected drinks:", newSelectedDrinks);
      return newSelectedDrinks;
    });
  };

  const handleQuantityChange = (
    idDrink: string,
    quantity: number | undefined
  ) => {
    console.log(
      "quantity change for drink ID:",
      idDrink,
      "quantity:",
      quantity
    );
    setSelectedDrink((prevSelectedDrinks) => ({
      ...prevSelectedDrinks,
      [idDrink]: { ...prevSelectedDrinks[idDrink], quantity },
    }));
  };

  const handleAddToCart = async () => {
    const drinksToPost = Object.values(selectedDrink).filter(
      (item) => item.quantity !== undefined && !isNaN(item.quantity)
    );
    if (drinksToPost.length > 0) {
      drinksToPost.forEach(({ drink, quantity }) => {
        const newCartItem: CartItem = {
          id: drink.idDrink,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
          instructions: drink.strInstructions,
          category: drink.strCategory,
          quantity: drink.quantity,
          price: drink.price,
        };
        addToCart(newCartItem);
        console.log("adding to cart:", newCartItem);
      });
      setPrice(2500);
      setSelectedDrink({});
      setQuantity("");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap">
        {drink.map((drink) => (
          <DrinkBox
            key={drink.idDrink}
            drink={drink}
            price={2500}
            onSelect={handleSelectDrink}
            isSelected={!!selectedDrink[drink.idDrink]}
            quantity={selectedDrink[drink.idDrink]?.quantity}
            onQuantityChange={(quantity) =>
              handleQuantityChange(drink.idDrink, quantity)
            }
          />
        ))}
      </div>
      <div>
        <h2>Selected Drinks</h2>
        {Object.values(selectedDrink).map(({ drink, quantity }) => (
          <div key={drink.idDrink}>
            <p>
              {drink.strDrink} - Q: {quantity ?? ""}
            </p>
          </div>
        ))}
        <button onClick={handleAddToCart} value="" type="submit" className="">
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
