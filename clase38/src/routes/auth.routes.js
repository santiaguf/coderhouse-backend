import { Router } from 'express';
import controller from '../controller/auth.controller.js';

const router = Router();

router.get('/register', controller.register);

export default router;