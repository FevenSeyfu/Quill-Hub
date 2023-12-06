import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { IoMailOutline,IoChevronDown } from "react-icons/io5";

const SideBar = () => {
  let sidebarVisible = window.innerWidth > 768;
  return (
    <>
    <div className={`sidebar  text-white fixed left-0 top-0 flex flex-col justify-between bg-purple-telemagnet  w-64 h-full ${sidebarVisible ? 'visible' : 'hidden'} lg:visible`}>
      <img src="" alt="Logo" className="my-4 w-32 h-16 "/>
      <nav className="flex-1 flex flex-col items-start justify-start  p-4">
        <a href="#" className="flex items-center mb-4 justify-between w-full hover:underline font-bold text-lg">
          Home
          <IoChevronDown className="ml-2" />
        </a>
        <a href="#" className="flex items-center mb-4 justify-between w-full hover:underline font-bold text-lg">
          Blogs
          <IoChevronDown className="ml-2" />
        </a>
        <a href="#" className="flex items-center mb-4 justify-between w-full hover:underline font-bold text-lg">
          Posts
          <IoChevronDown className="ml-2" />
        </a>
      </nav>
      <div className="flex flex-col items-center pb-4">
        <div className="flex space-x-4 mb-4">
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
        <p className="text-s mt-2 whitespace-normal text-center">&copy; 2023 Your Blog Name. <br />All rights reserved.</p>
      </div>
     
    </div>
    </>
  )
}

export default SideBar