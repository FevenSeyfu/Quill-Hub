import React from "react";
import {FaRegHeart} from "react-icons/fa";
import Avatar from "./Avatar";
import { Link } from "react-router-dom"
const Header = ({ sidebarVisible, headerName }) => {
  
  return (
    <div
      className={`flex items-center justify-between p-4 ${
        sidebarVisible ? "ml-64" : "ml-16"
      }`}
    >
      <Link to={'/posts/'}>
        <div className="flex items-center">
            <FaRegHeart size={24} className="mr-2 text-purple-telemagnet" />
            <span className="text-lg font-bold">{headerName}</span>
        </div>
      </Link>

      <Avatar />
    </div>
  );
};

export default Header;
