import { Router } from 'express';
import { Product } from '../controllers';
import { verifyToken } from '../middleware/authorization';

const router = Router();

router.post('/create', verifyToken, Product.create);
router.put('/:productId', verifyToken, Product.editProduct);
router.delete('/:productId', verifyToken, Product.delProduct);
router.get('/', Product.retreiveProducts);

export default router;
