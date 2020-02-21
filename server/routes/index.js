import { Router } from 'express';
import UserOperations from './user';
import ProductOperations from './product';
import CartOperations from './cart';


const router = Router();

router.use('/users', UserOperations);
router.use('/product', ProductOperations);
router.use('/cart', CartOperations);

export default router;
