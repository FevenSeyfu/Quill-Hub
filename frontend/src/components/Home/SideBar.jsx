import React from 'react'
import { IoChevronDown } from "react-icons/io5";
import Logo from '../../assets/logo-no-bg.png'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Footer from './Footer';

const SideBar = () => {
  const { user } = useSelector((state) => state.auth);
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
      <Footer className=""/>
    </div>
    </>
  )
}

export default SideBar