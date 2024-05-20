"use client";
import React from "react";

const SpecialOffer = () => {
  // this needs some fixing... not sure if I want to keep it like this...GET BACK TO THIS!
  return (
    <div>
      <p className="border-2 border-solid border-white rounded-md ml-10 mr-10 text-white bg-red-700 text-center">
        COCKTAILS: Buy 2 get 3 !
      </p>
      <div className="flex justify-between ml-10 mr-10">
        <img
          src="/images/drinks.webp"
          alt="MOFT"
          className="rounded-full border-solid border-8 border-green-900"
        ></img>
      </div>
    </div>
  );
};

export default SpecialOffer;
