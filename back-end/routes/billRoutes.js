import express from 'express';
const router = express.Router();

import {
    createBill,
    getBills,
    getSingleBill,
    getBillsByCustomerId, 
    updateBill,
    deleteBill,
    getFormFieldById
} from '../controllers/billController.js';

router.route('/').post(createBill).get(getBills);
router.route('/:id').get(getSingleBill).put(updateBill).delete(deleteBill);
router.route('/customer/:customerId').get(getBillsByCustomerId); // Use the new controller function
router.route('/:billId/singleBill/:formFieldId').get(getFormFieldById);


export default router;
