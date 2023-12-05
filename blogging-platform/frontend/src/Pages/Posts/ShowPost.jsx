import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost, reset } from "../../features/post/postSlice";
import { getComments } from "../../features/comment/commentSlice";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Header from "../../components/Home/Header/Header";
import { Link } from "react-router-dom";
// import ShowComments from "../Comments/ShowComments";

const ShowPost = () => {
  const dispatch = useDispatch();
  const { id: postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        dispatch(getPost(postId));
        dispatch(getComments(postId));
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();

    return () => {
      dispatch(reset());
    };
  }, [dispatch, postId]);
  const { posts, isLoading } = useSelector((state) => state.post);
  const { comments } = useSelector((state) => state.comment);
  if (isLoading) {
    return <Spinner />;
  }
  const { title, content, tags, Image, category } = posts;

  return (
    <>
      <Header sidebarVisible={true} headerName={title} />
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-soft-range shadow-md">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold mb-4">
            {title && title.toUpperCase()}
          </h1>
          {tags && (
            <div className="flex mb-4 ">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-light-orange px-1 py-1 text-md text-white rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {Image && (
          <img
            src={Image}
            alt={title}
            className="mb-4 rounded-lg shadow-md max-h-96 w-full object-cover"
          />
        )}
        <h3 className="text-gray mb-2">
          <span className="text-lg font-bold text-gray-dark">Category : </span>
          {category}
        </h3>
        <div className="text-gray-dark leading-7">{content}</div>
        <div>
        {comments && (
          <ul>
            {comments.map(
              (comment, idx) =>
                idx < 5 && (
                  <li key={comment._id}>
                    <p>{comment.content}</p>
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
