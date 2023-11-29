import express from 'express';
import { createPosts,getPosts,getPost,updatePost,deletePost } from '../controllers/postControllers.js';

const router = express.Router();
// route to add new post
router.post('/', createPosts);
// route to get all post
router.get('/',getPosts);
// route to get post by id
router.get('/:id', getPost)
// route to Update post
router.put('/:id', updatePost)
// route to Delete a post
router.delete('/:id', deletePost)

export default router;