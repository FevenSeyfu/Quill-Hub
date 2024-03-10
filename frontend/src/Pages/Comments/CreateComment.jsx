import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, reset } from "../../features/comment/commentSlice";
import { getPosts } from "../../features/post/postSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import Modal from "react-modal";
import Spinner from "../../components/Spinner";
import Layout from "../../components/Layout";

Modal.setAppElement("#root");

const CreateComment = ({ postId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { postId } = useParams();
  const [commentContent, setCommentContent] = useState("");
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.comment
  );

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit(e);
    }
  };
  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) {
      toast.error("Please write Comment");
      return;
    }
    dispatch(createComment({ post: postId, content: commentContent }));
    if (isSuccess) {
      navigate(`/posts/user/${user.id}`);
    }

    if (isError) {
      toast.error(message);
    }
    setCommentContent("");
  };

  return (
    <div className="bg-white p-8 rounded">
      <form onSubmit={handleCommentSubmit}>
        <textarea
          className="w-full p-2 border rounded"
          rows="3"
          placeholder="Write your comment..."
          value={commentContent}
          onChange={handleCommentChange}
          onKeyPress={handleKeyPress}
        ></textarea>
        {/* <button
            type="submit"
            className="border-4 border-soft-orange text-soft-orange py-2 px-4 mt-2 rounded font-bold hover:border-3 hover:bg-soft-orange hover:text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Comment'}
          </button> */}
      </form>
    </div>
  );
};

export default CreateComment;
