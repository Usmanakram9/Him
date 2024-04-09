import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useBillStore } from "../../stores/billStore";

const FormDataBox = ({ formData, onDelete, onUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetail = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <div className="bg-white p-4 m-4 rounded-lg shadow-md">
      <div className="flex flex-col">
        <h3 className="text-xl mb-2">
          <span className="font-bold">First Name:</span> {formData.firstname}
        </h3>
        <h3 className="text-xl mb-2">
          <span className="font-bold">Bill:</span> {formData.subtotal}
        </h3>

        {showDetails && (
          <>
            <h3 className="text-xl mb-2">
              <span className="font-bold">Factory Name:</span>{" "}
              {formData.factoryName}
            </h3>
            <h3 className="text-xl mb-2">
  <span className="font-bold">Contact:</span> {formData.contact}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">CNIC:</span> {formData.cnic}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Site Name:</span> {formData.SiteName}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Product Name:</span> {formData.productName}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Measurement Type:</span> {formData.measurementType}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Product Width:</span> {formData.prodWidth}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Product Length:</span> {formData.prodLength}
</h3>
<h3 className="text-xl mb-2">
<span className="font-bold">
{formData.measurementType === "squareFoot" ? "Square Foot:" : "Running Foot:"}
</span>
{formData.result}
</h3>

<h3 className="text-xl mb-2">
  <span className="font-bold">Product Quantity:</span> {formData.prodQuantity}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Product Thickness:</span> {formData.prodThickness}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Product Rate:</span> {formData.prodRate}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Product Amount:</span> {formData.prodamount}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Top Poolish:</span> {formData.topPoolish ? "Yes" : "No"}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Result Poolish:</span> {formData.resultPoolish}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Poolish Amount:</span> {formData.poolishAmount}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Edge Poolish:</span> {formData.edgepoolish  ? "Yes" : "No"}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Edge Poolish Rate:</span> {formData.edgepoolishrate}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Edge Poolish Amount:</span> {formData.edgepoolishamount}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Leather Poolish:</span> {formData.leatherpoolish ? "Yes" : "No"}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Antique Poolish:</span> {formData.antiquePoolish ? "Yes" : "No"}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Glossy Poolish:</span> {formData.glossyPoolish ? "Yes" : "No"}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Edge Poolish Antique:</span> {formData.edgepoolishAntique ? "Yes" : "No"}
</h3>
<h3 className="text-xl mb-2">
  <span className="font-bold">Edge Poolish Glossy:</span> {formData.edgepoolishGlossy ? "Yes" : "No"}
</h3>
{/* Add more fields as needed */}

            {/* Add more fields as needed */}
          </>
        )}
      </div>

      <div className="button mt-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={handleViewDetail}
        >
          {showDetails ? "Hide Details" : "View Details"}
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
          onClick={onDelete}
        >
          <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete
        </button>
      </div>
    </div>
  );
};

