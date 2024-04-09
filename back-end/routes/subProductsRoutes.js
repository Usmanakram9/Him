import express from 'express';
const router = express.Router();
import {addSubProducts,getsubproducts,deletesubProduct,getsubProductById,udpatesubProduct} from '../controllers/subProductsControllers.js';


router.route('/').post(addSubProducts).get(getsubproducts);
router.route('/:id').delete(deletesubProduct).get(getsubProductById).put(udpatesubProduct); 

export default router;