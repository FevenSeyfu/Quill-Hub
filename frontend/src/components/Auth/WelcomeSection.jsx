import React from "react";
import Illustration from "../../assets/Illustration.svg?react";

const WelcomeSection = () => {
  return (
    <div className="hidden md:flex w-full flex-col items-center justify-center md:w-4/6 py-4  rounded-lg text-soft-white  bg-soft-orange">
      <div className="text-center px-12">
        <h2 className="text-4xl font-semibold mb-2">Welcome</h2>
        <p className="text-lg font-bold text-white mb-4">
          Enjoy the benefits of our platform by signing in. Join our community
          and explore a world of possibilities.
        </p>
      </div>
      <div className="px-16 flex justify-center">
        <Illustration className="w-[70%] h-auto"/>
      </div>
    </div>
  ); 
};

export default WelcomeSection;
