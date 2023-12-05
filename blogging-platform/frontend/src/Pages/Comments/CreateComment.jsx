import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment,reset } from "../../features/comment/commentSlice";
import { getPosts } from "../../features/post/postSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import Modal from "react-modal";
import Spinner from "../../components/Spinner";
import Layout from "../../components/Layout";


Modal.setAppElement("#root");

const CreateComment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [commentContent, setCommentContent] = useState('');
  const {  isLoading,isSuccess, isError, message } = useSelector((state) => state.comment);

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim())  {
        toast.error("Please write Comment");
      return;
    }
    dispatch(createComment({ post: postId, content:commentContent }));
    setCommentContent('')
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate('/posts/');
    }

    if(isError){
      toast.error(message)
    }
  }, [isSuccess, isError, dispatch]);
  return (
    <Layout>
      <Modal
      isOpen={true}
      contentLabel="Write Comment"
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white p-8 rounded">
        <h1 className="text-3xl font-bold mb-4">Add a Comment</h1>
        {isLoading ? 
        (<Spinner />):(
          <form onSubmit={handleCommentSubmit}>
          <textarea
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Write your comment..."
            value={commentContent}
            onChange={handleCommentChange}
          ></textarea>
          <button
            type="submit"
            className="border-4 border-soft-orange text-soft-orange py-2 px-4 mt-2 rounded font-bold hover:border-3 hover:bg-soft-orange hover:text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Comment'}
          </button>
        </form>
        )}
      </div>
    </Modal>
    </Layout>
  );
};

export default CreateComment;
