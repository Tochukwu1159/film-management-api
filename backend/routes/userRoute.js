import express from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.put('/', authMiddleware, userController.updateUser);
router.get('/', authMiddleware, userController.getUserDetails);

export default router;
