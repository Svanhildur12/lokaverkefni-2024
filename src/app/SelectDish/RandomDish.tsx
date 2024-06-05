"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CartItem, useCart } from "../context/CartContext";
import Image from "next/image";

export type Dish = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  price: number;
  quantity: number;
};

const getRandomDish = async (): Promise<Dish> => {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  const response = await res.json();
  return response.meals[0];
};

const RandomDish = () => {
  const [dish, setDish] = useState<Dish | null>(null);
  const [quantity, setQuantity] = useState("");
  const router = useRouter();
  const { addToCart } = useCart();
  const defaultPrice = 2500;

  useEffect(() => {
    fetchDish();
  }, []);

  const fetchDish = async () => {
    try {
      const fetchedDish = await getRandomDish();
      setDish(fetchedDish);
    } catch (error) {
      console.log("Error fetching dish:", error);
    }
  };

  if (!dish) {
    return <p>Loading...</p>;
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = async () => {
    if (dish && quantity) {
      const quantityNumber = parseInt(quantity);
      if (isNaN(quantityNumber) || quantityNumber <= 0) {
        console.log("invalid quantity");
        return;
      }
      const newCartItem: CartItem = {
        id: dish.idMeal,
        name: dish.strMeal,
        image: dish.strMealThumb,
        category: dish.strCategory,
        instructions: dish.strInstructions,
        price: defaultPrice,
        quantity: quantityNumber,
      };
      addToCart(newCartItem);
      setQuantity("");
      fetchDish();
      console.log("added to cart:", newCartItem);
    }
  };

  const handleNextPage = () => {
    router.push("/SelectDrink");
  };

  const ScrollableComponent = () => {
    return (
      <div
        style={{
          height: "200px",
          overflow: "scroll",
        }}
      >
        <div className="border-green-950 border-2 border-spacing-x-1  bg-opacity-75">
          {dish.strInstructions}
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        <p className="bg-green-950 rounded-md">{dish.strMeal}</p>
        <Image
          src={dish.strMealThumb}
          alt="random dish"
          className="border-double border-4 border-green-950 rounded-md"
          width={350}
          height={350}
          priority
        />
        <ScrollableComponent />
        <button
          className="flex justify-start bg-green-950 text-yellow-100 border-2 border-white rounded-md p-2 m-2 w-34"
          type="button"
          onClick={fetchDish}
        >
          Generate new
        </button>
      </div>
      <div className="flex justify-end">
        <form
          className=""
          id="auto"
          name="auto"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
        >
          <label className="flex justify-start rounded-md bg-yellow-100 text-black ">
            Quantity:
            <input
              className="rounded-md text-black bg-yellow-100 w-10 h-5"
              id="number"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </label>
          <label>Price pr.meal: {defaultPrice}kr</label>
          <button
            type="submit"
            value=""
            className="bg-yellow-100 text-black font-bold rounded-md mt-5"
          >
            {" "}
            Add To Cart
          </button>
          <div className="mt-2"></div>
          <button className="text-white text-xl" onClick={handleNextPage}>
            next page
          </button>
        </form>
      </div>
    </>
  );
};
export default RandomDish;
