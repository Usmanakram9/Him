import { create } from 'zustand';
import axios from 'axios';

export const usePaymentStore = create((set) => ({
  payments: [],
  singlePayment: null,
  error: null,
  isLoading: false,
  
  createPayment: async (newPayment) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post('http://localhost:8000/api/payments', newPayment);
      set((state) => ({ payments: [...state.payments, response.data], isLoading: false }));
    } catch (error) {
      console.error('Error creating payment:', error);
      console.error('Request Payload:', newPayment); // Log the request payload for debugging
      set({ error, isLoading: false });
    }
  },
  
  getPayments: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get('http://localhost:8000/api/payments');
      set({ payments: response.data, isLoading: false });
    } catch (error) {
      console.error('Error fetching payments:', error);
      set({ error, isLoading: false });
    }
  },
  
  getSinglePayment: async (paymentId) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get(`http://localhost:8000/api/payments/${paymentId}`);
      set({ singlePayment: response.data, isLoading: false });
    } catch (error) {
      console.error('Error fetching single payment:', error);
      set({ error, isLoading: false });
    }
  },
  
  updatePayment: async (paymentId, updatedData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.put(`http://localhost:8000/api/payments/${paymentId}`, updatedData);
      set((state) => ({
        payments: state.payments.map((payment) =>
          payment._id === paymentId ? { ...payment, ...response.data } : payment
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error updating payment:', error);
      set({ error, isLoading: false });
    }
  },
  
  deletePayment: async (paymentId) => {
    try {
      set({ isLoading: true, error: null });
      await axios.delete(`http://localhost:8000/api/payments/${paymentId}`);
      set((state) => ({
        payments: state.payments.filter((payment) => payment._id !== paymentId),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error deleting payment:', error);
      set({ error, isLoading: false });
    }
  },
 
  getPaymentsByBillId: async (billId,custId) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get(`http://localhost:8000/api/payments/getBy/${billId}/${custId}`);
      set({ payments: response.data, isLoading: false });
    } catch (error) {
      console.error('Error fetching payments by bill_id:', error);
      set({ error, isLoading: false });
    }
  },
}));
