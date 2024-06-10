"use client";
import { ReactNode, createContext, useContext } from "react";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  category: string;
  instructions: string;
  price: number;
  quantity: number;
  idMeal?: string;
  idDrink?: string;
  strMeal?: string;
  strDrink?: string;
  strMealThumb?: string;
  strDrinkThumb?: string;
  strInstructions?: string;
  strCategory?: string;
}

export type CartContextType = {
  cart: CartItem[];
  date: Date | null;
  time: string | null;
  guests: number;
  email: string | null;
  addToCart: (item: CartItem) => void;
  setQuantity: (id: string, quantity: number) => void;
  setDate: (date: Date | null) => void;
  setTime: (time: string | null) => void;
  setGuests: (guests: number) => void;
  setEmail: (email: string) => void;
  toggleDelete: () => void;
  value: boolean;
  submitOrder: (order: CartItem) => Promise<void>;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  date: new Date(),
  time: "",
  guests: 0,
  email: "",
  addToCart: (item: CartItem) => {},
  setQuantity: (id: string, quantity: number) => {},
  setDate: (date: Date | null) => {},
  setTime: (time: string | null) => {},
  setGuests: (guests: number) => {},
  setEmail: (email: string) => {},
  toggleDelete: () => {},
  value: false,
  submitOrder: async () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CartContext.Provider
      value={{
        cart: [],
        date: new Date(),
        time: "",
        guests: 0,
        email: "",
        addToCart: (item: CartItem) => {},
        setQuantity: (id: string, quantity: number) => {},
        setDate: (date: Date | null) => {},
        setTime: (time: string | null) => {},
        setGuests: (guests: number) => {},
        setEmail: (email: string) => {},
        toggleDelete: () => {},
        value: false,
        submitOrder: async () => {},
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
