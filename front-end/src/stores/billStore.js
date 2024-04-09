  import { create } from 'zustand';
  import axios from 'axios';

  export const useBillStore = create((set) => ({
    bills: [],
    singleBill: null,
    error: null,
    isLoading: false,
    
    createBill: async (newBill) => {
      try {
        set({ isLoading: true, error: null });
        const response = await axios.post('http://localhost:8000/api/bill', newBill);
        set((state) => ({ bills: [...state.bills, response.data], isLoading: false }));
      } catch (error) {
        console.error('Error creating bill:', error);
        console.error('Request Payload:', newBill); // Log the request payload for debugging
        set({ error, isLoading: false });
      }
    },
    
    getBills: async () => {
      try {
        set({ isLoading: true, error: null });
        const response = await axios.get('http://localhost:8000/api/bill');
        set({ bills: response.data, isLoading: false });
      } catch (error) {
        console.error('Error fetching bills:', error);
        set({ error, isLoading: false });
      }
    },
    
    getSingleBill: async (billId) => {
      try {
        set({ isLoading: true, error: null });
        const response = await axios.get(`http://localhost:8000/api/bill/${billId}`);
        set({ singleBill: response.data, isLoading: false });
      } catch (error) {
        console.error('Error fetching single bill:', error);
        set({ error, isLoading: false });
      }
    },
    getBillsByCustomerId: async (customerId) => {
      try {
        set({ isLoading: true, error: null });
        const response = await axios.get(`http://localhost:8000/api/bill/customer/${customerId}`);
        set({ bills: response.data, isLoading: false });
      } catch (error) {
        console.error('Error fetching bills by customerId:', error);
        set({ error, isLoading: false });
      }
    },
    
    updateBill: async (billId, updatedData) => {
      try {
        set({ isLoading: true, error: null });
        const response = await axios.put(`http://localhost:8000/api/bill/${billId}`, updatedData);
        set((state) => ({
          bills: state.bills.map((bill) =>
            bill._id === billId ? { ...bill, ...response.data } : bill
          ),
          isLoading: false,
        }));
      } catch (error) {
        console.error('Error updating bill:', error);
        set({ error, isLoading: false });
      }
    },
    
    deleteBill: async (billId) => {
      try {
        set({ isLoading: true, error: null });
        await axios.delete(`http://localhost:8000/api/bill/${billId}`);
        set((state) => ({
          bills: state.bills.filter((bill) => bill._id !== billId),
          isLoading: false,
        }));
      } catch (error) {
        console.error('Error deleting bill:', error);
        set({ error, isLoading: false });
      }
    },

    getFormFieldById: async (billId, formFieldId) => {
      try {
        set({ isLoading: true, error: null });
        const response = await axios.get(`http://localhost:8000/api/bill/${billId}/singleBill/${formFieldId}`);
        
        // Assuming the API returns the form field directly
        const formField = response.data;

        set({ singleFormField: formField, isLoading: false });
      } catch (error) {
        console.error('Error fetching single form field:', error);
        set({ error, isLoading: false });
      }
    },
  }));


