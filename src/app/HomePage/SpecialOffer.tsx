"use client";
import React from "react";
import Image from "next/image";

const SpecialOffer = () => {
  // this needs some fixing... not sure if I want to keep it like this...GET BACK TO THIS!
  return (
    <div className="mt-20 ml-10 mr-10">
      <div className="flex justify-center">
        <Image
          src="/images/drinks.webp"
          alt="happy hour"
          className="rounded-md border-8 border-yellow-100 border-double"
          width={550}
          height={100}
        />
      </div>
      <p className="text-center text-white font-bold bg-black mb-10 md:text-3xl md:mb-15">
        HAPPY HOUR EVERY DAY FROM 17:00-19:00
      </p>
    </div>
  );
};

export default SpecialOffer;
