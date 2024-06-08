"use client";
import { ReactNode, createContext, useContext, useState } from "react";

export interface DishItems {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  price: number;
  quantity: number;
}
export interface DrinkItems {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
  strCategory: string;
  quantity: number;
  price: number;
}

export interface CartItem {
  id: string;
  name: string;
  image: string;
  category: string;
  instructions: string;
  price: number;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  date: Date | null;
  time: string | null;
  guests: number;
  addToCart: (item: CartItem) => void;
  setDate: (date: Date | null) => void;
  setTime: (time: string | null) => void;
  setGuests: (guests: number) => void;
  setEmail: (email: string) => void;
  submitOrder: () => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>("");
  const [guests, setGuests] = useState<number>(0);
  const [email, setEmail] = useState<string | null>(null);

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };
  const submitOrder = async () => {
    if (!email) {
      console.log("Email is required");
      return;
    }
    const order = {
      cart,
      date,
      time,
      guests,
      email,
    };
    try {
      const response = await fetch("http://localhost:3001/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      if (!response.ok) {
        throw new Error("Failed to submit order");
      }
      const data = await response.json();
      console.log("Order submitted successfully", data);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        date,
        time,
        guests,
        addToCart,
        setDate,
        setTime,
        setGuests,
        setEmail,
        submitOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used witin CartProvider");
  }
  return context;
};
