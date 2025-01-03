"use client";
import React, { useState } from "react";
import { api } from "../api";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

const FindOrder = () => {
  const [showInput, setShowInput] = useState(false);
  const [emailInput, setEmailInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setDate, setEmail, setTime, setGuests } = useCart();

  const handleShowInput = () => {
    setShowInput((prevShowInput) => !prevShowInput);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handleRetriveOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (emailInput.trim() !== "") {
      try {
        const fetchedOrder = await api.fetchOrderByEmail(emailInput);
        console.log("fetched order:", fetchedOrder);

        if (fetchedOrder.length > 0) {
          const firstOrder = fetchedOrder[0];

          setEmail(firstOrder.email);
          setDate(new Date(firstOrder.date));
          setTime(firstOrder.time);
          setGuests(firstOrder.guests);

          router.push(`/OrderInfoPage?email=${emailInput}`);
        } else {
          console.error("No orders found for this email.");
        }
      } catch (error) {
        console.error("Error retrieving order:", error);
        setError(
          "Failed to retrive order. Please check the email and try again."
        );
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Email is required");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center m-5 md:m-0 lg:mx-72">
        <div className="flex justify-center border-8 border-double border-yellow-100 rounded-md ml-5 mr-5 w-96 h-36 md:h-44 lg:h-64 md:w-full lg:w-full lg:pt-8 md:mx-32 bg-green-950 bg-opacity-75">
          {!showInput && (
            <button
              onClick={handleShowInput}
              className=" text-yellow-100 font-bold text-xl md:text-3xl lg:text-4xl border-2 border-solid w-44 md:w-64 lg:w-96 h-10 mt-10 md:mt-14 rounded-md border-yellow-100"
            >
              Find your order!
            </button>
          )}
          {showInput && (
            <form onSubmit={handleRetriveOrder}>
              <p className="flex justify-center text-yellow-100 font-bold mt-2 md:mt-5 md:text-2xl md:mb-5 lg:text-4xl underline">
                Enter your Email below
              </p>
              <label>
                <input
                  required
                  id="email"
                  type="text"
                  name="email"
                  autoComplete="email"
                  className="mt-2 ml-2 md:ml-0 h-10 w-56 md:w-64 justify-center rounded-md bg-yellow-100 bg-opacity-50"
                  value={emailInput}
                  onChange={handleEmailChange}
                />
              </label>
              <button
                type="submit"
                className="border-2 border-solid rounded-md bg-yellow-100 border-white text-black font-bold w-16 md:w-24 lg:h-10 h-8 m-2"
                onClick={handleRetriveOrder}
              >
                FIND
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default FindOrder;
