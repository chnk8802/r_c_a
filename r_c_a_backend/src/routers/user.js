import express from 'express';
import { registerUser, getAllUsers, loginUser } from '../controllers/userControllers.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post('/', registerUser).get('/', auth, getAllUsers);/* these two have same endpoint so chain both */
router.post('/login', loginUser);
// router.get('/', auth, getAllUsers);

export default router;