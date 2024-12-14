"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="top-0 left-0 w-full z-[20]">
      <div className="sticky bg-green-950 max-w-screen md:h-32 md:pt-5 px-4 lg:px-6 text-yellow-100 border-b-4 border-yellow-100">
        <div className="flex justify-around gap-2 lg:gap-14 items-center h-20 ">
          <div className="flex flex-row">
            <img
              src="/images/lil-bits.svg"
              alt="logo"
              className="w-32 h-32 md:w-44 lg:w-52 "
            />
          </div>
          <div>
            <Link href="/">
              <p
                className={`flex items-center text-sm md:text-2xl lg:text-4xl ${
                  isActive("/SelectDish") ? "text-red-400" : ""
                }`}
              >
                Home
              </p>
            </Link>
          </div>
          <Link href="/SelectDish">
            <p
              className={`flex items-center text-sm md:text-2xl lg:text-4xl ${
                isActive("/SelectDish") ? "text-red-400" : ""
              }`}
            >
              Dishes
            </p>
          </Link>
          <Link href="/SelectDrink">
            <p
              className={`flex items-center text-sm md:text-2xl lg:text-4xl ${
                isActive("/SelectDrink") ? "text-red-400" : ""
              }`}
            >
              Drinks
            </p>
          </Link>
          <Link href="/OrderPage">
            <p
              className={`flex items-center text-sm md:text-2xl lg:text-4xl ${
                isActive("/OrderPage") ? "text-red-400" : ""
              }`}
            >
              Order
            </p>
          </Link>
          <Link href="/ReceiptPage">
            <p
              className={`flex items-center text-sm md:text-2xl lg:text-4xl ${
                isActive("/ReceiptPage") ? "text-red-400" : ""
              }`}
            >
              Receipt
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
