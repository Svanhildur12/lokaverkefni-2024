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
  addDish: (dish: CartItem) => void;
  addDrink: (drink: CartItem) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [dishes, setDishes] = useState<CartItem[]>([]);
  const [drinks, setDrinks] = useState<CartItem[]>([]);

  const addDish = (dish: CartItem) => {
    setDishes((prevDishes) => [...prevDishes, dish]);
  };
  const addDrink = (drink: CartItem) => {
    setDrinks((prevDrinks) => [...prevDrinks, drink]);
  };

  return (
    <CartContext.Provider
      value={{
        dishes,
        drinks,
        addDish,
        addDrink,
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
