import express from 'express';
import { registerUser ,loginUser,getMe} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();



router.post('/',registerUser );

router.post('/login', loginUser)

router.get('/profile',protect, getMe )


export default router;