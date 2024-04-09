import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBillStore } from "../../stores/billStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/himalaya.png";

const SingleProdBill = () => {
  const { billId, formFieldId } = useParams();
  const {
    getFormFieldById,
    singleFormField,
    getSingleBill,
    singleBill,
    isLoading,
    error,
  } = useBillStore();

  useEffect(() => {
    // Fetch the form field when the component mounts
    getFormFieldById(billId, formFieldId);
    getSingleBill(billId);
  }, [billId, formFieldId]);
  

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-600 mb-2">Loading...</p>
        <div className="animate-spin border-t-4 border-blue-500 rounded-full h-12 w-12"></div>
        <p className="text-sm text-gray-600 mt-2">Himalaya Enterprises</p>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (!singleFormField) {
    return <p>No data found for the specified ID.</p>;
  }
  if (!singleBill) {
    return <p>No data found for the specified ID.</p>;
  }
  return (
    <>
      <div className="w-full mx-auto p-8 bg-white rounded shadow-lg">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="mr-4">
              <span className="text-2xl font-bold">Bill ID:  {singleBill._id}</span>{" "}
             
            </div>
          </div>
          <div className="flex flex-col items-center">
            {/* Company Information with Icons */}
            <div>
              {/* Company Logo */}
              <img
                src={logo} // Replace with your company logo URL
                alt="Company Logo"
                className="w-24 h-24"
              />
            </div>
            <div className="mr-4">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                Plot 427, St#6, I-9/2, Industrial Area Islamabad
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Company Phone
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                Company Website
              </div>
             
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Bill To</h2>
          <div>
            <div className="mb-2">
              <span className="text-slate-700 italic">{singleBill.customerName}</span>{" "}
              
            </div>
            <div>
               <span className="text-slate-700 italic">{singleBill.factoryName}</span>{" "}
              
              
            </div>
            {/* You can add more information with labels as needed */}
            {/* For example, client phone number */}
            <div>
            <span className="text-slate-700 italic">{singleBill.contactNum}</span>{" "}
              
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
          <table className="min-w-full divide-y divide-slate-500">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                >
                  Product Name
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                >
                  Measurement Type
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                >
                  Width
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                >
                  Length
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                >
                  Square/Running Foot
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                >
                  Thickness
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                >
                  Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Dummy data for demonstration purposes */}
              <tr className="border-b border-slate-200">
                <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                  <div className="font-medium text-slate-700">
                    {singleFormField.productName}
                  </div>
                </td>
                <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                  {singleFormField.measurementType}
                </td>
                <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                  {singleFormField.prodWidth}
                </td>
                <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                  {singleFormField.prodLength}
                </td>
                <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                  {singleFormField.result}
                </td>
                <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                  {singleFormField.prodQuantity}
                </td>
                <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                  {singleFormField.prodThickness}
                </td>
                <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                  {singleFormField.prodRate}
                </td>
              </tr>
              {/* Add more dummy data rows as needed */}
            </tbody>
            <tfoot>
              <tr>
                <th
                  scope="row"
                  colSpan="7"
                  className="font-bold hidden pt-6 pl-6 pr-3 text-sm text-right text-slate-700 sm:table-cell md:pl-0"
                >
                  Product Amount
                </th>
                <th
                  scope="row"
                  className="font-bold pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
                >
                  Product Amount
                </th>
                <td className="font-bold pt-6 pl-3 pr-4 text-sm text-right text-slate-700 sm:pr-6 md:pr-0">
                  {singleFormField.prodamount}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Action Button */}
        <div className="mt-4 text-right">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none"
            onClick={() => window.print()}
          >
            <FontAwesomeIcon icon={faPrint} className="mr-2" />
            Print Invoice
          </button>
          
        </div>
      </div>
    </>
  );
};

export default SingleProdBill;
