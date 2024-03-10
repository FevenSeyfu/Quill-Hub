import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments,
  reset,
  likeComment,
} from "../../features/comment/commentSlice";
import Spinner from "../../components/Spinner";
import Modal from "react-modal";
import { MdDeleteForever } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { GrLike } from "react-icons/gr";
import { toast } from "react-toastify";
import BackButton from "../../components/BackButton";

Modal.setAppElement("#root");

const ShowComments = ({ post }) => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { comments, isLoading, isError, message } = useSelector(
    (state) => state.comment
  );

  useEffect(() => {
    const fetchComment = async () => {
      try {
        await dispatch(getComments(postId));
      } catch (error) {
        toast.error("Error fetching comments:", error);
      }
    };
    fetchComment();

    return () => {
      dispatch(reset());
    };
  }, [dispatch, postId]);

  const [likeCount, setLikeCount] = useState({});

  const handleLikeComment = async (commentId) => {
    try {
      await dispatch(likeComment(commentId));
      setLikeCount((prevCount) => ({
        ...prevCount,
        [commentId]: (prevCount[commentId] || 0) + 1,
      }));
    } catch (error) {
      toast.error("Error liking comment:", error);
    }
  };

  const handleDate = (dateInput) => {
    const date = new Date(dateInput);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };

  return (
    <div className="bg-white p-8">
      {isLoading ? (
        <Spinner />
      ) : (
        comments && (
          <ul>
            {comments.map(
              (comment, idx) =>
                idx < 5 && (
                  <li
                    key={comment._id}
                    className="border-b p-2 mb-2 flex flex-col"
                  >
                    <div className="flex items-start  gap-8">
                      <p className="bg-soft-orange text-white px-2 py-1 rounded">
                        {comment.userName}
                      </p>
                      <p className="">{comment.content}</p>
                      <p className="text-gray-light">
                      @{comment.createdAt && handleDate(comment.createdAt)}
                    </p>
                    </div>
                    {user && user && user.id === comment.userId && (
                      <div className="flex flex-row gap-2">
                        <Link
                          to={`/posts/$post/comments/edit/${comment._id}`}
                          className="flex flex-row"
                        >
                          <TiEdit className="text-green hover:underline text-3xl" />
                        </Link>
                        <Link
                          to={`/posts/$post/comments/${comment._id}/like`}
                          className="flex flex-row"
                        >
                          <GrLike className="text-gray-dark hover:underline text-2xl" />
                        </Link>
                        <Link
                          to={`/posts/$post/comments/delete/${comment._id}`}
                          className="flex flex-row"
                        >
                          <MdDeleteForever className="text-red hover:underline text-3xl" />
                        </Link>
                      </div>
                    )}
                  </li>
                )
            )}
          </ul>
        )
      )}
    </div>
  );
};

export default ShowComments;
