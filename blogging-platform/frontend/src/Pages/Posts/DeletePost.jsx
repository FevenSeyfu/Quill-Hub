import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost, reset } from '../../features/post/postSlice';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const DeletePost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state) => state.post.isLoading);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleDelete = async () => {
    try {
      await dispatch(deletePost(id));
      toast.success('Post deleted successfully!');
      navigate('/posts');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCancel = () => {
    navigate('/posts');
  };

  return (
    <Modal
      isOpen={true}
      contentLabel="Delete Post Modal"
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white p-8 rounded">
        <h1 className="text-3xl font-bold mb-4">Delete Post</h1>
        <p className="text-gray mb-4">
          Are you sure you want to delete this post?
        </p>
        <div className="flex justify-between">
          <button
            className="bg-red text-white px-4 py-2 rounded mr-2"
            onClick={handleDelete}
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
      </div>
    </Modal>
  );
};

export default DeletePost;
