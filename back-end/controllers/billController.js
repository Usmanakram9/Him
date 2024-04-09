import Bill from '../models/billModel.js';

const createBill = async (req, res) => {
    const {
        customerId,
        customerName,
        factoryName,
        contactNum,
        cnic,
        formFields, // Updated to include form data fields as an array
        paidAmount,
        balance,
        totalAmount,
    } = req.body;

    try {
        const bill = await Bill.create({
            customerId,
            customerName,
            factoryName,
            contactNum,
            cnic,
            formFields, // Set the array of form data fields
            paidAmount,
            balance,
            totalAmount,
        });

        res.status(201).json(bill);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid bill data' });
    }
};

const getBills = async (req, res) => {
    try {
        const bills = await Bill.find({});
        res.status(200).json(bills);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getSingleBill = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);
        if (bill) {
            res.status(200).json(bill);
        } else {
            res.status(404).json({ message: 'Bill not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateBill = async (req, res) => {
    const billId = req.params.id;

    try {
        const bill = await Bill.findById(billId);

        if (bill) {
            // Update the bill fields based on the provided request body
            for (const key in req.body) {
                if (req.body.hasOwnProperty(key) && bill[key] !== undefined) {
                    bill[key] = req.body[key];
                }
            }

            const updatedBill = await bill.save();
            res.status(200).json(updatedBill);
        } else {
            res.status(404).json({ message: 'Bill not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteBill = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);
        if (bill) {
            await Bill.deleteOne({ _id: bill._id });
            res.status(200).json({ message: 'Bill deleted successfully' });
        } else {
            res.status(404).json({ message: 'Bill not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getBillsByCustomerId = async (req, res) => {
    const { customerId } = req.params;

    try {
        const bills = await Bill.find({ customerId });
        res.status(200).json(bills);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// new updating trying
const getFormFieldById = async (req, res) => {
    const { billId, formFieldId } = req.params;

    try {
        // Find the bill based on the billId
        const bill = await Bill.findById(billId);

        if (bill) {
            // Find the specific form field within the bill
            const formField = bill.formFields.find(field => field._id.toString() === formFieldId);

            if (formField) {
                res.status(200).json(formField);
            } else {
                res.status(404).json({ message: 'Form field not found in the specified bill' });
            }
        } else {
            res.status(404).json({ message: 'Bill not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export { createBill, getBills, getSingleBill, updateBill, getBillsByCustomerId,deleteBill,getFormFieldById };
