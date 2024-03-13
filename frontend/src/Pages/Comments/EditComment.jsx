import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getComment,
  updateComment,
  reset,
} from "../../features/comment/commentSlice";
import { toast } from "react-toastify";

const EditComment = ({ commentId, postId }) => {
  const dispatch = useDispatch();

  const { comment, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.comment
  );

  const [editedComment, setEditedComment] = useState("");

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await dispatch(getComment(commentId));
        let comment = response.payload;
        setEditedComment(comment.content);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchComment();
  }, [dispatch, commentId]);

  const handleEditComment = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateComment({ commentId, commentData: { content: editedComment } })
      );
      if(isSuccess){
        toast.success("Comment updated successfully!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleEditComment}>
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
          {isLoading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default EditComment;
