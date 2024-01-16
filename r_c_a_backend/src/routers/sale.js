import express from 'express';
import { addSale, getSale, deleteSale, updateSale } from '../controllers/saleControllers.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, addSale);
router.get('/', auth, getSale);
router.delete('/:id', auth, deleteSale);
router.put('/:id', auth, updateSale);

export default router;