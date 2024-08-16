import express from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register/user', authController.registerUser);
router.post('/register/admin', authController.registerAdmin);
router.post('/login', authController.login);

export default router;
