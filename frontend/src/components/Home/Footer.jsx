import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="flex flex-col items-center pb-4">
      <div className="flex space-x-4 mb-4">
        <a href="https://www.linkedin.com/in/fevenseyfu/" className="mx-2">
          <FaLinkedinIn size={20} />
        </a>
        <a href="https://twitter.com/FevenSeyfu" className="mx-2">
          <FaXTwitter size={20} />
        </a>
        <a href="https://fevenseyfu.medium.com/" className="mx-2">
          <FaMedium size={20} />
        </a>
        <a href="fevensey@gmail.com" className="mx-2">
          <IoMailOutline size={20} />
        </a>
      </div>
      <p className="text-s mt-2 whitespace-normal text-center">
        &copy; 2023 QuillHub.
        <br />
        Built by{" "}
        <a
          href="https://www.linkedin.com/in/fevenseyfu/"
          className="hover:underline"
        >
          Feven Seyfu
        </a>
        <br />
        All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
