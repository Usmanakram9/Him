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


app.listen(port, () => { 
  console.log(`Server is running on port ${port}`);
});

