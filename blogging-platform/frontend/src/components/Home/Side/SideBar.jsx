import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";

const SideBar = () => {
  return (
    <div className="sidebar flex flex-col items-center bg-purple-telemagnet  text-white w-30vw h-screen">
      <img src="" alt="Logo" className="my-4 w-32 h-16 "/>
      <nav className="flex flex-col items-center">
        <a href="#" className="py-2 hover:underline">
          Home
        </a>
        <a href="#" className="py-2 hover:underline">
          Blogs
        </a>
        <a href="#" className="py-2 hover:underline">
          Posts
        </a>
      </nav>
      <div className="mt-auto mb-4 flex items-center">
        <a href="#" className="mx-2">
          <FaLinkedinIn style={{ color: 'white' }} size={20}/>
        </a>
        <a href="#" className="mx-2">
          <FaXTwitter style={{ color: 'white' }} size={20}/>
        </a>
        <a href="#" className="mx-2">
          <FaMedium style={{ color: 'white' }} size={20}/>
        </a>
        <a href="#" className="mx-2">
          <IoMailOutline style={{ color: 'white' }} size={20}/>
        </a>
      </div>
      <p className="text-xs">&copy; 2023 Your Blog Name. All rights reserved.</p>
    </div>
  )
}

export default SideBar