"use client";
import { useEffect, useState } from "react";
import { useCart, OrderType } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { fetchOrderByEmail, postOrder } from "../api";

const EmailComponent = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const { setEmail, cart, date, time, clearCart } = useCart();
  const router = useRouter();
  const [order, setOrder] = useState<OrderType | null>(null);

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
    console.log("Filtered drinks:", drinks);

    const dishItem = cart.find((item) => item.idMeal);
    console.log("Dish item:", dishItem);
    if (!dishItem) {
      console.error("No dish in the cart.");
      return;
    }

    const dish = {
      id: parseInt(dishItem.idMeal!),
      idMeal: dishItem.idMeal!,
      strMeal: dishItem.name,
      strMealThumb: dishItem.image,
      strInstructions: dishItem.instructions,
      strCategory: dishItem.category,
      price: dishItem.price,
      quantity: dishItem.quantity,
    };

    const orderData: OrderType = {
      email: emailInput,
      dish,
      drinks,
      count: cart.reduce((total, item) => total + item.quantity, 0),
      date: date ? date.toISOString() : new Date().toISOString(),
      time: time || new Date().toISOString(),
      price: undefined,
      id: 0,
    };

    try {
      const postedOrder = await postOrder(orderData);
      console.log(postedOrder);

      const fetchedOrder = await fetchOrderByEmail(emailInput);
      setOrder(order);
      console.log("Fetched Order after Post:", fetchedOrder);

      router.push("/ReceiptPage");
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };
  useEffect(() => {
    console.log("current cart:", cart);
  }, [cart]);

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