const BillVerification = () => {
  const navigate = useNavigate();
  const billStore = useBillStore();
  const useback = () => {
    navigate("/admin-panel/");
  };
  const [allFormData, setAllFormData] = useState([]);
  
  const [billDetails, setBillDetails] = useState({
    subtotalAmount: 0,
    paid: 0,
    balance: 0,
  });
  const handleDelete = (id) => {
    const updatedFormData = allFormData.filter(
      (formData) => formData.id !== id
    );

    // Remove the item from local storage
    localStorage.removeItem(`formData${id}`);

    setAllFormData(updatedFormData);

    // Recalculate the subtotal after deleting the item
    const newSubtotal = updatedFormData.reduce(
      (sum, formData) => sum + Number(formData.subtotal),
      0
    );

    setBillDetails((prev) => ({
      ...prev,
      subtotalAmount: newSubtotal,
      balance: newSubtotal - Number(prev.paid),
    }));
  };

  const handleUpdate = useCallback((index) => {
    // Implement your logic for handling the update here
    // You can navigate to another page or show a modal, for example
  }, []);

  const handleCreateBill = async () => {
    try {
      const allFormData = [];
      for (let i = 1; i <= localStorage.getItem("counter"); i++) {
        const formDataKey = `formData${i}`;
        const formData = JSON.parse(localStorage.getItem(formDataKey));
        if (formData) {
          allFormData.push(formData);
        }
      }

      const subtotalAmount = Number(billDetails.subtotalAmount);
      const paidAmount = Number(billDetails.paid);

      const newBill = {
        customerId: allFormData[0].customerId, // Replace with the actual customer ID
        customerName: allFormData[0].firstname, // Replace with the actual customer name
        factoryName: allFormData[0].factoryName, // Replace with the actual factory name
        contactNum: allFormData[0].contact, // Replace with the actual contact number
        cnic: allFormData[0].cnic, // Replace with the actual CNIC (numeric value)
        formFields: allFormData.map((formData) => ({
          // firstname: formData.firstname,
          // factoryName: formData.factoryName,
          // contact: formData.contact,
          // cnic: Number(formData.cnic), // Ensure cnic is a number
          // Add other form fields based on your formFieldSchema
          SiteName: formData.SiteName,
          productName: formData.productName,
          measurementType: formData.measurementType,
          prodWidth: formData.prodWidth,
          prodLength: formData.prodLength,
          result: formData.result,
          prodQuantity: formData.prodQuantity,
          prodThickness: formData.prodThickness,
          prodRate: formData.prodRate,
          prodamount: formData.prodamount,
          topPoolish: !!formData.topPoolish, 
          resultPoolish: formData.resultPoolish,
          poolishAmount: formData.poolishAmount,
          edgepoolish: formData.edgepoolish,
          edgepoolishrate: formData.edgepoolishrate,
          edgepoolishamount: formData.edgepoolishamount,
          leatherpoolish: formData.leatherpoolish === "Yes", // Convert to boolean
          antiquePoolish: formData.antiquePoolish === "Yes", // Convert to boolean
          glossyPoolish: formData.glossyPoolish === "Yes", // Convert to boolean
          edgepoolishAntique: formData.edgepoolishAntique === "Yes", // Convert to boolean
          edgepoolishGlossy: formData.edgepoolishGlossy === "Yes", // Convert to boolean
          // ...
        })),
        paidAmount: paidAmount,
        balance: billDetails.balance,
        totalAmount: subtotalAmount,
      };

      await billStore.createBill(newBill);
     console.log(newBill);
      localStorage.clear();
      navigate(`/admin-panel/InvoiceHub/${allFormData[0].customerId}`);
    } catch (error) {
      console.error("Error creating bill:", error);
    }
  };

  useEffect(() => {
    // Recalculate balance after updating paid amount
    const balanceAmount = billDetails.subtotalAmount - Number(billDetails.paid);
    setBillDetails((prev) => ({
      ...prev,
      balance: balanceAmount,
    }));
  }, [billDetails.subtotalAmount, billDetails.paid, setBillDetails]);

  const handlePaidChange = (e) => {
    const paidAmount = Number(e.target.value);
    setBillDetails((prev) => ({
      ...prev,
      paid: isNaN(paidAmount) ? 0 : paidAmount,
    }));
  };

  useEffect(() => {
    const counter = localStorage.getItem("counter") || 0;
    const keys = Array.from({ length: counter }, (_, i) => `formData${i + 1}`);
    const formDataArray = keys.map((key) =>
      JSON.parse(localStorage.getItem(key))
    );
    const filteredFormDataArray = formDataArray.filter((data) => data);

    const initialSubtotal = filteredFormDataArray.reduce(
      (sum, formData) => sum + Number(formData.subtotal),
      0
    );

    setAllFormData(filteredFormDataArray);

    setBillDetails((prevBillDetails) => ({
      ...prevBillDetails,
      subtotalAmount: initialSubtotal,
      balance: initialSubtotal - Number(prevBillDetails.paid),
    }));
  }, [billDetails.paid]);

  return (
    <>
      <button
        className="bg-white dark:bg-[#0F172A] ml-2 mt-2 text-indigo-500 dark:text-white p-2 rounded hover:bg-gray-800 hover:text-white transition duration-300"
        onClick={useback}
      >
        Back
      </button>
      <div className="container mx-auto my-8 flex flex-wrap">
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl font-bold mb-4">All Saved Form Data:</h2>
          {allFormData.map((formData, index) => (
            <div key={index} className="mb-4">
              <FormDataBox
                formData={formData}
                onDelete={() => handleDelete(formData.id)}
                onUpdate={() => handleUpdate(index)}
              />
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/3 p-4 bg-gray-200 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Bill Details</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Subtotal Amount
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={billDetails.subtotalAmount}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Paid
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={billDetails.paid}
              onChange={handlePaidChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Balance
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={billDetails.balance}
              readOnly
            />
          </div>

          <button
            className="bg-white dark:bg-[#0F172A] ml-2 mt-2 text-indigo-500 dark:text-white p-2 rounded hover:bg-gray-800 hover:text-white transition duration-300"
            onClick={handleCreateBill}
          >
            Create Bill
          </button>
        </div>
      </div>
    </>
  );
};

export default BillVerification;
