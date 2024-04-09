import { create } from 'zustand';
import axios from 'axios';

export const usePaymentStore = create((set) => ({
  paymentResponse: null,
  error: null,
  isLoading: false,

  makePayment: async (paymentData) => {
    try {
      set({ isLoading: true, error: null });

      // Prepare API parameters
      const apiParams = {
        "pp_Version": "1.1",
        "pp_TxnType": "MWALLET",
        "pp_Language": "EN",
        "pp_MerchantID": null,
        "pp_SubMerchantID": "",
        "pp_Password": "802a2za59v",
        "pp_BankID": "",
        "pp_ProductID": "",
        "pp_TxnRefNo": "T20240408224357",
        "pp_Amount": "70000",
        "pp_TxnCurrency": "PKR",
        "pp_TxnDateTime": "20240408224357",
        "pp_BillReference": "billref",
        "pp_Description": "Description of transaction",
        "pp_TxnExpiryDateTime": "20240408224357",
        "pp_ReturnURL": "https://spotjoin.com",
        "pp_SecureHash": "2EB16791631F1FE1CE898873E935EC15D5C3277917DF407C652FDF90C6DE08D4",
        "ppmpf_1": "03110699799",
        "ppmpf_2": "",
        "ppmpf_3": "",
        "ppmpf_4": "",
        "ppmpf_5": "" // Add additional payment data
      };

      // Make the API request to JazzCash
      const response = await axios.post('https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction', apiParams);

      // Assuming the response contains payment confirmation or details
      // You can handle the response as needed, for example, updating a success message
      set({ paymentResponse: response.data, isLoading: false });
    } catch (error) {
      console.error('Error making payment:', error);
      set({ error, isLoading: false });
    }
  }, 
}));
