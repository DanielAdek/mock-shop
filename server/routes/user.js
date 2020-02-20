import { Router } from 'express';
import { User } from '../controllers';

const router = Router();

router.post('/register', User.createUserAccount);

export default router;
