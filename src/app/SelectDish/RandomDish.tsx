"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CartItem, useCart } from "../context/CartContext";
import Image from "next/image";
import { getRandomDish, postOrder } from "../api";

export type Dish = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  price: number;
  quantity: number;
};

const RandomDish = () => {
  const [dish, setDish] = useState<Dish | null>(null);
  const [quantity, setQuantity] = useState("");
  const router = useRouter();
  const { addToCart, cart } = useCart();
  const defaultPrice = 3500;

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
        idMeal: dish.idMeal,
      };
      addToCart(newCartItem);
      setQuantity("");
      console.log("New Cart Item added:", newCartItem);
      fetchDish();
    }
  };

  const handleNextPage = () => {
    router.push("/SelectDrink");
  };

  const ScrollableComponent = () => {
    return (
      <div className="h-52 overflow-scroll lg:h-96 lg:mr-52">
        <div className="border-yellow-100 border-4 border-spacing-x-1 border-double rounded-md bg-opacity-75 text-yellow-100 md:text-2x lg:text-3xl">
          {dish.strInstructions}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="lg:flex lg:justify-center lg:mt-10">
        <p className="bg-green-950 rounded-md text-yellow-100 md:text-2xl lg:text-4xl ">
          {dish.strMeal}
        </p>
      </div>
      <div>
        <div className="lg:flex lg:mt-10 lg:w-full">
          <Image
            src={dish.strMealThumb}
            alt="random dish"
            className="border-double border-4 border-yellow-100 rounded-md md:w-full md:h-full lg:ml-52"
            width={550}
            height={550}
            priority
          />
          <ScrollableComponent />
        </div>
        <div className="lg:flex lg:justify-evenly">
          <button
            className=" bg-green-950 text-yellow-100 border-2 border-white rounded-md p-2 m-2 w-34 md:w-50 md:h-14 md:text-2xl lg:text-4xl lg:-ml-20"
            type="button"
            onClick={fetchDish}
          >
            Generate new
          </button>
          <div className="flex justify-evenly">
            <form
              className="mt-5"
              id="auto"
              name="auto"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}
            >
              <label className="flex justify-start rounded-md bg-yellow-100 text-black md:text-2xl pl-2 md:h-10 md:pt-1 lg:text-3xl lg:-mt-64 lg:-ml-32">
                Quantity:
                <input
                  className="rounded-md text-black bg-yellow-100 w-10 lg:w-44 ml-2 md:text-2xl"
                  id="number"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </label>
              <div>
                <label className="underline md:text-xl lg:text-3xl lg:-ml-32">
                  Price pr.meal: {defaultPrice}kr
                </label>
              </div>
              <button
                type="submit"
                value=""
                className="bg-yellow-100 text-black font-bold rounded-md mt-5 md:text-2xl md:w-44 lg:-ml-32"
              >
                {" "}
                Add To Cart
              </button>
              <div className="mt-2"></div>
              <button
                className="text-yellow-100 text-xl md:text-2xl lg:text-3xl lg:-ml-32 border-2 rounded-md p-2 bg-green-950 lg:mb-48"
                onClick={handleNextPage}
              >
                Next page
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default RandomDish;
