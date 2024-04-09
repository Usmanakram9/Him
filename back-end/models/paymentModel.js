import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  billId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bills",
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers",
  },
  totalAmount: {
    type: Number,  
    required: true,
  },
  paid: {
    type: Number, 
    required: true,
  },
  balance: {
    type: Number,
    required: true, 
  },
  paidVia: {
    type: String,
    enum: ['cash', 'cheque', 'transaction'],
    required: true,
  },
  chequeNumber: { 
    type: String,
    when: { paidVia: 'cheque' },
  },
  transactionNumber: {
    type: String,
    when: { paidVia: 'transaction' },
  },
  dated: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true, // This will add createdAt and updatedAt fields
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
