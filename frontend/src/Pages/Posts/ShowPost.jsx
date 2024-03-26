import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost, reset } from "../../features/post/postSlice";
import { getComments } from "../../features/comment/commentSlice";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Header from "../../components/Home/Header/Header";
import CreateComment from "../Comments/CreateComment";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { GrLike } from "react-icons/gr";
import ShowComments from "../Comments/ShowComments";

const ShowPost = () => {
  const dispatch = useDispatch();
  const { id: postId } = useParams();
  const { posts, isSuccess, isLoading } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        await dispatch(getPost(postId));
      } catch (error) {
        toast.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [dispatch, postId]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(getComments(postId));
    }
  }, [dispatch, postId, isSuccess]);
  
  if (isLoading) {
    return <Spinner className="m-50" />;
  }


  const { title, content, tags, author, Image, category } = posts;

  return (
    <>
      <Header sidebarVisible={true} headerName={title} />
      <div className="flex flex-col md:flex-row  w-full">
        <div className="max-w-2xl mx-auto mt-8 p-4 bg-soft-range shadow-md">
          <div className="flex justify-between flex-col md:flex-row">
            <h1 className="text-3xl font-bold mb-4">
              {title && title.toUpperCase()}
            </h1>
            {user && user.id === author && (
              <div className="flex gap-2 flex-row">
                <Link to={`/posts/edit/${posts._id}`} className="flex flex-row items-center text-md md:text-2xl">
                  <TiEdit className="text-green font-bold hover:underline " />
                  <p className="text-gray-light text-sm">Edit</p>
                </Link>
                <Link
                  to={`/posts/delete/${posts._id}`}
                  className="flex flex-row items-center text-md md:text-2xl"
                >
                  <MdDeleteForever className="text-red font-bold hover:underline" />
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
                src={Image.url}
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
        <div className="flex flex-col lg:w-2/6 md:w-full mx-auto mt-8 px-9 bg-soft-range shadow-md">
          <h3 className="font-bold text-lg mb-2">Comments...</h3>
          <CreateComment postId={posts._id}/>
          <ShowComments post={posts._id}/>
        </div>
      </div>
    </>
  );
};

export default ShowPost;
