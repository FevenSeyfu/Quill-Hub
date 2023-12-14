import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { IoMailOutline,IoChevronDown } from "react-icons/io5";
import Logo from '../../assets/logo-no-bg.png'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const SideBar = () => {
  const { user } = useSelector((state) => state.auth);
  let sidebarVisible = window.innerWidth >= 768;
  return (
    <>
    <div className={`hidden lg:flex flex-col justify-between bg-purple-telemagnet w-64 h-full fixed left-0 top-0 text-white`}>
      <div className='flex flex-col justify-around items-center m-2'>
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-24 h-16"/>
          <h2 className='font-bold text-lg text-gray-soft-white'>QuillHUB</h2>
        </Link>
      </div>
      <nav className="flex-1 flex flex-col items-start justify-start mt-6 p-4">
        <Link to="/" className="flex items-center mb-4 justify-between w-full hover:underline font-bold text-lg">
          Home
          <IoChevronDown className="ml-2" />
        </Link>
        {user ? (
          <>
            <Link to="/posts/" className="flex items-center mb-4 justify-between w-full hover:underline font-bold text-lg">
              My Stories
              <IoChevronDown className="ml-2" />
            </Link>
          <Link to="/users/profile" className="flex items-center mb-4 justify-between w-full hover:underline font-bold text-lg">
              My Profile
              <IoChevronDown className="ml-2" />
            </Link>
          </>
        ):(
          <>
            <Link to="/users/login/" className="flex items-center mb-4 justify-between w-full hover:underline font-bold text-lg">
              Login
              <IoChevronDown className="ml-2" />
            </Link>
          <Link to="/users/" className="flex items-center mb-4 justify-between w-full hover:underline font-bold text-lg">
              Register
              <IoChevronDown className="ml-2" />
          </Link>
          </>
        )}
      </nav>
      <div className="flex flex-col items-center pb-4">
        <div className="flex space-x-4 mb-4">
          <a href="https://www.linkedin.com/in/fevenseyfu/" className="mx-2">
            <FaLinkedinIn size={20}/>
          </a>
          <a href="https://twitter.com/FevenSeyfu" className="mx-2">
            <FaXTwitter size={20}/>
          </a>
          <a href="https://fevenseyfu.medium.com/" className="mx-2">
            <FaMedium size={20}/>
          </a>
          <a href="fevensey@gmail.com" className="mx-2">
            <IoMailOutline size={20}/>
          </a>
        </div>
        <p className="text-s mt-2 whitespace-normal text-center">&copy; 2023 QuillHub.<br />Built by <a href="https://www.linkedin.com/in/fevenseyfu/" className='hover:underline'>Feven Seyfu</a><br />All rights reserved.</p>
      </div>
     
    </div>
    </>
  )
}

export default SideBar