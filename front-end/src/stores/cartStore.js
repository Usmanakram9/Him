import { create } from "zustand";

const useCartStore = create((set) => {
  // Initialize cartItems from local storage or as an empty array if not found
  const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  return {
    cartItems: savedCartItems,
    setCartItems: (items) => {
      // Update local storage whenever cart items are set
      localStorage.setItem("cartItems", JSON.stringify(items));
      set({ cartItems: items });
    },
  };
});

export default useCartStore;
