import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { deleteComment,reset } from '../../features/comment/commentSlice';
import Spinner from '../../components/Spinner';

const DeleteComment = () => {
  const { commentId, postId } = useParams();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.comment
  );

  const handleDeleteComment = () => {
    dispatch(deleteComment(commentId));
  };

  React.useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <div>
      <h2>Delete Comment</h2>
      {isLoading && <Spinner />}
      {isError && <div>Error: {message}</div>}
      {isSuccess && (
        <div>
          <p>Comment deleted successfully!</p>
          <Link to={`/posts/${postId}/comments`}>Back to Comments</Link>
        </div>
      )}
      {!isLoading && !isSuccess && (
        <div>
          <p>Are you sure you want to delete this comment?</p>
          <button onClick={handleDeleteComment}>Delete</button>
          <Link to={`/posts/${postId}/comments`}>Cancel</Link>
        </div>
      )}
    </div>
  );
};

export default DeleteComment;
