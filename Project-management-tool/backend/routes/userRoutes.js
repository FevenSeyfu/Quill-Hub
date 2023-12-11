import express from 'express';
import {registerUser,loginUser,getAllUsers,getUserById,updateUser,deleteUser} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/',registerUser);
router.post('/login',loginUser);
router.get('/', protect,getAllUsers);
router.get('/:id',protect, getUserById);
router.put('/:id',protect, updateUser);
router.delete('/:id',protect, deleteUser);

export default router;