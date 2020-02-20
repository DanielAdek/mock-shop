import { Router } from 'express';
import { User } from '../controllers';

const router = Router();

router.post('/register', User.createUserAccount);
router.post('/login', User.login);

export default router;
