import { Router } from 'express';
import UserOperations from './user';


const router = Router();

router.use('/users', UserOperations);

export default router;
