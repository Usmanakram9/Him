import path from 'path';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connection.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import customerRoute from './routes/customerRoutes.js';
import productRoutes from './routes/productRoutes.js';
import subproductsRoutes from './routes/subProductsRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import billRoutes from './routes/billRoutes.js';
import deliveryroutes from './routes/deliveryRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();

const app = express();
  
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('api');
});

app.use('/api/users', userRoutes);
app.use('/api/customer', customerRoute); 
app.use('/api/', productRoutes); 
app.use('/api/subproducts', subproductsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/bill', billRoutes);
app.use('/api/deliveries', deliveryroutes);
app.use('/api/payments',paymentRoutes);

const frontendUploadsPath = path.join(new URL('.', import.meta.url).pathname, '../himalayafinal/front-end/public/uploads');
app.use('/uploads', express.static(frontendUploadsPath));

app.post('/api/payment', async (req, res) => {
  try {
    // Extract mobile number from request body
    const { mobileNumber } = req.body;

    // Prepare API parameters
    const apiParams = {
      "pp_Version": "1.1",
      "pp_TxnType": "MWALLET",
      "pp_Language": "EN",
      "pp_MerchantID": "MC89139",
      "pp_SubMerchantID": "",
      "pp_Password": "802a2za59v",
      "pp_BankID": "",
      "pp_ProductID": "",
      "pp_TxnRefNo": "T20240408212136",
      "pp_Amount": "1000",
      "pp_TxnCurrency": "PKR",
      "pp_TxnDateTime": "20240408212136",
      "pp_BillReference": "billref",
      "pp_Description": "Description of transaction",
      "pp_TxnExpiryDateTime": "20240408212136",
      "pp_ReturnURL": "https://spotjoin.com",
      "pp_SecureHash": "77BA04E01DBFB097ABA82B5186ABC899AC2D0001695A10741C6380A9997BAE50",
      "ppmpf_1": mobileNumber,
      "ppmpf_2": "",
      "ppmpf_3": "",
      "ppmpf_4": "",
      "ppmpf_5": ""
    };

    // Make the API request to JazzCash
    const response = await axios.post('https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction', apiParams);

    // Send API response to frontend
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



app.listen(port, () => { 
  console.log(`Server is running on port ${port}`);
});

