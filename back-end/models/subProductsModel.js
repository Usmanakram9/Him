import mongoose from 'mongoose';

const subProduct = new mongoose.Schema({

    product: {
       type: String,
    },
    subimage:{
        type: String,
        required: true,
    },
    subprodname:{
        type: String,
        required: true,
        unique: true,
    }, 
    subproPrice:{ 
        type: String,
        required: true,
       
    },
    subproddesc:{
        type: String,
        required: true,
    }


},{
    timestamps:true
});

const subprod = mongoose.model("subproducts", subProduct); 
export default subprod;