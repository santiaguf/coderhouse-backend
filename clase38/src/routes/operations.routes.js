import { Router } from 'express';
import controller from '../controller/operations.controller.js';

const router = Router();

router.get('/sum', controller.sumOp);

router.get('/substract', controller.substractOp);

router.get('/multiply', controller.multiplyOp);

router.get('/divide', controller.divideOp);

router.get('/all', controller.getAllOp);

export default router;