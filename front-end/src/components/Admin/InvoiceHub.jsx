import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useBillStore } from "../../stores/billStore";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faTruck,faCheckCircle,faMoneyCheck,faHistory,faUsers,faFileInvoice } from "@fortawesome/free-solid-svg-icons";

const InvoiceHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBillsByCustomerId, bills } = useBillStore();
  const selectedBills = useMemo(
    () => bills.filter((bill) => bill.customerId === id),
    [bills, id]
  );
  // ye ho skta dobara active krna pry
  // const [formFieldResults, setFormFieldResults] = useState([]);

 

  useEffect(() => {
    // Fetch bills based on the customer ID using Zustand store
    const fetch = async ()=>{
     await getBillsByCustomerId(id);
    }
    fetch();
  }, [id, getBillsByCustomerId]);
// ye ho skta doabara active krna pry
  // useEffect(() => {
  //   if (selectedBills.length > 0) {
  //     // Iterate through each bill and extract all fields from formFields
  //     const results = selectedBills.flatMap((bill) =>
  //       bill.formFields.map((field) => ({ ...field }))
  //     );
  //     setFormFieldResults(results);
  //   }
  // }, [selectedBills]);

  const useback = useCallback(() => {
    navigate("/admin-panel/");
  }, [navigate]);

  const useClient = useCallback(() => {
    navigate("/admin-panel/users");
  }, [navigate]);

  const findBillById = (bills, billId) => {
    return bills.find((bill) => bill._id === billId);
  };

  const formatDate = (dateString) => {
    const createdAtDate = new Date(dateString);
    return createdAtDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredBills = selectedBills.filter((bill) =>
  bill._id.toLowerCase().includes(searchTerm.toLowerCase())
);

  // const createdAtDate = bills.length > 0 ? new Date(bill.createdAt) : null;
  return (
    <>
    
      <div className="container mx-auto mt-8 p-8 bg-white rounded shadow-lg">
        {/* Back Button */}
        {/* <button className="text-blue-500 text-sm mb-4" onClick={useback}>
          &larr; Back
        </button> */}
        <div className="flex items-center py-4 whitespace-nowrap ml-4">
        <button onClick={useback} className="text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </button>

        <span className="mx-5 text-gray-500 rtl:-scale-x-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>

        <button
         onClick={useClient}
          className="flex items-center text-gray-600 -px-2 hover:underline"
        >
          <FontAwesomeIcon
            icon={faUsers}
            className="w-6 h-6 mx-2 text-current"
            title="Client List"
          />

          <span className="mx-2">Client's List</span>
        </button>

        <span className="mx-5 text-gray-500 rtl:-scale-x-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>

        <button className="flex items-center text-blue-600 -px-2 hover:underline" >
          <FontAwesomeIcon
            icon={faFileInvoice}
            className="w-6 h-6 mx-2 text-current"
            title="Client List"
          />

          <span className="mx-2">Bill's Detail</span>
        </button>
      </div>
        {/* Heading */}

        {/* Table */}

        {/* Search Container */}
        <div className="container mx-auto mt-8 p-8 bg-white rounded shadow-lg">
          <div className="clientDetail flex flex-wrap gap-x-4 bg-gray-100 p-4 rounded-md shadow-md">
            {/* Top Section */}
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <h1 className="text-xl font-semibold text-blue-600 mr-2">
                  Client Name:
                </h1>
                <span className="text-gray-800">
                  {bills.length > 0 && bills[0].customerName}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <h1 className="text-xl font-semibold text-blue-600 mr-2">
                  Factory Name:
                </h1>
                <span className="text-gray-800">
                  {bills.length > 0 && bills[0].factoryName}
                </span>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <h1 className="text-xl font-semibold text-blue-600 mr-2">
                  CNIC:
                </h1>
                <span className="text-gray-800">
                  {bills.length > 0 && bills[0].cnic}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <h1 className="text-xl font-semibold text-blue-600 mr-2">
                  Contact Number:
                </h1>
                <span className="text-gray-800">
                  {bills.length > 0 && bills[0].contactNum}
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
  <table className="w-full table-auto border-collapse text-blueGray-700">
    <thead className="hidden md:table-header-group">
      <tr>
        <th className="px-4 py-2 bg-blueGray-50 text-blueGray-500 uppercase border border-solid border-blueGray-100 whitespace-nowrap font-semibold text-left">
          Total Amount
        </th>
        <th className="px-4 py-2 bg-blueGray-50 text-blueGray-500 uppercase border border-solid border-blueGray-100 whitespace-nowrap font-semibold text-left">
          Paid
        </th>
        <th className="px-4 py-2 bg-blueGray-50 text-blueGray-500 uppercase border border-solid border-blueGray-100 whitespace-nowrap font-semibold text-left">
          Balance
        </th>
        <th className="px-4 py-2 bg-blueGray-50 text-blueGray-700 uppercase border border-solid border-blueGray-100 whitespace-nowrap font-semibold text-left min-w-140-px">
          Progress
        </th>
       
      </tr>
    </thead>
    <tbody>
      {bills.map((bill, index) => (
        <tr key={index} className="flex flex-col md:table-row md:mb-1">
          <td className="px-4 py-2 md:table-cell bg-blueGray-50 text-blueGray-500 border border-solid border-blueGray-100 text-xs sm:text-sm md:text-base whitespace-nowrap">
            <span className="md:hidden">Total Amount: </span>
            {bill.totalAmount}
          </td>
          <td className="px-4 py-2 md:table-cell bg-blueGray-50 text-blueGray-500 border border-solid border-blueGray-100 text-xs sm:text-sm md:text-base whitespace-nowrap">
            <span className="md:hidden">Paid: </span>
            {bill.paidAmount}
          </td>
          <td className="px-4 py-2 md:table-cell bg-blueGray-50 text-blueGray-500 border border-solid border-blueGray-100 text-xs sm:text-sm md:text-base whitespace-nowrap">
            <span className="md:hidden">Balance: </span>
            {bill.totalAmount - bill.paidAmount}
          </td>
          <td className="px-4 py-2 md:table-cell bg-blueGray-50 text-blueGray-700 border border-solid border-blueGray-100 text-xs sm:text-sm md:text-base whitespace-nowrap">
            <span className="md:hidden">Progress: </span>
            <div className="flex items-center">
              <span className="mr-2">
                {((bill.paidAmount / bill.totalAmount) * 100).toFixed(2)}%
              </span>
              <div className="relative w-full">
                <div
                  className={`overflow-hidden h-2 text-xs flex rounded ${
                    bill.paidAmount === bill.totalAmount
                      ? "bg-green-200"
                      : "bg-red-200"
                  }`}
                >
                  <div
                    style={{
                      width: `${
                        (bill.paidAmount / bill.totalAmount) * 100
                      }%`,
                    }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                      bill.paidAmount === bill.totalAmount
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </td>
         
        </tr>
      ))}
    </tbody>
  </table>
</div>




          {/* Search Bar */}
         <div className="flex items-center justify-end mb-4">
  <input
    type="text"
    placeholder="Search..."
    className="p-2 border border-gray-100 rounded"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>

          {/* Attractive Box for Each Bill */}
          {filteredBills.map((bill, index) => (
            <div
              key={index}
              className="bg-gray-100 text-blue-600 p-4 rounded mb-4"
            >
              <div className="bDetail flex flex-col md:flex-row md:justify-between">
                <h2 className="text-xl font-bold mb-2 md:mb-0">
                  Bill ID: {bill._id}
                </h2>
                <h2 className="text-xl font-bold mb-2 md:mb-0">
                  Dated: {formatDate(bill.createdAt)}
                </h2>
              </div>
            <div className="overflow-x-auto">
  <table className="w-full table-auto border-collapse text-blueGray-700">
    <thead>
    <tr>
  <th className="hidden sm:table-cell px-4 py-2 bg-blueGray-50 text-black align-middle border border-solid border-blueGray-100 text-xs sm:text-sm md:text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
    Total Amount
  </th>
  <th className="hidden sm:table-cell px-4 py-2 bg-blueGray-50 text-black align-middle border border-solid border-blueGray-100 text-xs sm:text-sm md:text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
    Paid
  </th>
  <th className="hidden sm:table-cell px-4 py-2 bg-blueGray-50 text-black align-middle border border-solid border-blueGray-100 text-xs sm:text-sm md:text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
    Balance
  </th>
  <th className="hidden sm:table-cell px-4 py-2 bg-blueGray-50 text-black align-middle border border-solid border-blueGray-100 text-xs sm:text-sm md:text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
    Progress
  </th>
  <th className="hidden sm:table-cell px-4 py-2 bg-blueGray-50 text-black align-middle border border-solid border-blueGray-100 text-xs sm:text-sm md:text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
    Update Payment
  </th>

</tr>

    </thead>
    <tbody>
      {(() => {
        const selectedBill = findBillById(bills, bill._id);

        // Display the selected bill if found
        if (selectedBill) {
          return (
            <tr key={selectedBill._id} className="flex flex-col md:table-row md:mb-1">
              <td className="px-4 py-2 md:table-cell border border-solid border-blueGray-100 text-xs sm:text-sm md:text-base whitespace-nowrap">
                <span className="md:hidden">Total Amount: </span>
                {selectedBill.totalAmount}
              </td>
              <td className="px-4 py-2 md:table-cell border border-solid border-blueGray-100 text-xs sm:text-sm md:text-base whitespace-nowrap">
                <span className="md:hidden">Paid: </span>
                {selectedBill.paidAmount}
              </td>
              <td className="px-4 py-2 md:table-cell border border-solid border-blueGray-100 text-xs sm:text-sm md:text-base whitespace-nowrap">
                <span className="md:hidden">Balance: </span>
                {selectedBill.totalAmount - selectedBill.paidAmount}
              </td>
              <td className="px-4 py-2 md:table-cell border border-solid border-blueGray-100 text-xs sm:text-sm md:text-base whitespace-nowrap">
                <span className="md:hidden">Progress: </span>
                <div className="flex items-center">
                  <span className="mr-2">
                    {((selectedBill.paidAmount / selectedBill.totalAmount) * 100).toFixed(2)}%
                  </span>
                  <div className="relative w-full">
                    <div
                      className={`overflow-hidden h-2 text-xs flex rounded ${
                        selectedBill.paidAmount === selectedBill.totalAmount
                          ? "bg-green-200"
                          : "bg-red-200"
                      }`}
                    >
                      <div
                        style={{
                          width: `${
                            (selectedBill.paidAmount / selectedBill.totalAmount) * 100
                          }%`,
                        }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                          selectedBill.paidAmount === selectedBill.totalAmount
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2 text-center md:table-cell bg-blueGray-50 text-green-500 border border-solid border-blueGray-100 text-xs sm:text-sm md:text-base whitespace-nowrap">
              
              <button className="ml-2 focus:outline-none" onClick={()=>{
                  navigate(`/admin-panel/addPayment/${bill.customerId}/${bill._id}/`)
                }}>
          <FontAwesomeIcon icon={faMoneyCheck} />
          </button>

          <button className=" ml-2 focus:outline-none" onClick={()=>{
                  navigate(`/admin-panel/PaymentHistory/${bill._id}/${bill.customerId}`)
                }}>
          <FontAwesomeIcon className="text-blue-500" icon={faHistory} />
         
          </button>
          
          </td>
            </tr>
          );
        }

        return null; // Render nothing if the bill is not found
      })()}
    </tbody>
  </table>
</div>


<div className="mx-auto mt-8 p-8 bg-white rounded shadow-lg">
  <div className="flex flex-col mx-0 mt-8">
    <table className="min-w-full divide-y divide-slate-500">
      <thead>
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
          >
            Description
          </th>
          <th
            scope="col"
            className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
          >
            Square Foot
          </th>
          <th
            scope="col"
            className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
          >
            Quantity
          </th>
          <th
            scope="col"
            className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
          >
            Rate
          </th>
          <th
            scope="col"
            className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
          >
            Amount
          </th>
          <th
            scope="col"
            className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {bill.formFields.map((field, fieldIndex) => [
          Array.isArray(field) ? (
            field.map((subField, subFieldIndex) => (
              <tr
                key={subFieldIndex}
                className="border-b border-slate-200"
              >
                <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                  <div className="font-medium text-slate-700">
                    {subField.productName}
                  </div>
                </td>
                <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                  {subField.result}
                </td>
                <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                  {subField.prodQuantity}
                </td>
                <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                  {subField.prodRate}
                </td>
                <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                  {subField.prodamount}
                </td>
                <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                  <button className="ml-2 focus:outline-none">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr
              className="border-b border-slate-200"
              key={fieldIndex}
            >
              <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                <div className="font-medium text-slate-700">
                  {field.productName}
                </div>
              </td>
              <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                {field.result}
              </td>
              <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                {field.prodQuantity}
              </td>
              <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                {field.prodRate}
              </td>
              <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                {field.prodamount}
              </td>
              <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                <button className="ml-2 focus:outline-none" onClick={()=>{
                  navigate(`/admin-panel/singleProd/${bill._id}/View/${field._id}`)
                }}>
                  <FontAwesomeIcon className="text-blue-500" icon={faEye} />
                
                </button>
                <button className="ml-2 focus:outline-none" onClick={()=>{
                  navigate(`/admin-panel/Delivery/${bill.customerId}/${bill._id}/${field._id}`)
                }}>
                <FontAwesomeIcon className="text-yellow-300" icon={faTruck} />
                </button>
                <button className="ml-2 focus:outline-none" onClick={()=>{
                  navigate(`/admin-panel/completedDelivery/${bill.customerId}/${bill._id}/${field._id}`)
                }}>
                <FontAwesomeIcon className="text-green-500" icon={faCheckCircle } />
                </button>
              </td>
            </tr>
          ),
        ])}
      </tbody>
      <tfoot>
        <tr>
          <th
            scope="row"
            colSpan="4"
            className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
          >
            Sub total
          </th>
          <th
            scope="row"
            className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
          >
            Sub total
          </th>
          <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
            {bills.length > 0 &&
              findBillById(bills, bill._id)?.totalAmount}
          </td>
        </tr>
        <tr>
          <th
            scope="row"
            colSpan="4"
            className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
          >
            Paid Amount
          </th>
          <th
            scope="row"
            className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
          >
            Paid Amount
          </th>
          <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
            {bills.length > 0 &&
              findBillById(bills, bill._id)?.paidAmount}
          </td>
        </tr>
        <tr>
          <th
            scope="row"
            colSpan="4"
            className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
          >
            Balance
          </th>
          <th
            scope="row"
            className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
          >
            Balance
          </th>
          <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
            {bills.length > 0 &&
              findBillById(bills, bill._id)?.balance}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InvoiceHub;
