import React from 'react'
import { RxAvatar } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";

const Header = ({sidebarVisible}) => {
  return (
    <div className={`flex items-center justify-between p-4 ${sidebarVisible ? 'ml-64' : 'ml-16'}`}>
      {console.log(sidebarVisible)}
      <div className="flex items-center">
        <FaRegHeart size={24} className="mr-2 text-purple-telemagnet" />
        <span className="text-lg font-bold">My Stories</span>
      </div>

      <RxAvatar size={30} />
    </div>
  )
}

export default Header