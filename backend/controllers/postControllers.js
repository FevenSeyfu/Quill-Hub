import { Post } from "../models/postsModel.js";
import { User } from "../models/userModel.js";
import cloudinary from "../utils/cloudinary.js";

export const createPosts = async (request, response) => {
  const { title, content, category, tags, Image } = request.body;
  try {
    const result = await cloudinary.uploader.upload(Image, {
      folder: "posts",
      width: 400,
      crop: "scale",
    });
    if (!title || !content || !category) {
      return response
        .status(400)
        .send({ message: "Please fill all required fields" });
    }
    const newPost = {
      title,
      content,
      author: request.user.id,
      authorName: request.user.firstName + " " + request.user.lastName,
      tags,
      Image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      category,
      status: "posted",
    };
    const post = await Post.create(newPost);
    return response.status(201).send(post);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export const getPosts = async (request, response) => {
  try {
    const posts = await Post.find();
    return response.status(200).send(posts);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export const getMyPosts = async (request, response) => {
    try {
      const userId = request.params.userId;
      const posts = await Post.find({ author: userId });
      return response.status(200).send(posts);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  };

export const getPost = async (request, response) => {
  try {
    const { id } = request.params;
    const post = await Post.findById(id);
    return response.status(200).send(post);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export const updatePost = async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.content ||
      !request.body.category
    ) {
      return response
        .status(400)
        .send({ message: "send all required fields: title,post,category" });
    }
    const { id } = request.params;
    const result = await Post.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Post not found" });
    }
    return response.status(200).send({ message: "Post Updated successfuly" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export const deletePost = async (request, response) => {
  try {
    const { id } = request.params;
    const post = await Post.findById(id);
    const user = await User.findById(request.user.id);

    if (!user) {
      response.status(401).send({ message: "user not found" });
    }
    if (post.author.toString() !== user.id) {
      response.status(401).send({ message: "User not Authorized" });
    }
    const result = await Post.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Post not found" });
    }
    return response.status(200).send({ message: "Post Deleted successfuly" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

// search post
export const searchPosts = async (request, response) => {
  try {
    const { term } = request.query;

    const posts = await Post.find({
      $or: [
        { title: { $regex: term, $options: "i" } },
        { content: { $regex: term, $options: "i" } },
      ],
    });

    return response.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: "Server Error" });
  }
};
