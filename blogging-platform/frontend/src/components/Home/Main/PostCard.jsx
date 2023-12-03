import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

// icons
import { BiSolidShow } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

const PostCard = ({ post }) => {
  const { user } = useSelector((state) => state.auth)
  const { title, author, createdAt, votes, Image, tags } = post;

  const handleDate = (dateInput) => {
    const date = new Date(dateInput);
    const formattedDate = date.toISOString().split('T')[0];
     return formattedDate
  }
  
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
            <b>By: </b>{authorName}
          </p>
          <p className="text-gray-500 text-sm mr-2">
            <b>Date:</b> {createdAt && (handleDate(createdAt))}
          </p>
          <p className="text-gray-500 text-sm">
            <span className="mr-1">❤️</span>
            {votes}
          </p>
        </div>
      </div>
      <div className="flex flex-row relative justify-between bottom-0  m-2">
          <Link to={`/posts/details/${post._id}`}>
              <BiSolidShow className="text-blue font-bold hover:underline text-3xl"/>
          </Link>
          <Link to={`/posts/edit/${post._id}`}>
              <TbEdit className="text-green font-bold hover:underline text-3xl"/>
          </Link>
          <Link to={`/posts/delete/${post._id}`}>
              <MdDeleteForever className="text-red font-bold hover:underline text-3xl"/>
          </Link>
        </div>
    </div>
  );
};

export default PostCard;
