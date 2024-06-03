"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

const CartComponent = () => {
  const [email, setEmail] = useState("");
  const { postOrder, count, date, time, dishes, drinks } = useCart();
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !date ||
      !time ||
      count === 0 ||
      !email ||
      dishes.length === 0 ||
      drinks.length === 0
    ) {
      console.log("All fields are required");
      return;
    }
    try {
      await postOrder(email, count, date, time, dishes, drinks);
    } catch (error) {
      console.log("Error posting order:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center m-5">
        <div className="border-4 border-double border-green-950 rounded-md ml-5 mr-5 w-96 h-36 bg-green-900 bg-opacity-35">
          <p className="flex justify-center text-white pt-2">Place Order</p>
          <form
            className="flex flex-col items-center"
            onSubmit={handleSubmitOrder}
          >
            <label className=" text-white pl-2">
              E-mail
              <input
                required
                id="email"
                type="text"
                name="email"
                autoComplete="email"
                className="mt-2 ml-2 h-10 w-56 justify-center rounded-md bg-white bg-opacity-50"
                value={email}
                onChange={handleEmailChange}
              />
            </label>
            <button
              className="border-2 border-solid rounded-md mt-2  bg-white border-white text-green-900"
              onClick={handleSubmitOrder}
              type="submit"
            >
              ORDER
            </button>
          </form>
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
