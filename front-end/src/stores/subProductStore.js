// useSubProductStore.js
import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const subProductStore = (set) => ({
  data: [], // Initially an array
  error: null,
  isLoading: false,
  getSubProducts: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get("http://localhost:8000/api/subproducts");
      set({ data: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ error, isLoading: false });
    }
  },
  addSubProduct: async (newSubProduct) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post(
        "http://localhost:8000/api/subproducts",
        newSubProduct
      );
      console.log("Add Subproduct Response:", response.data); // Log the response
      set((state) => ({
        data: [...state.data, response.data],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error adding subproduct:", error);
      set({ error, isLoading: false });
    }
  },
  uploadImage: async (formData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post(
        "http://localhost:8000/api/upload",
        formData
      );
      set((state) => ({
        data: [...state.data, response.data],
        isLoading: false,
      }));

      // Return the uploaded image path
      return { image: response.data.image };
    } catch (error) {
      console.error("Error uploading image:", error);
      set({ error, isLoading: false });
    }
  },
  deleteSubProduct: async (subProductId) => {
    try {
      set({ isLoading: true, error: null });
      await axios.delete(
        `http://localhost:8000/api/subproducts/${subProductId}`
      );
      set((state) => ({
        data: state.data.filter(
          (subProduct) => subProduct._id !== subProductId
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.log("Error deleting product", error);
      set({ error, isLoading: false });
    }
  },
  updateSubProduct: async (subProductId, updatedSubProduct) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.put(
        `http://localhost:8000/api/subproducts/${subProductId}`,
        updatedSubProduct
      );
      set((state) => ({
        data: state.data.map((product) =>
          product._id === subProductId ? response.data : product
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error updating product:", error);
      set({ error, isLoading: false });
    }
  },
  getSubProductById: async (subProductId) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get(
        `http://localhost:8000/api/subproducts/${subProductId}`
      );
      set({ data: [response.data], isLoading: false });
      return response.data;
    } catch (error) {
      console.error("Error fetching subproduct by ID:", error);
      set({ error, isLoading: false });
    }
  },
});

const useSubProductStore = create(devtools(subProductStore));

export default useSubProductStore;
