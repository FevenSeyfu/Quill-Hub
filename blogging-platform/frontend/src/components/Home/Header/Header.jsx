import React from 'react'
import { RxAvatar } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-8">
      <div className="flex items-center">
        <FaRegHeart size={24} className="mr-2 text-purple-telemagnet" />
        <span className="text-lg font-bold">My Stories</span>
      </div>

      <RxAvatar size={30} />
    </div>
  )
}

export default Header