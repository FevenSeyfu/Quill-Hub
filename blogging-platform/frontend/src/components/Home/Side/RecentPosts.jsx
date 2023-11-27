import React, { useState } from 'react';
import { IoChevronDown } from "react-icons/io5";

const RecentPosts = () => {
  const allRecentPosts = [
    {
      id: 1,
      title: 'Recent Post 1',
      date: 'October 20, 2023',
      imageUrl: 'https://source.unsplash.com/user/wsanter',
    },
    {
      id: 2,
      title: 'Recent Post 2',
      date: 'October 20, 2023',
      imageUrl: 'https://source.unsplash.com/user/wsanter',
    },
    {
      id: 3,
      title: 'Recent Post 3',
      date: 'October 20, 2023',
      imageUrl: 'https://source.unsplash.com/user/wsanter',
    },
    {
      id: 4,
      title: 'Recent Post 4',
      date: 'October 20, 2023',
      imageUrl: 'https://source.unsplash.com/user/wsanter',
    },
    {
      id: 5,
      title: 'Recent Post 5',
      date: 'October 20, 2023',
      imageUrl: 'https://source.unsplash.com/user/wsanter',
    }
  ];
  const [visiblePosts, setVisiblePosts] = useState(2);

  const handleExpandClick = () => {
    setVisiblePosts(allRecentPosts.length);
  };
  return (

    <div className="recent-posts">
      <h2 className="text-xl font-2 my-3">Recent Posts</h2>
      {allRecentPosts.slice(0, visiblePosts).map((post) => (
        <div key={post.id} className="flex mb-4">
          <div className="w-1/3">
            <img
              src={post.imageUrl}
              alt={`Recent Post ${post.id}`}
              className="w-full h-20 object-cover rounded"
            />
          </div>
          <div className="w-2/3 pl-4">
            <p className="text-base font-semibold mb-1">{post.title}</p>
            <p className="text-sm font-light">{`Date: ${post.date}`}</p>
          </div>
        </div>
      ))}
      {allRecentPosts.length > 2 &&(
        <button
          className="text-blue-500 hover:underline cursor-pointer px-32"
          onClick={handleExpandClick}
        >
          <IoChevronDown className='' size={30}/>
        </button>
      )}
    </div>
  );
};

export default RecentPosts