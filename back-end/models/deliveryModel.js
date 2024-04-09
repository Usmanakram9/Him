import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  billId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bills",
    required: true, 
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers",
  },
  formFieldId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bills.formFields",  
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  driverNumber: {
    type: String,
    required: true,
  },
  driverCnic: {
    type: Number,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productLength: {
    type: String, // Change the type to the appropriate type if needed
    required: true,
  },
  productWidth: {
    type: String, // Change the type to the appropriate type if needed
    required: true,
  },
  productThickness: {
    type: String, // Change the type to the appropriate type if needed
    required: true,
  },
  productQuantity: {
    type: String, // Change the type to the appropriate type if needed
    required: true,
  },
  productMeasurement: {
    type: String, // Change the type to the appropriate type if needed
    required: true,
  },
  isDelivered: {
    type: Boolean, // Change the type to the appropriate type if needed
  
    default: false,
  },
  // Add other fields as needed
},{
  timestamps: true, // Add timestamps option
});

const Delivery = mongoose.model("deliveries", deliverySchema);
export default Delivery;
