import React, { useState, useEffect } from "react";
import { FaTimes, FaTrash, FaShoppingCart } from "react-icons/fa"; // Importing FontAwesome icons
import useCartStore from "../../stores/cartStore";
import { useNavigate } from "react-router-dom";

const CartModal = ({ onClose }) => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCartStore();
  const [totalAmount, setTotalAmount] = useState(0); // State to store the total amount

  // Load cart items from local storage when the component mounts
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, [setCartItems]);

  useEffect(() => {
    calculateTotalAmount(cartItems);
  }, [cartItems]);

  const calculateTotalAmount = (items) => {
    const total = items.reduce(
      (acc, item) => acc + parseFloat(item.subTotal),
      0
    );
    setTotalAmount(parseFloat(total.toFixed(2)));
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleRemoveItem = (productId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.productId !== productId
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // const handleQuantityChange = (productId, newQuantity) => {
  //   // Handle quantity change
  //   const updatedCartItems = cartItems.map((item) =>
  //     item.productId === productId ? { ...item, quantity: newQuantity } : item
  //   );

  //   setCartItems(updatedCartItems);

  //   // Update local storage with the updated cart items
  //   localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  // };

  const handleCheckout = () => {
    if (userDetails) {
      navigate("/checkout-address");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg w-144 relative">
          <button
            onClick={handleCloseModal}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-700"
          >
            <FaTimes />
          </button>
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">My Cart</h2>
            <div
              className="cart-items-wrapper"
              style={{ maxHeight: "320px", overflowY: "auto" }}
            >
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="py-2 px-4">Product</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">Quantity</th>
                    <th className="py-2 px-4">Total</th>
                    <th className="py-2 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.productId} className="border-b">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <img
                            src={`https://via.placeholder.com/50x50?text=Product${item.productId}`}
                            alt={`Product ${item.productId}`}
                            className="mr-4 rounded"
                          />
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        ${item.prodPrice}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <select
                          value={item.quantity}
                          disabled // Add disabled attribute here
                          className="border rounded px-2 py-1 appearance-none" // Add appearance-none class to remove default dropdown button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                          }} // Add additional styling to make it look like an input field
                        >
                          {[...Array(10)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-4 text-center">
                        ${item.subTotal}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button
              onClick={handleCheckout}
              className="flex items-center justify-center bg-cyan-700 text-white px-4 py-2 rounded-md hover:bg-cyan-500"
            >
              <FaShoppingCart className="mr-2" /> Proceed to Checkout
            </button>
          </div>
          <div className="mt-4 text-right font-semibold">
            Total: ${totalAmount}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal;
