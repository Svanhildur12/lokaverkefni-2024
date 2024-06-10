"use client";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { OrderType, api } from "../api";

const EmailComponent = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const { setEmail, submitOrder } = useCart();
  const router = useRouter();
  const [order, setOrder] = useState<OrderType[]>([]);

  const fetchOrder = async () => {
    const fetchOrder = await api.getOrders();
    setOrder(fetchOrder);
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  if (!order) {
    return <p>Loading...</p>;
  }

  const handleOrderSubmit = async () => {
    if (emailInput && order) {
      await api.postOrder({
        id: 0,
        count: 0,
        email: "",
        dish: {
          idMeal: "",
          strMeal: "",
          strMealThumb: "",
          strInstructions: "",
          strCategory: "",
          price: 0,
          quantity: 0,
        },
        drinks: [],
        date: "",
        time: "",
      });
      setOrder(order);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handleNextPage = () => {
    router.push("/ReceiptPage");
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
              className="border-2 border-solid rounded-md mt-2 font-bold md:text-2xl lg:text-3xl bg-yellow-100 border-white text-green-900"
              type="submit"
              onClick={handleOrderSubmit}
            >
              ORDER
            </button>
            <button
              className="text-yellow-100 text-xl md:text-2xl md:mb-10 lg:text-3xl lg:mb-32 border-2 rounded-md p-2 bg-green-950 mt-5 mb-5"
              onClick={handleNextPage}
            >
              Next page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailComponent;
