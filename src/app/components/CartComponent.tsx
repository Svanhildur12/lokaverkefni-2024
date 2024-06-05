"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

const CartComponent = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const { setEmail, cart, date, time, guests } = useCart();
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handleEmailSubmit = () => {
    setEmail(emailInput);
    console.log("Email set:", emailInput);
  };

  return (
    <div>
      <div className="flex justify-center m-5">
        <div className="border-4 border-double border-green-950 rounded-md ml-5 mr-5 w-96 h-36 bg-green-900 bg-opacity-35">
          <p className="flex justify-center text-white pt-2">Place Order</p>
          <div className="flex flex-col items-center">
            <input
              required
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              className="mt-2 ml-2 h-10 w-56 justify-center rounded-md bg-white bg-opacity-50 text-black"
              value={emailInput}
              onChange={handleEmailChange}
            />
            <button
              className="border-2 border-solid rounded-md mt-2  bg-white border-white text-green-900"
              onClick={handleEmailSubmit}
              type="submit"
            >
              ORDER
            </button>
          </div>
          <div className="mt-20"></div>
          <button
            className="border-2 border-red-800 text-white text-xl"
            onClick={() => router.push("/components/ReceiptComponent")}
          >
            next page
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
