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
