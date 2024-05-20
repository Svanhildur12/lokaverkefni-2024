import { Dispatch, SetStateAction, createContext } from "react";

type CartContextProps = {
  id: number;
  email: string;
  dish: Dish;
  drinks: Drink[];
  count: number;
  date: Date;
};

interface ContextProps {
  cart: CartContextProps[];
  setCart: Dispatch<SetStateAction<CartContextProps[]>>;
  updateCart: (newCart: CartContextProps[]) => void;
}

const CartContext = createContext<ContextProps>({
  cart: [],
  setCart: (): CartContextProps[] => [],
  updateCart(newCart: CartContextProps[]) {},
});
