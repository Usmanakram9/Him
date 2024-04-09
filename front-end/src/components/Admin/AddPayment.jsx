import React, {useState,useEffect} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { usePaymentStore } from '../../stores/paymentStore';
import Toast, { showSuccessToast, showErrorToast } from '../Toast';
import { useBillStore } from '../../stores/billStore';

const AddPayment = () => {
    const navigate = useNavigate();
    const { custID,billId } = useParams();
    const {createPayment} = usePaymentStore();
    const {
        getSingleBill,
        singleBill,
        isLoading,
        error,
      } = useBillStore();
      const totalAmount = singleBill?.totalAmount || 0;
      const balance = singleBill?.balance || 0;

      useEffect(() => {
        // Fetch the form field when the component mounts
        
        const fetchBillDetails = async () => {
          await getSingleBill(billId);
        };
    
        fetchBillDetails();
      }, [billId]);

      useEffect(() => {
        // Update the state when the bill details are fetched
        setFormData((prevData) => ({
          ...prevData,
          totalAmount: totalAmount,
          balance: balance,
        }));
      }, [totalAmount, balance]);

    const [formData, setFormData] = useState({
        billId:billId,
        customerId: custID,
        totalAmount:totalAmount,
        paid:  "",
        balance: balance,
        paidVia: 'cash', // set default value if needed
  chequeNumber: '',
  transactionNumber: '',
  dated: new Date().toISOString().split('T')[0], 
      });

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Add your form submission logic here
        await createPayment(formData);
        showSuccessToast("Delivery Made successfully!");
        setFormData({
            paid: "",
            balance: '',
            paidVia: 'cash',
            chequeNumber: '',
            transactionNumber: '',
            dated: '',
           
          });
      };
      const handleInputChange = (e) => {
        const { name, value } = e.target;
      
        if (name === 'paid') {
          const paidValue = parseInt(value, 10) || 0;
          const newBalance = balance - paidValue;
          setFormData((prevData) => ({
            ...prevData,
            [name]: paidValue,
            balance: newBalance >= 0 ? newBalance : 0,
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
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
    <div className="container mx-auto mt-8 p-8 bg-gray-100 rounded shadow-lg">
      <button
        className="text-gray-500 text-sm mb-4"
        onClick={() => {
            navigate(`/admin-panel/InvoiceHub/${custID}`);
        }}
      >
        &larr; Back
      </button>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700 mb-2">
              Paid:
            </label>
            <input
              type="text"
              name="paid"
              value={formData.paid}
              onChange={handleInputChange}
              placeholder="Enter paid amount"
              className="border p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Balance */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700 mb-2">
              Balance:
            </label>
            <input
              type="text"
              name="balance"
              value={formData.balance}
             
              placeholder="Enter balance amount"
              className="border p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Paid Via */}
          <div className="flex flex-col">
  <label className="text-lg font-semibold text-gray-700 mb-2">
    Paid Via:
  </label>
  <select
    name="paidVia"
    value={formData.paidVia}
    onChange={handleInputChange}
    className="border p-2 rounded focus:outline-none focus:border-blue-500"
  >
    <option value="cash">Cash</option>
    <option value="cheque">Cheque</option>
    <option value="transaction">Transaction</option>
  </select>
</div>

{formData.paidVia === 'cheque' && (
  <div className="flex flex-col">
    <label className="text-lg font-semibold text-gray-700 mb-2">
      Cheque Number:
    </label>
    <input
      type="text"
      name="chequeNumber"
      value={formData.chequeNumber}
      onChange={handleInputChange}
      placeholder="Enter cheque number"
      className="border p-2 rounded focus:outline-none focus:border-blue-500"
    />
  </div>
)}

{formData.paidVia === 'transaction' && (
  <div className="flex flex-col">
    <label className="text-lg font-semibold text-gray-700 mb-2">
      Transaction Number:
    </label>
    <input
      type="text"
      name="transactionNumber"
      value={formData.transactionNumber}
      onChange={handleInputChange}
      placeholder="Enter transaction number"
      className="border p-2 rounded focus:outline-none focus:border-blue-500"
    />
  </div>
)}

          {/* Date */}
          <div className="flex flex-col">
  <label className="text-lg font-semibold text-gray-700 mb-2">
    Date:
  </label>
  <input
    type="date"
    name="dated"
    value={formData.dated}
    onChange={handleInputChange}
    className="border p-2 rounded focus:outline-none focus:border-blue-500"
  />
</div>

          {/* ... other input fields ... */}

          {/* Submit Button */}
          <div className="mt-6">
           <button
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
  type="submit"
>
  Submit
</button>
<Toast />
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddPayment