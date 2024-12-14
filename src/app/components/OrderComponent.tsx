"use client";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { postOrder } from "../api";

const OrderComponent = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const { setEmail, cart, date, time, guests } = useCart();
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handleOrderSubmit = async () => {
    if (emailInput.trim() === "") {
      console.error("Email is required.");
      return;
    }
    setEmail(emailInput);

    const drinks = cart
      .filter((item) => item.idDrink)
      .map((item) => ({
        id: parseInt(item.idDrink!),
        idDrink: item.idDrink!,
        strDrink: item.name,
        strDrinkThumb: item.image,
        strInstructions: item.instructions,
        strCategory: item.category,
        quantity: item.quantity,
        price: item.price,
      }));

    const dishes = cart
      .filter((item) => item.idMeal)
      .map((item) => ({
        id: parseInt(item.idMeal!),
        idMeal: item.idMeal!,
        strMeal: item.name,
        strMealThumb: item.image,
        strInstructions: item.instructions,
        strCategory: item.category,
        price: item.price,
        quantity: item.quantity,
      }));

    if (dishes.length === 0) {
      console.error("No dishes in the cart.");
      return;
    }

    const orderData = {
      email: emailInput,
      dishes: dishes,
      drinks: drinks,
      guests: guests,
      date: date ? date.toISOString() : new Date().toISOString(),
      time: time || new Date().toISOString(),
      id: 0,
    };

    try {
      console.log(orderData);
      const postedOrder = await postOrder(orderData);
      console.log("Order posted:", postedOrder);
      setEmail(emailInput);
      router.push("/ReceiptPage");
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center m-5">
        <div className=" border-green-950 rounded-md ml-5 mr-5 w-96 h-36  bg-transparent">
          <p className="flex justify-center text-white pt-2 md:text-3xl underline lg:text-4xl">
            Input Email below
          </p>
          <div className="flex flex-col items-center">
            <input
              required
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              className="mt-2 ml-2 h-10 w-56 md:w-72 lg:w-96 justify-center rounded-md bg-white bg-opacity-50 text-black"
              value={emailInput}
              onChange={handleEmailChange}
            />
            <button
              className="text-yellow-100 text-xl md:text-2xl md:mb-10 lg:text-3xl lg:mb-32 border-2 rounded-md p-2 bg-green-950 mt-5 mb-5"
              onClick={handleOrderSubmit}
              type="submit"
            >
              ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
