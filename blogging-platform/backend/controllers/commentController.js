import { Post } from "../models/postsModel.js";
// import { User } from "../models/userModel.js";
import { Comment } from "../models/commentModel.js";
import mongoose from 'mongoose'

export const createComment = async (request, response) => {
  try {
    const { post, content } = request.body;
    const userId = request.user.id;
    const userName = request.user.userName;

    if (!post) {
        return response.status(400).json({ message: 'Post ID is required' });
      }
    
      const existingPost = await Post.findById(post);
    if (!existingPost) {
      return response.status(404).json({ message: 'Post not found' });
    }
    const newComment = {
      post,
      userId,
      content,
      userName,
    };

    const comment = await Comment.create(newComment);
    return response.status(201).json(comment);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: "Server Error" });
  }
};

// get all comments of a post
export const getComments = async (request, response) => {
  try {
    const { postId } = request.params;
    const comments = await Comment.find({ post: postId });

    return response.status(200).json(comments);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: "Server Error" });
  }
};
// get single comment detail
export const getComment = async (request, response) => {
  try {
    const { commentId } = request.params;

    // Validate if commentId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return response.status(400).json({ message: 'Invalid comment ID' });
    }
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return response.status(404).json({ message: "Comment not found" });
    }

    return response.status(200).json(comment);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: "Server Error" });
  }
};
export const updateComment = async (request, response) => {
    try {
      const { commentId } = request.params;
  
      // Validate if commentId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(commentId)) {
        return response.status(400).json({ message: 'Invalid comment ID' });
      }
  
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        request.body 
      );
  
      if (!updatedComment) {
        return response.status(404).json({ message: 'Comment not found' });
      }
  
      return response.status(200).json(updatedComment);
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ message: 'Server Error' });
    }
  };

export const deleteComment = async (request, response) => {
 try {
    const { commentId } = request.params;

    // Validate if commentId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return response.status(400).json({ message: 'Invalid comment ID' });
    }

    const result = await Comment.findByIdAndDelete(commentId);

    if (!result) {
      return response.status(404).json({ message: "Comment not found" });
    }

    return response.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: "Server Error" });
  }
};

export const likeComment = async (request, response) => {
  try {
    const { commentId } = request.params;

    // Validate if commentId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return response.status(400).json({ message: 'Invalid comment ID' });
    }
    // Check if the comment exists
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return response.status(404).json({ message: "Comment not found" });
    }

    // Check if the user has already liked the comment
    const userId = request.user.id;
    if (comment.likes.includes(userId)) {
      return response
        .status(400)
        .json({ message: "You have already liked this comment" });
    }

    // Add the user ID to the likes array
    comment.likes.push(userId);

    // Save the updated comment
    await comment.save();

    return response.status(200).json({ message: "Comment liked successfully" });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: "Server Error" });
  }
};
