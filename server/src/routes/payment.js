import express from 'express';
import * as paymentController from '../controller/payment'
import { verifyToken } from '../middleware/auth';

const router = express.Router()

router.use(verifyToken)
router.post('/create-payment-url', paymentController.createPaymentUrl);
router.get('/vnpay-return', paymentController.paymentReturn);
router.get('/pay-history', paymentController.paymentHistory);

export default router