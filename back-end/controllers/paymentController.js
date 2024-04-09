import Payment from '../models/paymentModel.js'; // Adjust the path accordingly

// Controller to create a new payment
const createPayment = async (req, res) => {
  try {
    const paymentData = req.body; // Assuming you send payment data in the request body
    const newPayment = await Payment.create(paymentData);
    res.status(201).json(newPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get a specific payment by ID
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to update a payment by ID
const updatePaymentById = async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.paymentId,
      req.body,
      { new: true }
    );
    if (!updatedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json(updatedPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to delete a payment by ID
const deletePaymentById = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.paymentId);
    if (!deletedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(204).send(); // No content on successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPaymentsByBillId = async (req,res) => {
  try {
    const {billId,customerId} = req.params;
    const payments = await Payment.find({ billId,customerId });
    
    if (!payments) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
    createPayment,
    getAllPayments, 
    getPaymentById,
    updatePaymentById,
    deletePaymentById,
    getPaymentsByBillId
  };
