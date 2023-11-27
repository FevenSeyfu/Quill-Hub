import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { IoMailOutline,IoChevronDown } from "react-icons/io5";

const SideBar = () => {
  return (
    <div className="sidebar flex flex-col items-center bg-purple-telemagnet  w-1/6 text-white  h-screen">
      <img src="" alt="Logo" className="my-4 w-32 h-16 "/>
      <nav className="flex-1 flex flex-col items-start justify-start  p-4">
        <a href="#" className="flex items-center mb-4 justify-between w-full hover:underline">
          Home
          <IoChevronDown className="ml-2" />
        </a>
        <a href="#" className="flex items-center mb-4 justify-between w-full hover:underline">
          Blogs
          <IoChevronDown className="ml-2" />
        </a>
        <a href="#" className="flex items-center mb-4 justify-between w-full hover:underline">
          Posts
          <IoChevronDown className="ml-2" />
        </a>
      </nav>
      <div className="mt-auto mb-4 flex items-center">
        <a href="#" className="mx-2">
          <FaLinkedinIn size={20}/>
        </a>
        <a href="#" className="mx-2">
          <FaXTwitter size={20}/>
        </a>
        <a href="#" className="mx-2">
          <FaMedium size={20}/>
        </a>
        <a href="#" className="mx-2">
          <IoMailOutline size={20}/>
        </a>
      </div>
      <p className="text-s mt-2 whitespace-normal text-center">&copy; 2023 Your Blog Name.All rights reserved.</p>
    </div>
  )
}

export default SideBar