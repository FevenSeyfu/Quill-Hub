import { Post } from "../models/postsModel.js";
// import { User } from "../models/userModel.js";
import { Comment } from "../models/commentModel.js";

export const createComment = async (request, response) => {
  const { postId, content } = request.body;

  try {
    if (!postId || !content) {
      return response
        .status(400)
        .send({ message: "Please provide post ID and comment content" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return response.status(404).send({ message: "Post not found" });
    }

    const newComment = {
      post: postId,
      userId: request.user.id,
      content,
    };

    const comment = await Comment.create(newComment);

    return response.status(201).send(comment);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

// returns all comments of a post
export const getComments = async (request, response) => {
  const { postId } = request.params;
  try {
    const comments = await Comment.find({ post: postId }).populate(
      "userId",
      "userName"
    );
    return response.status(200).send(comments);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

// returns all details of a certian comment
export const getComment = async (request, response) => {
  try {
    const {id} = request.params;
    const comment = await Comment.findById(id);
    return response.status(200).send(comment);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: "Server Error" });
  }
};

export const updateComment = async (request, response) => {
  const { id } = request.params;

  try {
    const result = await Comment.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Comment not found" });
    }

    return response
      .status(200)
      .send({ message: "Comment updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export const deleteComment = async (request, response) => {
  const { id } = request.params;

  try {
    const result = await Comment.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Comment not found" });
    }

    return response
      .status(200)
      .send({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export const likeComment = async (request, response) => {
  const { commentId } = request.params;
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return response.status(404).json({ message: "Comment not found." });
    }

    if (!comment.likes.includes(request.user.id)) {
      comment.likes.push(request.user.id);
      await comment.save();
    }

    return response
      .status(200)
      .json({ message: "Comment liked successfully." });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};
