// paymentRoutes.js

import express from 'express';
import {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
  getPaymentsByBillId
} from '../controllers/paymentController.js';

const router = express.Router();

// Create a new payment
router.post('/', createPayment);

// Get all payments
router.get('/', getAllPayments);

// Get a specific payment by ID
router.get('/:paymentId', getPaymentById);

// Update a payment by ID
router.put('/:paymentId', updatePaymentById);

// Delete a payment by ID
router.delete('/:paymentId', deletePaymentById);

router.get('/getBy/:billId/:customerId',getPaymentsByBillId)

export default router;
