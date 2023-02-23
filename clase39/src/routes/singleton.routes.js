import { Router } from 'express';
import { getSingleton } from '../controllers/singleton.controller.js';

const router = Router();

router.get('/', getSingleton);

export default router;