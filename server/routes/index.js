import { Router } from 'express';
import UserOperations from './user';
import ProductOperations from './product';


const router = Router();

router.use('/users', UserOperations);
router.use('/product', ProductOperations);

export default router;
