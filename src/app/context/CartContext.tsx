"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type Dish = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  price: number;
  quantity: number;
};
export type Drink = {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
  strCategory: string;
  quantity: number;
  price: number;
};

export type OrderType = {
  image: string;
  name: string;
  quantity: number;
  price: any;
  id: number;
  email: string;
  dish: Dish;
  drinks: Drink[];
  count: number;
  date: string;
  time: string;
};

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
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<string | null>("");
  const [guests, setGuests] = useState<number>(0);
  const [email, setEmail] = useState<string | null>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        return updatedCart;
      } else {
        return [...prevCart, item];
      }
    });
    console.log("item added to cart:", item);
  };

  const setQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        date,
        time,
        guests,
        email,
        addToCart,
        setQuantity,
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
