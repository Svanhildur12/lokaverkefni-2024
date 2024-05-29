"use client";
import React from "react";
import Image from "next/image";

const SpecialOffer = () => {
  // this needs some fixing... not sure if I want to keep it like this...GET BACK TO THIS!
  return (
    <div>
      <p className="border-2 border-solid border-white rounded-md ml-10 mr-10 text-white bg-red-700 text-center">
        COCKTAILS: Buy 2 get 3 !
      </p>
      <div className="flex justify-between ml-10 mr-10">
        <Image
          src="/images/drinks.webp"
          alt="MOFT"
          className="rounded-full border-solid border-8 border-green-900"
          width={350}
          height={100}
        />
      </div>
    </div>
  );
};

export default SpecialOffer;
