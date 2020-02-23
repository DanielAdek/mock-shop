import { Router } from 'express';
import { Product } from '../controllers';
import { verifyToken } from '../middleware/authorization';
import { multerUploads } from '../utils/helpers';

const router = Router();

router.post('/create', verifyToken, multerUploads, Product.create);
router.put('/:productId', verifyToken, Product.editProduct);
router.delete('/:productId', verifyToken, Product.delProduct);
router.get('/', Product.retreiveProducts);

export default router;
