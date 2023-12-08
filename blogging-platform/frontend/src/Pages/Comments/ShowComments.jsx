import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments, reset, likeComment } from "../../features/comment/commentSlice";
import Spinner from "../../components/Spinner";
import Modal from "react-modal";
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { GrLike } from "react-icons/gr";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const ShowComments = () => {
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
    <Modal
      isOpen={true}
      contentLabel="Show Comments Modal"
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white p-8 rounded">
        <h3 className="text-lg font-bold mb-4">Comments...</h3>
        {isLoading ? (
          <Spinner />
        ) : (
          comments && (
            <ul>
              {comments.map((comment) => (
                <li
                  key={comment._id}
                  className="border p-2 mb-2 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <p className="bg-soft-orange text-white px-2 py-1 rounded">
                      {comment.userName}
                    </p>
                    <p className="text-black">{comment.content}</p>
                  </div>
                  <p className="text-gray-light">
                    @{comment.createdAt && handleDate(comment.createdAt)}
                  </p>
                  {comment.userId === user.user._id ? (
                    <div className="flex flex-row gap-2">
                      <Link
                        to={`/posts/${postId}/comments/edit/${comment._id}`}
                        className="flex flex-row"
                      >
                        <TbEdit className="text-green hover:underline text-3xl" />
                      </Link>
                      <button
                         onClick={() => handleLikeComment(comment._id)}
                        className="flex flex-row"
                      >
                        <GrLike className="text-gray-dark hover:underline text-2xl" />
                      </button>
                      <Link
                        to={`/posts/${postId}/comments/delete/${comment._id}`}
                        className="flex flex-row"
                      >
                        <MdDeleteForever className="text-red hover:underline text-3xl" />
                      </Link>
                    </div>
                  ):(
                    <>
                    <button
                      onClick={() => handleLikeComment(comment._id)}
                      className="flex flex-row"
                      >
                        <GrLike className="text-gray-dark hover:underline text-2xl" />
                      </button>
                      <span className="text-gray-dark">{likeCount[comment._id] || 0}</span>

                    </>
                  )}
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </Modal>
  );
};

export default ShowComments;
