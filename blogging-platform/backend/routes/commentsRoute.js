import express from 'express';
import { createComment, getComments, getComment, updateComment, deleteComment , likeComment } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// route to add a new comment
router.post('/', protect, createComment);
// route to get all comments for a post
router.get('/:postId', protect, getComments);
// route to get a specific comment
router.get('/:commentId', protect, getComment);
// route to update a comment
router.put('/:commentId', protect, updateComment);
// route to delete a comment
router.delete('/:commentId', protect, deleteComment);
// route to like a comment
router.post('/:commentId/like', protect, likeComment);

export default router;
