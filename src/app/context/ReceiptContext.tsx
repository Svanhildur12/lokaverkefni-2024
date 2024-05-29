"use client";
import { ReactNode, createContext, useContext, useState } from "react";

interface ReceiptContextProps {
  date: Date | null;
  time: string;
  count: number;
  addDate: (date: Date) => void;
  addTime: (time: string) => void;
  addCount: (count: number) => void;
}

const ReceiptContext = createContext<ReceiptContextProps | undefined>(
  undefined
);

export const ReceiptProvider = ({ children }: { children: ReactNode }) => {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  const addDate = (newDate: Date) => {
    setDate(newDate);
  };
  const addTime = (newTime: string) => {
    setTime(newTime);
  };
  const addCount = (newCount: number) => {
    setCount(newCount);
  };

  return (
    <ReceiptContext.Provider
      value={{ date, time, count, addDate, addCount, addTime }}
    >
      {children}
    </ReceiptContext.Provider>
  );
};

export const useReceipt = () => {
  const context = useContext(ReceiptContext);
  if (!context) {
    throw new Error("useReceipt must be used within ReceiptProvider");
  }
  return context;
};
