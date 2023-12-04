import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../features/comment/commentSlice";
import { toast } from "react-toastify";import { useParams } from 'react-router-dom';

import Modal from "react-modal";

Modal.setAppElement("#root");

const CreateComment = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [commentContent, setCommentContent] = useState({
    post : "",
    userId: "",
    content: ""
  });
  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentData ={
        post : postId,
        userId: user._id,
        content: commentContent
    }
    if (!commentContent.trim()) {
      toast.error("Please write Comment");
      return;
    }

    try {
      await dispatch(createComment(commentData));
      setCommentContent("");
      navigate("/posts");
    } catch (error) {
      toast.error("Error creating comment:", error.message);
    }
  };
  return (
    <Modal
      isOpen={true}
      contentLabel="Delete Post Modal"
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white p-8 rounded">
        <h1 className="text-3xl font-bold mb-4">Add a Comment</h1>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Write your comment..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="border-4 border-soft-orange text-soft-orange py-2 px-4 mt-2 rounded font-bold hover:border-3 hover:bg-soft-orange hover:text-white"
          >
            Post Comment
          </button>
        </form>
      </div> 
    </Modal>
  );
};

export default CreateComment;
