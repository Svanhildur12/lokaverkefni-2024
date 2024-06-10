"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { OrderType, api, getOrderByEmail, postOrder } from "../api";
import { test } from "node:test";

const EmailComponent = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const { setEmail, submitOrder, cart, date, time, guests } = useCart();
  const router = useRouter();
  const [order, setOrder] = useState<OrderType>();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() === "") {
      console.error("Email is required.");
      return;
    }
    setEmail(emailInput);

    if (order) {
      console.log("test", order);
      try {
        await postOrder(order);
        console.log("Order Posted:", order);

        const fetchedOrder = await getOrderByEmail(emailInput);
        setOrder(fetchedOrder);
        console.log("Fetched Order after Post:", fetchedOrder);

        router.push("/ReceiptPage");
      } catch (error) {
        console.error("Error submitting order:", error);
      }
    }
    if (!order) {
      return <p>Loading...</p>;
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

export default EmailComponent;
