"use client";
import React from "react";

const MealOfTheDay = () => {
  // this needs some fixing... not sure if I want to keep it like this...GET BACK TO THIS!
  return (
    <div className="text-white border-2 flex justify-right m-10">
      <img src="/images/plate1.jpg" alt="MOFT" className="h-32 w-48"></img>
      <p>
        Special offer! 10% off if this dish is ordered! With DISH OF THE DAY
        discount!
      </p>
    </div>
  );
};

const UserInfo = () => {
  return (
    <>
      <div className="flex justify-center m-5">
        <div className="border-4 border-double border-green-950 rounded-md ml-5 mr-5 w-96 h-36 bg-green-900 bg-opacity-35">
          <p className="flex justify-center text-white pt-2">Find your order</p>
          <label className=" text-white pl-2">E-mail</label>
          <input
            required
            id="email"
            type="email"
            className="mt-2 ml-2 h-10 w-56 justify-center rounded-md bg-white bg-opacity-50"
          />
          <form className="flex justify-center">
            <button
              type="submit"
              className="border-2 border-solid rounded-md mt-2 pl-2 pr-2 bg-white border-white text-green-900"
            >
              FIND
            </button>
          </form>
        </div>
      </div>
      <MealOfTheDay />
    </>
  );
};

export default UserInfo;
