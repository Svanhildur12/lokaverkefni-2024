"use client";
import { ReactNode, createContext, useContext, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  image: string;
  instructions: string;
  quantity: number;
}

interface CartContextProps {
  dishes: CartItem[];
  drinks: CartItem[];
  date: Date | null;
  time: string;
  count: number;
  addDish: (dish: CartItem) => void;
  addDrink: (drink: CartItem) => void;
  setDate: (date: Date | null) => void;
  setTime: (time: string) => void;
  setCount: (count: number) => void;
  postOrder: (
    email: string,
    count: number,
    date: Date | null,
    time: string
  ) => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [dishes, setDishes] = useState<CartItem[]>([]);
  const [drinks, setDrinks] = useState<CartItem[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  const addDish = (dish: CartItem) => {
    setDishes((prevDishes) => [...prevDishes, dish]);
  };
  const addDrink = (drink: CartItem) => {
    setDrinks((prevDrinks) => [...prevDrinks, drink]);
  };
  const postOrder = async (
    email: string,
    count: number,
    date: Date | null,
    time: string
  ) => {
    if (!date || !time || count === 0 || !email) {
      throw new Error("Must provide all properties of an order");
    }
    const order = {
      email: email,
      count: count,
      date: date.toISOString(),
      time: time,
      id: 0,
      dish: dishes,
      drink: drinks,
    };
    const res = await fetch("http://localhost:3001/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!res.ok) {
      throw new Error("Failed to post data");
    }

    const response = await res.json();
    console.log("posted order", response);
  };

  return (
    <CartContext.Provider
      value={{
        dishes,
        drinks,
        date,
        time,
        count,
        addDish,
        addDrink,
        postOrder,
        setCount,
        setDate,
        setTime,
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
  const { dishes, drinks } = context;
  return { ...context, dishes, drinks };
};
