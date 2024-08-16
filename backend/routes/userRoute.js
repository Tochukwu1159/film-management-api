import express from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected routes (requires authentication)
router.put('/update-profile/:id', authMiddleware, userController.updateUser); // Update user details
router.get('/', authMiddleware, userController.getUserDetails); // Get current user details
router.get('/', authMiddleware, userController.getUserById); // Get user by ID
router.get('/allusers', authMiddleware, userController.getAllUsers); // Get all users with pagination
router.delete('/:id', authMiddleware, userController.deleteUser); // Delete user by ID

// Public routes (no authentication required)
router.post('/forget-password', userController.forgetPassword); // Forget password
router.patch('/reset-password', userController.resetPassword); // Reset password
router.patch('/edit-password', authMiddleware, userController.editPassword); // Edit password (requires authentication)

export default router;
