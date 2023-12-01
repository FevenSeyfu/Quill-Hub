import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Header from "../../components/Home/Header/Header";
import Spinner from "../../components/Spinner";
import BackButton from "../../components/BackButton";

const CreatePosts = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    image: "",
    category: "",
  });

  const { title, content, tags, image, category } = formData;

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
  
      if (file) {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          setFormData((prevState) => ({
            ...prevState,
            image: reader.result,
          }));
        };
  
        reader.readAsDataURL(file);
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

    onSubmit(formData);
  };
  return (
    <>
      <div className="shadow-2xl mb-2">
        <Header headerName={'Write Your Story'}/>
        <BackButton destination={'/posts'}/>
      </div>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto rounded shadow-lg px-10 py-7 ">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-4xl font-bold text-gray"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Insert Title"
            value={title}
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
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
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
            value={tags}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={category}
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
            Post Blog
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePosts;
