import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getComment, updateComment, reset } from '../../features/comment/commentSlice';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import Layout from '../../components/Layout';

Modal.setAppElement('#root');

const EditComment = () => {
  const { commentId, postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { comment, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.comment
  );

  const [editedComment, setEditedComment] = useState('');

  useEffect(() => {
    const fetchComment = async ()=>{
      try{
        const response = await dispatch(getComment(commentId));
        let comment = response.payload
        setEditedComment(comment.content);
      }catch (error) {
        toast.error(error.message); 
      }
    }
    fetchComment()
  }, [dispatch, commentId]);

  const handleEditComment = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateComment({ commentId, commentData: { content: editedComment } }));
      toast.success('Comment updated successfully!');
      navigate(`/posts/details/${postId}`);
    } catch (error) {
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
        contentLabel="Edit Comment Modal"
        className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="bg-white p-8 rounded">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4">Edit Comment</h1>
              <textarea
                className="w-full h-32 mb-4 p-2 border rounded"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              />
              <div className="flex justify-between">
                <button
                  className="bg-blue text-white px-4 py-2 rounded"
                  onClick={handleEditComment}
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update'}
                </button>
                <button
                  className="bg-gray text-white px-4 py-2 rounded"
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

export default EditComment;
