import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { deleteComment,reset } from '../../features/comment/commentSlice';

import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import Layout from '../../components/Layout';

Modal.setAppElement('#root'); 
const DeleteComment = () => {
  const { commentId, postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.comment
  );

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleDeleteComment = async() => {
    try{
      await dispatch(deleteComment(commentId));
      toast.success('Comment deleted successfully!');
      navigate(`/posts/details/${postId}`);
    }catch (error) {
      toast.error(error.message);
    }
  };
  const handleCancel = () => {
    navigate(`/posts/details/${postId}`);
  };

  return (
    <Layout>
      <Modal
      isOpen={true}
      contentLabel="Delete Comment Modal"
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white p-8 rounded">
        {isLoading ? (
          <Spinner />
        ):(
         <>
          <h1 className="text-3xl font-bold mb-4">Delete Comment</h1>
          <p className="text-gray mb-4">
            Are you sure you want to delete this post?
          </p>
          <div className="flex justify-between">
            <button
              className="bg-red text-white px-4 py-2 rounded mr-2"
              onClick={handleDeleteComment}
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </button>
            <button
              className="bg-blue text-white px-4 py-2 rounded"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
         </>
        )}
      </div>
    </Modal>
    </Layout>
  );
};

export default DeleteComment;
