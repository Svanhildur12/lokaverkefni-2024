"use client";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { postOrder, OrderType } from "../api";

const OrderComponent = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const { cart, date, time, guests, email } = useCart();
  const router = useRouter();

  const handleOrderSubmit = async () => {
    const customerId = localStorage.getItem("customerId");
    if (!customerId) {
      console.error("Customer ID is required to place an order.");
      return;
    }
    if (!email) {
      console.error("Email is required.");
      return;
    }

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

    if (dishes.length === 0 && drinks.length === 0) {
      console.error("No items in the cart.");
      return;
    }

    const orderData: OrderType = {
      email: email,
      dishes,
      drinks,
      guests: guests,
      date: date ? date.toISOString() : new Date().toISOString(),
      time: time || new Date().toISOString(),
      customerId: parseInt(localStorage.getItem("customerId") || "0"),
    };

    console.log("Order data being sent:", orderData);

    try {
      const newOrder = await postOrder(orderData);
      console.log("Order posted:", newOrder);

      localStorage.setItem("newOrderId", newOrder.id!.toString());
      router.push("/ReceiptPage");
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="text-yellow-100 text-xl md:text-2xl md:mb-10 lg:text-3xl lg:mb-32 border-2 rounded-md p-2 bg-green-950 mt-5 mb-5"
        onClick={handleOrderSubmit}
        type="submit"
      >
        ORDER
      </button>
    </div>
  );
};

export default OrderComponent;
