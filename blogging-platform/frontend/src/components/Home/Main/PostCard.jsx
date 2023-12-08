import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// icons
import { FaHeart } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";

const PostCard = ({ post, commentsCount }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { title, authorName, content, createdAt, votesCount, Image, tags } =
    post;

  const handleDate = (dateInput) => {
    const date = new Date(dateInput);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const getFirstParagraphLimited = (content) => {
    const words = content.split(" ");
    const limitedWords = words.slice(0, 10);
    return limitedWords.join(" ");
  };

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
        <p className="text-gray-dark break-words">
          {content && getFirstParagraphLimited(content)}
        </p>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-500 text-sm mr-2">
          <b>By: </b>
          {authorName}
        </p>
        <div className="flex flex-row gap-2 sm:flex-col md:flex-col lg:flex-row">
          <p className="text-gray-500 text-sm mr-2 whitespace-nowrap">
            <b>Date:</b> {createdAt && handleDate(createdAt)}
          </p>
          <p className="flex flex-row items-center text-gray-500 text-md">
            <FaHeart className="text-red pr-1 text-lg" /> {":"}
            {votesCount}
          </p>
          <Link to={`/posts/${post._id}/comments/create/`}>
            <p className="flex flex-row items-center text-gray-500 text-md">
              <FaCommentDots className="text-gray pr-1 text-lg" /> {":"}
              {commentsCount}
            </p>
          </Link>
        </div>
      </div>
      <div className="flex flex-row relative justify-between m-2">
        <Link to={`/posts/details/${post._id}`}>
          <p className="text-md font-bold text-soft-orange p-2 hover:bg-soft-orange hover:rounded-md hover:text-white">
            ReadMore..
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
