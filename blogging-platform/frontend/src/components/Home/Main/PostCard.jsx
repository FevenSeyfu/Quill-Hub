import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CreateComment from "../../../Pages/Comments/CreateComment";
// icons
import { BiSolidShow } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";


const PostCard = ({ post }) => {
  const { user } = useSelector((state) => state.auth);
  const { title, author, createdAt, votesCount, Image, tags, commentCount } =
    post;

  const handleDate = (dateInput) => {
    const date = new Date(dateInput);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };

  const authorName = user.id === author && user.userName;
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-2xl  relative">
      <div className="absolute top-0 left-0 bg-soft-orange text-soft-white px-2 py-1 m-2  rounded-lg">
        {tags[0]}
      </div>
      {Image ? (
        <img
          className="rounded-lg overflow-hidden items-center h-48 w-full"
          src={Image}
          alt={title}
        />
      ) : (
        <div className="bg-black rounded-lg overflow-hidden items-center h-48 w-full">
          <div className="text-white pt-20  text-lg text-center p-4">
            {title.toUpperCase()}
          </div>
        </div>
      )}
      <div className="px-4 py-3">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
      <div className="px-6 py-4">
        <div className="post-meta flex flex-col sm:flex-col">
          <p className="text-gray-500 text-sm mr-2">
            <b>By: </b>
            {authorName}
          </p>
          <p className="text-gray-500 text-sm mr-2">
            <b>Post Date:</b> {createdAt && handleDate(createdAt)}
          </p>
          <p className="flex flex-row items-center text-gray-500 text-md">
            <FaHeart className="text-red pr-1 text-lg" /> {":"}
            {votesCount}
          </p>
        <Link to={`/posts/${post._id}/comments/create/`}>
          <p className="flex flex-row items-center text-gray-500 text-md">
            <FaCommentDots className="text-gray pr-1 text-lg" /> {":"}
            {commentCount}
          </p>
        </Link>
        </div>
      </div>
      <div className="flex flex-row relative justify-between bottom-0  m-2">
        <Link to={`/posts/details/${post._id}`}>
          <BiSolidShow className="text-blue font-bold hover:underline text-3xl" />
        </Link>
        <Link to={`/posts/edit/${post._id}`}>
          <TbEdit className="text-green font-bold hover:underline text-3xl" />
        </Link>
        <Link to={`/posts/delete/${post._id}`}>
          <MdDeleteForever className="text-red font-bold hover:underline text-3xl" />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
