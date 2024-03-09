import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { updatePost,getPost } from "../../features/post/postSlice";
import { useParams,useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import Spinner from '../../components/Spinner';
import Header from '../../components/Home/Header/Header'; 
import {toast} from 'react-toastify'

const EditPost = () => {
  const dispatch = useDispatch();
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    Image: "",
    category: "",
  });
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await dispatch(getPost(postId));
        let post = response.payload;
        setFormData({
          title: post.title,
          content: post.content,
          tags: post.tags,
          Image: post.Image,
          category: post.category,
        })
      } catch (error) {
        toast.error(error.message); 
      }
    };

    fetchPost();
    
  },[dispatch, postId])

  const handleChange = async (e) => {
    if (e.target.name === 'Image') {
      const file = e.target.files[0];

      if (file) {
        try {
          const compressedFile = await imageCompression(file, {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 800,
          });

          const reader = new FileReader();

          reader.onloadend = () => {
            setFormData((prevState) => ({
              ...prevState,
              Image: reader.result,
            }));
          };

          reader.readAsDataURL(compressedFile);
        } catch (error) {
          console.error('Error compressing image:', error);
        }
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(updatePost({ postId, updatedData: formData }));
      navigate(`/posts/user/${user.id}`);
    } catch (error) {
      toast.error(error.message); 
    }
  };

  return (
    <>
      <div className="shadow-2xl mb-2">
        <Header headerName={"Update Your Post"} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto rounded shadow-lg px-10 py-7 "
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-4xl font-bold text-gray">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Insert Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full shadow-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-600"
          >
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={10}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-600"
          >
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Post Image
          </label>
          {formData.Image && (
            <img src={formData.Image} alt={formData.title} className="mb-4 rounded-lg shadow-md max-h-96 w-full object-cover" />
          )}
          <input
            type="file"
            id="Image"
            name="Image"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Personal-development">Personal Development</option>
            <option value="Finance">Finance</option>
            <option value="Business">Business</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Science">Science</option>
            <option value="Social-issues">Social Issues</option>
            <option value="Parenting">Personal</option>
          </select>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md bg-soft-orange"
          >
            Update Blog Post
          </button>
        </div>
      </form>
    </>
  )
}

export default EditPost