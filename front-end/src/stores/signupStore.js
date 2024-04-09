import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useSignupStore = create(
  devtools((set) => ({
    data: [],
    singleUser: [],
    error: null,
    isLoading: false,
    addUser: async (newUser) => {
      try {
        set({ isLoading: true, error: null });
        const response = await axios.post(
          "http://localhost:8000/api/customer",
          newUser
        );
        set((state) => ({
          data: [...state.data, response.data],
          isLoading: false,
        }));
      } catch (error) {
        console.error("Error registering User:", error);
        set({ error, isLoading: false });
      }
    },
    getUsers: async () => {
      try {
        set({ isLoading: true, error: null });
        const response = await axios.get("http://localhost:8000/api/customer");
        set({ data: response.data, isLoading: false });
      } catch (error) {
        console.error("Error fetching data:", error);
        set({ error, isLoading: false });
      }
    },
    getUserById: async (userId) => {
      try {
        set({ isLoading: true, error: null });
        const response = await axios.get(
          `http://localhost:8000/api/customer/${userId}`
        );
        set({ singleUser: response.data, isLoading: false });
      } catch (error) {
        console.error("Error fetching data:", error);
        set({ error, isLoading: false });
      }
    },
    deleteUserById: async (userId) => {
      try {
        set({ isLoading: true, error: null });
        await axios.delete(`http://localhost:8000/api/customer/${userId}`);
        set((state) => ({
          data: state.data.filter((user) => user._id !== userId),
          isLoading: false,
        }));
      } catch (error) {
        console.error("Error deleting user:", error);
        set({ error, isLoading: false });
      }
    },
    updateUserById: async (userId, updatedData) => {
      try {
        set({ isLoading: true, error: null });
        const response = await axios.put(
          `http://localhost:8000/api/customer/${userId}`,
          updatedData
        );
        set((state) => ({
          data: state.data.map((user) =>
            user._id === userId ? { ...user, ...response.data } : user
          ),
          isLoading: false,
        }));
      } catch (error) {
        console.error("Error updating user:", error);
        set({ error, isLoading: false });
      }
    },
    signup: async (userData) => {
      try {
        set({ isLoading: true, error: null });
        const response = await axios.post(
          "http://localhost:8000/api/customer/signup",
          userData
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            _id: response.data._id,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            email: response.data.email,
          })
        );
        // Assuming the response contains user details and token
        set({ user: response.data, isLoading: false });
        return response.data;
      } catch (error) {
        console.error("Error signing up:", error);
        set({ error, isLoading: false });
      }
    },

    login: async (userData) => {
      try {
        set({ isLoading: true, error: null });
        const response = await axios.post(
          "http://localhost:8000/api/customer/login",
          userData
        );
        // Assuming the response contains user details and token
        set({ user: response.data, isLoading: false });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            _id: response.data._id,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            email: response.data.email,
          })
        );

        return response.data;
      } catch (error) {
        console.error("Error logging in:", error);
        set({ error, isLoading: false });
      }
    },

    signupWithGoogle: async (userData) => {
      try {
        set({ isLoading: true, error: null });
        const response = await axios.post(
          "http://localhost:8000/api/customer/google",
          userData
        );
        // Assuming the response contains user details and token
        set({ user: response.data, isLoading: false });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            _id: response.data._id,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            email: response.data.email,
          })
        );
        return response.data;
      } catch (error) {
        console.error("Error signing up with Google:", error);
        set({ error, isLoading: false });
      }
    },
    logout: () => {
      // Clear user data from localStorage and state
      localStorage.removeItem("token");
      localStorage.removeItem("userDetails");
      window.location.reload();
      set({ user: null });
    },
  }))
);

export default useSignupStore;
