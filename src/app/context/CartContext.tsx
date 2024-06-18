"use client";
import router from "next/router";
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
  price?: number;
  email: string;
  dish: Dish;
  drinks: Drink[];
  count: number;
  date: string;
  time: string;
  id: number;
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
  clearCart: () => void;
  setCart: (cart: CartItem[]) => void;
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
  clearCart: () => {},
  setCart: (cart: CartItem[]) => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  const [date, setDate] = useState<Date | null>(() => {
    if (typeof window !== "undefined") {
      const savedDate = localStorage.getItem("date");
      if (savedDate) {
        try {
          const parsedDate = new Date(savedDate);
          if (!isNaN(parsedDate.getTime())) {
            return parsedDate;
          } else {
            console.error("Invalid date format in localStorage");
          }
        } catch (error) {
          console.error("Error parsing date from localStorage:", error);
        }
      }
    }
    return null;
  });
  const [time, setTime] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const savedTime = localStorage.getItem("time");
      return savedTime ? savedTime : null;
    }
    return null;
  });
  const [guests, setGuests] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const savedGuests = localStorage.getItem("guests");
      return savedGuests ? parseInt(savedGuests, 10) : 0;
    }
    return 0;
  });
  const [email, setEmail] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("email");
      return savedEmail || null;
    }
    return null;
  });
  const setQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.idDrink === id || item.idMeal === id ? { ...item, quantity } : item
      )
    );
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== "undefined" && date) {
      localStorage.setItem("date", date.toISOString());
    }
  }, [date]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (time) {
        localStorage.setItem("time", time);
      } else {
        localStorage.removeItem("time");
      }
    }
  }, [time]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("guests", guests.toString());
    }
  }, [guests]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (email) {
        localStorage.setItem("email", email);
      } else {
        localStorage.removeItem("email");
      }
    }
  }, [email]);

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

  const clearCart = () => {
    console.log("clearCart function called");
    setCart([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("date");
    localStorage.removeItem("time");
    localStorage.removeItem("guests");
    localStorage.removeItem("email");
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
        clearCart,
        setCart,
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
