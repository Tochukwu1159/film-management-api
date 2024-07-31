import express from 'express';
import filmController from '../controllers/filmController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validateAdminRole from '../middlewares/adminMiddleware.js';


const router = express.Router();

router.post('/',authMiddleware, validateAdminRole, filmController.createFilm);
router.get('/',authMiddleware, filmController.getFilms);
router.patch('/:id',authMiddleware, filmController.updateFilm);
router.delete('/:id',authMiddleware, filmController.deleteFilm);

export default router;
