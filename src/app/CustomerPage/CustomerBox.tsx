"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { api } from "../api";

const CustomerBox = () => {
  const router = useRouter();
  const [emailInput, setEmailInput] = useState<string>("");
  const { setEmail } = useCart();
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handleCreateCustomer = async () => {
    if (emailInput.trim() === "") {
      setError("Email is required.");
      return;
    }

    try {
      const newCustomer = await api.createCustomer(emailInput);
      setEmail(emailInput);
      localStorage.setItem("customerId", newCustomer.id.toString());
      router.push("/SelectDish");
    } catch (err) {
      console.error("Error creating customer:", err);
      setError("Failed to create customer. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex justify-center m-5">
        <div className="border-green-950 rounded-md ml-5 mr-5 w-96 h-36 bg-transparent">
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
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="flex justify-center mt-5 md:flex md:shrink-0 pb-10">
              <button
                onClick={handleCreateCustomer}
                className="text-yellow-100 font-bold text-3xl underline border-8 border-double rounded-full h-44 w-44 md:h-64 md:w-64 bg-green-950 border-yellow-100"
                type="button"
              >
                Click here to Order!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerBox;
