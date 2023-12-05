import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, reset } from '../../features/comment/commentSlice';
import Spinner from '../../components/Spinner';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const ShowComments = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { comments, isLoading, isError, message } = useSelector(
    (state) => state.comment
  );

  React.useEffect(() => {
    dispatch(getComments(postId));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, postId]);

  return (
    <Modal
      isOpen={true}
      contentLabel="Delete Post Modal"
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2>Comments</h2>
      {isLoading && <Spinner />}
      {isError && <div>Error: {message}</div>}
      {!isLoading && !isError && comments.length === 0 && (
        <p>No comments available.</p>
      )}
      {!isLoading && !isError && comments.length > 0 && (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <p>{comment.content}</p>
              <Link to={`/posts/${postId}/comments/edit/${comment._id}`}>
                Edit
              </Link>
              <Link to={`/posts/${postId}/comments/delete/${comment._id}`}>
                Delete
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};

export default ShowComments;
