import { Dispatch, SetStateAction, createContext } from "react";

export type ColorContextType = {
  value: boolean;
  toggleValue: () => void;
};

export const ColorContext = createContext({
  value: false,
  toggleValue: () => {},
});
