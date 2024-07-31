import express from 'express';
import purchaseController from '../controllers/purchaseController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware,purchaseController.purchaseFilm);
router.get('/', authMiddleware, purchaseController.getPurchases);

export default router;
