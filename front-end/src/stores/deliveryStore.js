import { create } from 'zustand';
import axios from 'axios';

export const useDeliveryStore = create((set) => ({
  deliveries: [],
  singleDelivery: null,
  error: null,
  isLoading: false,

  createDelivery: async (newDelivery) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post('http://localhost:8000/api/deliveries/', newDelivery);
      set((state) => ({ deliveries: [...state.deliveries, response.data], isLoading: false }));
    } catch (error) {
      console.error('Error creating delivery:', error);
      console.error('Request Payload:', newDelivery); // Log the request payload for debugging
      set({ error, isLoading: false });
    }
  },

  getAllDeliveries: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get('http://localhost:8000/api/deliveries');
      set({ deliveries: response.data, isLoading: false });
    } catch (error) {
      console.error('Error fetching deliveries:', error);
      set({ error, isLoading: false });
    }
  },

  getDeliveryById: async (deliveryId) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get(`http://localhost:8000/api/deliveries/${deliveryId}`);
      set({ singleDelivery: response.data, isLoading: false });
    } catch (error) {
      console.error('Error fetching single delivery:', error);
      set({ error, isLoading: false });
    }
  },

  updateDeliveryById: async (deliveryId, updatedData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.put(`http://localhost:8000/api/deliveries/${deliveryId}`, updatedData);
      set((state) => ({
        deliveries: state.deliveries.map((delivery) =>
          delivery._id === deliveryId ? { ...delivery, ...response.data } : delivery
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error updating delivery:', error);
      set({ error, isLoading: false });
    }
  },

  deleteDeliveryById: async (deliveryId) => {
    try {
      set({ isLoading: true, error: null });
      await axios.delete(`http://localhost:8000/api/deliveries/${deliveryId}`);
      set((state) => ({
        deliveries: state.deliveries.filter((delivery) => delivery._id !== deliveryId),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error deleting delivery:', error);
      set({ error, isLoading: false });
    }
  },
  getDeliveryByCustomerBillAndField: async (customerId, billId, formFieldId) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get(`http://localhost:8000/api/deliveries/${customerId}/${billId}/${formFieldId}`);
      set({ singleDelivery: response.data, isLoading: false });
    } catch (error) {
      console.error('Error fetching single delivery by customer, bill, and field:', error);
      set({ error, isLoading: false });
    }
  },
}));
