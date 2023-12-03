import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const { user } = useSelector((state) => state.auth)
  const { title, author, date, votes, Image, tags } = post;
  const authorName = user.id === author && user.userName;
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-2xl  relative">
      <div className="absolute top-0 left-0 bg-soft-orange text-white px-2 py-1 m-2  rounded-lg">
        {tags[0]}
      </div>
      <img className="w-full" src={Image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
      <div className="px-6 py-4">
        <div className="post-meta flex flex-col sm:flex-row">
          <p className="text-gray-500 text-sm mr-2">
            By: {authorName}
          </p>
          <p className="text-gray-500 text-sm mr-2">
            Date: {date}
          </p>
          <p className="text-gray-500 text-sm">
            <span className="mr-1">❤️</span>
            {votes}
          </p>
        </div>
        <Link to={`/posts/details/${post._id}`} className="text-soft-orange font-bold hover:underline">
            Read More {'>>'}
          </Link>
      </div>
    </div>
  );
};

export default PostCard;
