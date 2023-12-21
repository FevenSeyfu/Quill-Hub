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
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
  
      const date = new Date(dateInput);
      const monthName = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
  
      return `${monthName} ${day}, ${year}`;
    };

  const getFirstParagraphLimited = (content) => {
    const words = content.split(" ");
    const limitedWords = words.slice(0, 10);
    return limitedWords.join(" ");
  };

  
  return (
    <div className="w-full min-h-fit rounded-lg overflow-hidden shadow-md shadow-gray relative">
      <div className="absolute top-0 left-0 bg-soft-orange text-soft-white px-2 py-1 m-2  rounded-lg">
        {tags[0]}
      </div>
      {Image ? (
        <img
          className="rounded-lg overflow-hidden items-center h-3/6 w-full"
          src={Image}
          alt={title}
        />
      ) : (
        <div className="bg-black rounded-lg overflow-hidden items-center h-3/6 w-full">
          <div className="text-white pt-20  text-lg text-center p-4">
            {title.toUpperCase()}
          </div>
        </div>
      )}
      <div className="flex flex-col">
      <div className="p-2">
        <h2 className="font-bold text-gray">{title.toUpperCase()}</h2>
        <p className="text-gray-dark break-words text-sm">
          {content && getFirstParagraphLimited(content)}
        </p>
      </div>
      <div className="px-2">
        <p className="text-gray-500 text-sm">
          By:
          {authorName}
        </p>
        <div className="flex flex-row items-center gap-1">
          <p className="text-gray-500 text-sm">
            Date: {createdAt && handleDate(createdAt)}
          </p>
         <div className="flex flex-row gap-1">
         <p className="flex flex-row items-center text-gray-500 text-md">
            <FaHeart className="text-red pr-1 text-lg" /> {":"}
            {votesCount}
          </p>
          <p className="flex flex-row items-center text-gray-500 text-md">
              <FaCommentDots className="text-gray pr-1 text-lg" /> {":"}
            {commentsCount}
          </p>
         </div>
        </div>
      </div>
      <div className="pb-4">
      <Link to={`/posts/details/${post._id}`}>
          <p className=" text-black  hover:text-soft-orange p-2 hover:underline">
            ReadMore..
          </p>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default PostCard;
