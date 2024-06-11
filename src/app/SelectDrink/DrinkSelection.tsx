"use client";
import { useState, useEffect } from "react";
import DrinkBox from "../components/DrinkBoxComponent";
import { useRouter } from "next/navigation";
import { CartItem, useCart } from "../context/CartContext";
import { fetchDrinksById } from "../api";

export type Drink = {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
  strCategory: string;
  quantity: number;
  price: number;
};

type SelectDrink = {
  drink: Drink;
  quantity: number | undefined;
};

const DrinksPage = () => {
  const [drink, setDrink] = useState<Drink[]>();
  const [selectedDrink, setSelectedDrink] = useState<{
    [Key: string]: SelectDrink;
  }>({});
  const drinksIds = [0, 2, 20, 4, 5, 6];
  const router = useRouter();
  const { addToCart } = useCart();
  const defaultPrice = 2500;

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

  const handleQuantityChange = (idDrink: string, quantity: number) => {
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
          quantity: quantity ?? 1,
          price: defaultPrice,
        };
        addToCart(newCartItem);
        console.log("adding to cart:", newCartItem);
      });
      setSelectedDrink({});
    }
  };

  return (
    <div>
      <div className="flex flex-wrap ml-1 mt-10 md:flex md:justify-center md:ml-0">
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
      <div className="">
        <h2 className="text-yellow-100 bg-green-950 mt-5 mx-20 border-2 border-white text-xl md:text-2xl md:mx-64 lg:text-3xl">
          Selected Drinks:
        </h2>
        {Object.values(selectedDrink).map(({ drink, quantity }) => (
          <div key={drink.idDrink}>
            <p className="bg-green-950 text-yellow-100 border-2 mx-20 border-white md:text-2xl md:mx-64 lg:text-3xl">
              {drink.strDrink} - Q: {quantity ?? ""}
            </p>
          </div>
        ))}
        <button
          onClick={handleAddToCart}
          value=""
          type="submit"
          className="bg-yellow-100 text-black font-bold rounded-md mt-5 md:text-2xl md:w-44 lg:text-3xl"
        >
          {" "}
          Add To Cart
        </button>
        <div className="mt-2"></div>
        <button
          className="text-yellow-100 text-xl md:text-2xl md:mb-10 border-2 rounded-md p-2 bg-green-950 lg:text-3xl lg:mb-32"
          onClick={() => router.push("/OrderPage")}
        >
          Next page
        </button>
      </div>
    </div>
  );
};

export default DrinksPage;
