import React, { useState, useEffect } from 'react';
import '../../assets/css/DeliveryButton.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useBillStore } from '../../stores/billStore';
import { useDeliveryStore } from '../../stores/deliveryStore';
import Toast, { showSuccessToast, showErrorToast } from '../Toast';

const DeliveryScreen = () => {
  const { custID,billId, formFieldId } = useParams();

  const {
    getFormFieldById,
    singleFormField,
    getSingleBill,
    singleBill,
    isLoading,
    error,
  } = useBillStore();
 

  const {
    createDelivery,
    isLoading: deliveryLoading,
    error: deliveryError,
  } = useDeliveryStore();

  useEffect(() => {
    // Fetch the form field when the component mounts
    getFormFieldById(billId, formFieldId);
    getSingleBill(billId);
  }, [billId, formFieldId]);

  

  const [formData, setFormData] = useState({
    productName: "",
    productLength: '',
    productWidth: '',
    productThickness: '',
    productQuantity: '',
    productSquareFoot: '',
    driverName: '',
    driverContact: '',
    driverCnic: '',
    vehicleNumber: '',
  });

  const navigate = useNavigate();
  // Handle form field changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [orderPlaced, setOrderPlaced] = useState(false);

  

  useEffect(() => {
    let timeoutId;

    if (orderPlaced) {
      timeoutId = setTimeout(() => {
        setOrderPlaced(false);
      }, 10000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [orderPlaced]);

  const handleSubmit = async (e) => {
    setOrderPlaced(true);
    e.preventDefault();
    const deliveryData = {
      billId,
      customerId:custID,
      formFieldId,
      isDelivered: true,
      productName: singleFormField.productName,
      productLength: singleFormField.prodLength,
      productWidth: singleFormField.prodWidth,
      productThickness: singleFormField.prodThickness,
      productQuantity: formData.productQuantity,
      productMeasurement: formData.productSquareFoot,
      driverName: formData.driverName,
      driverNumber: formData.driverContact,
      driverCnic: formData.driverCnic,
      vehicleNumber: formData.vehicleNumber,
    };

    try {
      // Create the delivery using the store function

      await createDelivery(deliveryData);
      showSuccessToast("Delivery Made successfully!");
  
      // Clear form fields
      setFormData({
        productName: "",
        productLength: '',
        productWidth: '',
        productThickness: '',
        productQuantity: '',
        productSquareFoot: '',
        driverName: '',
        driverContact: '',
        driverCnic: '',
        vehicleNumber: '',
      });
      // Add your additional logic if needed

    } catch (error) {
      showErrorToast(`Error: ${error.message}`);
      // Handle error appropriately
    }
    // Add your form submission logic here
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-600 mb-2">Loading...</p>
        <div className="animate-spin border-t-4 border-blue-500 rounded-full h-12 w-12"></div>
        <p className="text-sm text-gray-600 mt-2">Himalaya Enterprises</p>
      </div>
    );
  }
  return (  
    <>
      <div className="container mx-auto mt-8 p-8 bg-gray-100 rounded shadow-lg">
      <button
        className="text-gray-500 text-sm mb-4"
        onClick={() => {
          navigate(`/admin-panel/InvoiceHub/${custID}`);
          // Add your back button logic here
        }}
      >
        &larr; Back
      </button>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          {/* Product Name */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700 mb-2">
              Product Name:
            </label>
            <input
              type="text"
              name="productName"
              value={singleFormField?.productName || ''}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="border p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Product Length */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700 mb-2">
              Product Length:
            </label>
            <input
              type="text"
              name="productLength"
              value={singleFormField?.prodLength || ''}
              onChange={handleInputChange}
              placeholder="Enter product length"
              className="border p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Product Width */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700 mb-2">
              Product Width:
            </label>
            <input
              type="text"
              name="productWidth"
              value={singleFormField?.prodWidth || ''}
              onChange={handleInputChange}
              placeholder="Enter product width"
              className="border p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Product Thickness */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700 mb-2">
              Product Thickness:
            </label>
            <input
              type="text"
              name="productThickness"
              value=  {singleFormField?.prodThickness || ''}
              onChange={handleInputChange}
              placeholder="Enter product thickness"
              className="border p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Product Quantity */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700 mb-2">
              Product Quantity:
            </label>
            <input
              type="text"
              name="productQuantity"
              value={formData.productQuantity}
              onChange={handleInputChange}
              placeholder="Enter product quantity"
              className="border p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Product Square Foot */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700 mb-2">
              Product Square/Running Foot:
            </label>
            <input
              type="text"
              name="productSquareFoot"
              value={formData.productSquareFoot}
              onChange={handleInputChange}
              placeholder="Enter product square foot"
              className="border p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Driver Name */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700 mb-2">
              Driver Name:
            </label>
            <input
              type="text"
              name="driverName"
              value={formData.driverName}
              onChange={handleInputChange}
              placeholder="Enter driver name"
              className="border p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Driver Contact */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700 mb-2">
              Driver Contact:
            </label>
            <input
              type="text"
              name="driverContact"
              value={formData.driverContact}
              onChange={handleInputChange}
              placeholder="Enter driver contact"
              className="border p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Driver CNIC */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700 mb-2">
              Driver CNIC:
            </label>
            <input
              type="text"
              name="driverCnic"
              value={formData.driverCnic}
              onChange={handleInputChange}
              placeholder="Enter driver CNIC"
              className="border p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Vehicle Number */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700 mb-2">
              Vehicle Number:
            </label>
            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleInputChange}
              placeholder="Enter vehicle number"
              className="border p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
        <button
        className={`order ${orderPlaced ? 'animate' : ''}`}
        type='submit'
      >
        <span className="default">Complete Order</span>
        <span className={`success ${orderPlaced ? 'animate' : ''}`}>
          Order Delivered
          <svg
            className="ml-1"
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline
              points="1.5 6 4.5 9 10.5 1"
              stroke="#34D399"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="box"></div>
        <div className="truck">
          <div className="back"></div>
          <div className="front">
            <div className="window"></div>
          </div>
          <div className="light top"></div>
          <div className="light bottom"></div>
        </div>
        <div className="lines"></div>
      </button>
      <Toast />
        </div>
      </form>
    </div>

      
    </>
  );
};

export default DeliveryScreen;
