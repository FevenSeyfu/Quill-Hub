import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../Spinner";
import { getComments } from "../../../features/comment/commentSlice";
import { toast } from "react-toastify";

const PostsList = ({ posts }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.post);
  const [commentsCounts, setCommentsCounts] = useState({});

  useEffect(() => {
    const fetchCommentsCount = async (id) => {
      try {
        const comments = await dispatch(getComments(id));
        return comments.payload.length;
      } catch (error) {
        toast.error("Error fetching Comments:", error);
        return 0
      }
    };

    const fetchCommentsCountsForPosts = async () => {
      const counts = {};

      const countsPromises = posts.map(async (post) => {
        const count = await fetchCommentsCount(post._id);
        counts[post._id] = count;
      });

      await Promise.all(countsPromises);
      setCommentsCounts(counts);
    
    };

    fetchCommentsCountsForPosts();
   
  }, [dispatch, posts]);

  return (
    <div
      className={`max-w-ful grid ${
        posts.length === 1
          ? "grid-cols-1 w-full"
          : "md:grid-cols-2 w-full"
      } gap-8 p-8`}
    >
      {isLoading ? (
        <Spinner />
      ) :  (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            commentsCount={commentsCounts[post._id] || 0}
          />
        ))
      )}
    </div>
  );
};

export default PostsList;
