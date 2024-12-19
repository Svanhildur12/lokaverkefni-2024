"use client";
import React from "react";
import { useRouter } from "next/navigation";

const OrderBox = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-center mt-5 md:flex md:shrink-0 pb-10">
        <form className="flex justify-center border-8 border-double rounded-full h-44 w-44 md:h-64 md:w-64 bg-green-950 border-yellow-100">
          <button
            onClick={() => router.push("/CustomerPage")}
            className="text-yellow-100 font-bold text-3xl underline"
            type="button"
          >
            ORDER HERE!
          </button>
        </form>
      </div>
    </>
  );
};

export default OrderBox;
