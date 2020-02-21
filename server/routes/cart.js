import { Router } from 'express';
import { Cart } from '../controllers';
import { verifyToken } from '../middleware/authorization';

const router = Router();

router.post('/add', verifyToken, Cart.addToCart);
router.delete('/:cartId', verifyToken, Cart.delCart);
router.get('/all', verifyToken, Cart.retreiveProductsFromCart);

export default router;
