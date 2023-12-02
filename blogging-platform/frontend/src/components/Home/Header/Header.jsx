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

const Header = ({ sidebarVisible, headerName }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/users/");
  };
  return (
    <div
      className={`flex items-center justify-between p-4 ${
        sidebarVisible ? "ml-64" : "ml-16"
      }`}
    >
      <div className="flex items-center">
        <FaRegHeart size={24} className="mr-2 text-purple-telemagnet" />
        <span className="text-lg font-bold">{headerName}</span>
      </div>

      <div className="absolute right-3 top-3 flex flex-row gap-2 items-center justify-center  ">
        {user && (
          <Link
            to="/posts/create"
            className="flex items-center hover:underline hover:text-soft-orange"
          >
            <TiPen size={30} />
            write
          </Link>
        )}
        <button
          onClick={() => setMenuOpen(!isMenuOpen)}
          className="focus:outline-none hover:underline hover:text-soft-orange"
        >
          <RxAvatar size={30} />
        </button>
        {isMenuOpen && (
          <div className="absolute top-8 right-4 border-2  rounded-md shadow-2xl w-40 p-4 z-50 bg-soft-white">
            {user ? (
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
            ) : (
              <>
                <Link
                  to="/users/login"
                  className="flex items-center hover:underline hover:text-soft-orange"
                >
                  <FaSignInAlt size={30} /> Login
                </Link>
                <Link
                  to="/users/"
                  className="flex items-center hover:underline hover:text-soft-orange"
                >
                  <FaUser size={30} />
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
