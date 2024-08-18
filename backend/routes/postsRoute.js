import express from 'express';
import { createPosts, getPosts, getMyPosts, getPost, updatePost, deletePost, searchPosts,getRecentPosts } from '../controllers/postControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


// route to fetch recent posts
router.get('/recent',getRecentPosts)
// route to add new post
router.post('/', protect, createPosts);
// route to get all posts
router.get('/', getPosts);
// route to get posts by the signed-in user
router.get('/user/:userId', protect, getMyPosts);
// route to get post by id
router.get('/:id', getPost)
// route to Update post
router.put('/:id', protect, updatePost)
// route to Delete a post
router.delete('/:id', protect, deletePost)


export default router;