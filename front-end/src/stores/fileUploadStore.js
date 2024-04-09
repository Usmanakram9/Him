import {create} from 'zustand';
import axios from 'axios';

const useFileUploadStore = create((set) => ({
  imagePath: null,
  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('http://localhost:8000/api/upload', formData);

      // Update the store state with the uploaded image path
      set({ imagePath: response.data.image });

      return response.data.image;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  },
}));

export default useFileUploadStore;
