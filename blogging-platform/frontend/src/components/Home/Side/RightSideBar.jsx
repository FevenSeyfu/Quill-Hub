import React, { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { searchPosts,reset } from '../../../features/post/postSlice';
import RecentPosts from './RecentPosts'

const RightSideBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    dispatch(searchPosts(searchTerm));
  };

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  return (
    <div >
      {/* Search Bar */}
      <div className="mb-4">
        <form onSubmit={handleSearch} className="flex items-center bg-white border-b rounded-full p-2">
          <IoSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 outline-none bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      {/* Popular Posts */}
      <div className="mb-4">
        <h2 className="text-xl font-2 my-3">Popular Posts</h2>
        <div className="relative">
        <img
          src="https://source.unsplash.com/user/wsanter"
          alt="Popular Post Image"
          className="w-full h-40 object-cover rounded"
          style={{ filter: 'blur(2px)' }}
        />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <p className="text-sm font-light mb-1">Date: October 15, 2023</p>
          <p className="text-base font-semibold">Post Title</p>
        </div>
      </div>
      </div>

      <RecentPosts />
    
    </div>
  );
};

export default RightSideBar;