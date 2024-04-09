import mongoose from "mongoose";

const formFieldSchema = new mongoose.Schema({
  SiteName: String,
  firstname: String,
  factoryName: String,
  contact: String,
  cnic: Number,
  productName: String,
  measurementType: String,
  prodWidth: String,
  prodLength: String,
  result: String,
  resultSquareFoot: String,
  resultRunningFoot: String,
  prodQuantity: String,
  prodThickness: String,
  prodRate: String,
  prodamount: String,
  topPoolish: Boolean,
  resultPoolish: String,
  poolishAmount: String,
  edgepoolish: String,
  edgepoolishrate: String, 
  edgepoolishamount: String,
  subtotal: Number,
  leatherpoolish: Boolean,
  antiquePoolish: Boolean,
  glossyPoolish: Boolean,
  edgepoolishAntique: Boolean,
  edgepoolishGlossy: Boolean, 
});

const billSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
    }, 
    customerName: { 
      type: String,
      trim: true,
    },
    factoryName: {
      type: String,
      trim: true,
    },
    contactNum: {
      type: String,
    },
    cnic: {
      type: Number,
    },
    formFields: [formFieldSchema], // Array of form data fields
    paidAmount: {
      type: Number, 
      required: true,
      min: 0,
    },
    balance: {
      type: Number,
      required: true,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Bill = mongoose.model("bills", billSchema);
export default Bill;
