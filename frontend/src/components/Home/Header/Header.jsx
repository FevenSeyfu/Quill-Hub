import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import {
  FaRegHeart,
  FaBook,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { TiPen } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../../features/auth/authSlice";
import Logo from '../../../assets/logo-no-bg.png'
import SearchBar from "../Side/SearchBar";

const Header = ({ headerName }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/users/");
  };
  let sidebarHidden= window.innerWidth <= 768;
  return (
    <div className="flex items-center justify-between align-center">
        <div className="flex flex-col w-full lg:hidden">
            <Link to="/" className="flex flex-row items-center">
            <img src={Logo} alt="Logo" className="w-24 h-16"/>
            <h2 className='font-bold text-lg text-gray-soft-white'>QuillHUB</h2>
          </Link>
          <div className=" flex flex-row w-full justify-between">
            <Link to={"/"}>
              <div className="flex items-center p-4">
                <FaRegHeart size={24} className="mr-2 text-purple-telemagnet" />
                <span className="text-lg font-bold">{headerName}</span>
              </div>
            </Link>
            <SearchBar className="w-2/6"/>
          </div>
        </div>
          <Link to={"/"} className="hidden lg:flex">
            <div className="flex items-center p-2">
              <FaRegHeart size={24} className="mr-2 text-purple-telemagnet" />
              <span className="text-lg font-bold">{headerName}</span>
            </div>
          </Link>
      {user ? (

        <div className="absolute right-3 top-3 flex flex-row gap-2 items-center justify-center">
          <Link
            to="/posts/create"
            className="flex items-center hover:underline hover:text-soft-orange"
          >
            <TiPen size={30} />
            write
          </Link>
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="focus:outline-none hover:underline hover:text-soft-orange"
          >
            <RxAvatar size={30} />
          </button>
          {isMenuOpen && (
          <div className="absolute top-8 right-4 border-2  rounded-md shadow-2xl w-40 p-4 z-50 bg-soft-white">
            <>
              <Link
                to="/users/profile"
                className="flex items-center mb-2 hover:underline hover:text-soft-orange"
              >
                <FaUser className="mr-2" />
                Profile
              </Link>
              <Link
                to="/posts"
                className="flex items-center mb-2 hover:underline hover:text-soft-orange"
              >
                <FaBook className="mr-2" />
                My Stories
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center hover:underline hover:text-soft-orange"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </>
          </div>)}
        </div>
      ) : (
        <div className="absolute right-3 top-3 flex flex-row gap-2 items-center justify-center">
          <Link
            to="/users/login"
            className="flex items-center hover:underline hover:text-soft-orange"
          >
            <FaSignInAlt size={20} /> Login
          </Link>
          <Link
            to="/users/"
            className="flex items-center hover:underline hover:text-soft-orange"
          >
            <FaUser size={20} />
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
