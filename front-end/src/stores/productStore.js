// useProductStore.js
import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const productStore = (set) => ({
  data: [],
  error: null,
  isLoading: false,
  getProducts: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get('http://localhost:8000/api/product');
      set({ data: response.data, isLoading: false });
    } catch (error) {
      console.error('Error fetching data:', error);
      set({ error, isLoading: false });
    }
  },
  addProduct: async (newProduct) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post('http://localhost:8000/api/product', newProduct);
      set((state) => ({ data: [...state.data, response.data], isLoading: false }));
    } catch (error) {
      console.error('Error adding product:', error);
      set({ error, isLoading: false });
    }
  },
  deleteProduct: async (productId) => {
    try {
      set({ isLoading: true, error: null });
      await axios.delete(`http://localhost:8000/api/product/${productId}`);
      set((state) => ({
        data: state.data.filter((product) => product._id !== productId),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error deleting product:', error);
      set({ error, isLoading: false });
    }
  },
  updateProduct: async (productId, updatedProduct) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.put(`http://localhost:8000/api/product/${productId}`, updatedProduct);
      set((state) => ({
        data: state.data.map((product) => (product._id === productId ? response.data : product)),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error updating product:', error);
      set({ error, isLoading: false });
    }
  },
});

const useProductStore = create(
  devtools(productStore)
);

export default useProductStore;
