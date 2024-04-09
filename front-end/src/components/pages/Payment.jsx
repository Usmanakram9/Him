import React, { useState } from 'react';
import { usePaymentStore } from '../../stores/usePaymentStore';

const Payment = () => {
    const [paymentData, setPaymentData] = useState({
        amount: '', // Initialize with empty string
        paymentMethod: '', // Initialize with empty string or any default payment method
        // Add more payment fields here with default values as needed
      });
    
      const { makePayment, isLoading, error, paymentResponse } = usePaymentStore();
    
      const handlePayment = async () => {
        try {
          await makePayment();
          // Optionally, you can handle success cases or UI updates here
        } catch (error) {
          // Handle errors
          console.error('Error making payment:', error);
        }
      };
    
  return (
    <div>
    {/* UI for capturing payment details */}
    <input 
      type="text" 
      value={paymentData.amount} 
      onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
      placeholder="Enter amount"
    />
    {/* Add more input fields for other payment details */}
    
    {/* Button to trigger payment */}
    <button onClick={handlePayment} disabled={isLoading}>Make Payment</button>

    {/* Display loading spinner or error message based on isLoading and error states */}
    {isLoading && <div>Loading...</div>}
    {error && <div>Error: {error.message}</div>}
    {paymentResponse && <div>Payment Successful! Response: {JSON.stringify(paymentResponse)}</div>}
  </div>
  );
};

export default Payment;
