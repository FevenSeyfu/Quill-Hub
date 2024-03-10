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
import { RxAvatar } from "react-icons/rx";
import { formatDistanceToNow, format } from "date-fns";

Modal.setAppElement("#root");

const ShowComments = ({ post }) => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { comments, isLoading, isError, message } = useSelector(
    (state) => state.comment
  );

  // restrict comments shown
  const [showAllComments, setShowAllComments] = useState(false);

  const handleViewAllComments = () => {
    setShowAllComments(true);
  };

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
    const now = new Date();
    const diffInHours = (now - date) / 1000 / 60 / 60;

    if (diffInHours < 1) {
      return formatDistanceToNow(date) + " ago";
    } else if (diffInHours < 12) {
      return "today";
    } else if (diffInHours < 24) {
      return "yesterday";
    } else if (diffInHours < 168) {
      return format(date, "EEEE");
    } else if (diffInHours < 336) {
      return "last week";
    } else if (diffInHours < 672) {
      return "2 weeks ago";
    } else {
      return format(date, "EEE dd MMM, yyyy");
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        comments && (
          <ul>
            {comments.slice(0, showAllComments ? comments.length : 3).map(
              (comment, idx) =>
                idx < 5 && (
                  <li
                    key={comment._id}
                    className="w-full flex flex-row items-start gap-4 my-4"
                  >
                    {comment.userId === user.id && user.profileImage ? (
                      <img
                        src={comment.userId === user.id && user.profileImage}
                        alt="commenter profile"
                        className="rounded-full h-8 w-8"
                      />
                    ) : (
                      <RxAvatar size={20} />
                    )}
                    <div className="flex flex-col bg-gray-100 rounded-lg p-2 w-full gap-2">
                      <div className="flex flex-row items-center ">
                        <p className="font-bold">
                          {comment.userId === user.id &&
                            user.firstName + " " + user.lastName}
                        </p>
                        <p className="mx-2 text-lg">•</p>
                        <p className="text-gray-light text-base">
                          {comment.createdAt && handleDate(comment.createdAt)}
                        </p>
                      </div>
                      <p className="text-base text-gray-700">
                        {comment.content}
                      </p>

                      {user && user && user.id === comment.userId && (
                        <div className="flex flex-row items-center gap-4 text-gray-dark text-sm">
                          <Link
                            to={`/posts/$post/comments/edit/${comment._id}`}
                            className="flex flex-row items-center gap-2 hover:underline hover:text-green-600 d"
                          >
                            <TiEdit className="text-green-600 hover:underline" />{" "}
                            Edit
                          </Link>
                          <p>|</p>
                          <Link
                            to={`/posts/$post/comments/${comment._id}/like`}
                            className="flex flex-row items-center gap-2 hover:text-blue-600 hover:underline"
                          >
                            <GrLike className="text-blue-600" /> Like
                          </Link>
                          <p>|</p>
                          <Link
                            to={`/posts/$post/comments/delete/${comment._id}`}
                            className="flex flex-row items-center gap-2 hover:text-red-600 hover:underline "
                          >
                            <MdDeleteForever className="text-red-600 text-lg" />
                            Delete
                          </Link>
                        </div>
                      )}
                    </div>
                  </li>
                )
            )}
          </ul>
        )
      )}
      {!showAllComments && comments && comments.length >= 3 && (
        <button
          className="text-gray-600 ml-12 hover:text-black text-sm"
          onClick={handleViewAllComments}
        >
          View All Comments...
        </button>
      )}
    </div>
  );
};

export default ShowComments;
