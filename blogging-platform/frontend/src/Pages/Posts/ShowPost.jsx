import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost, reset } from "../../features/post/postSlice";
import { getComments } from "../../features/comment/commentSlice";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Header from "../../components/Home/Header/Header";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { GrLike } from "react-icons/gr";
// import ShowComments from "../Comments/ShowComments";

const ShowPost = () => {
  const dispatch = useDispatch();
  const { id: postId } = useParams();
  const { posts, isSuccess, isLoading } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    const fetchPost = async () => {
      try {
        dispatch(getPost(postId));
      } catch (error) {
        toast.error("Error fetching post:", error);
      }
    };

    fetchPost();
    if (isSuccess) {
      dispatch(getComments(postId));
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, postId]);

  const { comments } = useSelector((state) => state.comment);
  if (isLoading) {
    return <Spinner />;
  }
  const handleDate = (dateInput) => {
    const date = new Date(dateInput);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };
  const { title, content, tags,author, Image, category } = posts;

  return (
    <>
      <Header sidebarVisible={true} headerName={title} />
      <div className="flex flex-row">
        <div className="max-w-2xl mx-auto mt-8 p-4 bg-soft-range shadow-md">
          <div className="flex flex-row justify-between">
            <h1 className="text-3xl font-bold mb-4">
              {title && title.toUpperCase()}
            </h1>
            {author === user.user._id &&(
              <div className="flex flex-row gap-2">
              <Link to={`/posts/edit/${posts._id}`} className="flex flex-row">
                <TbEdit className="text-green font-bold hover:underline text-3xl" />
                <p className="text-gray-light text-sm">Edit</p>
              </Link>
              <Link to={`/posts/delete/${posts._id}`} className="flex flex-row">
                <MdDeleteForever className="text-red font-bold hover:underline text-3xl" />
                <p className="text-gray-light text-sm">Delete</p>
              </Link>
            </div>
            )}
          </div>
          <div className="w-full rounded-lg overflow-hidden shadow-2xl  relative">
            {tags && (
              <div className="absolute top-0 left-0 bg-soft-orange text-soft-white px-2 py-1 m-2  rounded-lg">
                {tags[0]}
              </div>
            )}
          {Image && (
            <img
              src={Image}
              alt={title}
              className="mb-4 rounded-lg shadow-md max-h-96 w-full object-cover"
            />
          )}
          </div>
          <h3 className="text-gray mb-2">
            <span className="text-lg font-bold text-gray-dark">
              Category :{" "}
            </span>
            {category}
          </h3>
          <div className="text-gray-dark leading-7">{content}</div>
        </div>
        <div className="w-2/6 mx-auto mt-8 px-9 bg-soft-range shadow-md">
          <h3 className="font-bold text-lg">Comments...</h3>
          {comments && (
            <ul>
              {comments.map(
                (comment, idx) =>
                  idx < 5 && (
                    <li
                      key={comment._id}
                      className="border p-2 mb-2 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <p className="bg-soft-orange text-white px-2 py-1 rounded">
                          {comment.userName}
                        </p>
                        <p className="">{comment.content}</p>
                      </div>
                      <p className="text-gray-light">
                        @{comment.createdAt && handleDate(comment.createdAt)}
                      </p>
                      {comment.userId === user.user._id &&(
                         <div className="flex flex-row gap-2">
                          <Link to={`/posts/${posts._id}/comments/edit/${comment._id}`} className="flex flex-row">
                            <TbEdit className="text-green hover:underline text-3xl" />
                          </Link>
                          <Link to={`/posts/${posts._id}/comments/delete/${comment._id}`} className="flex flex-row">
                            <GrLike className="text-gray-dark hover:underline text-2xl" />
                          </Link>
                          <Link to={`/posts/${posts._id}/comments/${comment._id}/like`} className="flex flex-row">
                            <MdDeleteForever className="text-red hover:underline text-3xl" />
                          </Link>
                        </div>
                        )}
                    </li>
                  )
              )}
            </ul>
          )}
          <Link
            to={`/posts/comments/${posts._id}/`}
            className="text-soft-orange hover:underline"
          >
            View All Comments...
          </Link>
        </div>
      </div>
    </>
  );
};

export default ShowPost;
