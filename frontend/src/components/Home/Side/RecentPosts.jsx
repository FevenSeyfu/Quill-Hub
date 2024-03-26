import React, { useState, useEffect } from "react";
import { IoChevronDown,IoChevronUp } from "react-icons/io5";
import { getRecentPosts, reset } from "../../../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const SkeletonPost = () => {
  return (
    <div className="flex mb-4 animate-pulse">
      <div className="w-1/3 h-20 bg-gray-200 rounded"></div>
      <div className="w-2/3 pl-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
};
const RecentPosts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visiblePosts, setVisiblePosts] = useState(2);
  const [expandRecentPosts, setExpandRecentPosts] = useState(false);

  useEffect(() => {
    dispatch(getRecentPosts());
    if (isError) {
      toast.error(message);
    }
    console.log(recentPosts);
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  const { recentPosts, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.post
  );
  const handleExpandClick = () => {
    setVisiblePosts(recentPosts.length);
    setExpandRecentPosts(true);
  };
  const handleDropExpand = () => {
    setVisiblePosts(2);
    setExpandRecentPosts(false);
  };
  const showPostDetails = (id) => {
    navigate(`/posts/details/${id}`);
  };
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

  function capitalize(sentence) {
    return sentence
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="recent-posts">
      <h2 className="text-xl font-2 my-3">Recent Posts</h2>
      {isLoading && Array.from({ length: 2 }).map((_, index) => <SkeletonPost key={index} />)}
      {recentPosts.slice(0, visiblePosts).map((post) => (
        <div key={post._id} className="flex mb-4">
          <div className="w-1/3">
            {post.Image.url ? (
              <img
                src={post.Image.url}
                alt={`Recent Post ${post._id}`}
                className="w-full h-20 object-cover rounded"
                onClick={()=>showPostDetails(post._id)}
              />
            ) : (
              <div className="bg-black rounded-lg overflow-hidden items-center h-3/6 w-full">
                <div className="text-white pt-20  text-lg text-center p-4">
                  {post.title.toUpperCase()}
                </div>
              </div>
            )}
          </div>
          <div className="w-2/3 pl-4">
            <p className="text-base font-semibold mb-1">
              {post.title && capitalize(post.title)}
            </p>
            <p className="text-sm font-light">
              Date: {post.createdAt && handleDate(post.createdAt)}
            </p>
          </div>
        </div>
      ))}
      {recentPosts.length > 2 && !expandRecentPosts ? (
        <button
          className="text-gray-500 hover:underline cursor-pointer px-32"
          onClick={handleExpandClick}
        >
          <IoChevronDown size={20} />
        </button>
      ):(
        <button
          className="text-gray-500 hover:underline cursor-pointer px-32"
          onClick={handleDropExpand}
        >
          <IoChevronUp size={20} />
        </button>
      )}
    </div>
  );
};

export default RecentPosts;
