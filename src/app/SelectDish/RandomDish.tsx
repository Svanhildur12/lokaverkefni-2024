"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";

export type Dish = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
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
  const { addDish } = useCart();

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
      console.log("adding to cart:", {
        id: dish.idMeal,
        quantity: quantityNumber,
        name: dish.strMeal,
      });
      if (isNaN(quantityNumber) || quantityNumber <= 0) {
        console.log("invalid quantity");
        return;
      }
      const cartItem = {
        id: dish.idMeal,
        name: dish.strMeal,
        image: dish.strMealThumb,
        instructions: dish.strInstructions,
        quantity: quantityNumber,
      };
      addDish(cartItem);
      setQuantity("");
      fetchDish();
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
        <div className="border-green-950 border-2 border-spacing-x-1 bg-black bg-opacity-75">
          {dish.strInstructions}
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        <p>{dish.strMeal}</p>
        <Image
          src={dish.strMealThumb}
          alt="random dish"
          className="border-double border-4 border-green-950"
          width={350}
          height={350}
          priority
        />
        <ScrollableComponent />
        <button
          className="bg-white text-black rounded-sm m-2 w-32"
          type="button"
          onClick={fetchDish}
        >
          Generate new
        </button>
      </div>
      <div className="m-5">
        <form
          id="auto"
          name="auto"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
        >
          <label>
            Quantity
            <input
              className="text-black"
              id="number"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </label>
          <button type="submit" value="" className="">
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
