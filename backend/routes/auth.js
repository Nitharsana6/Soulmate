import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js'; // Ensure the path is correct and has .js extension

const router = express.Router();

// Define routes
router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;

