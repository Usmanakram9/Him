import React, { useState, useEffect } from "react";
import products from "../utils/products.json";
import NewNavBar from "../components/NewNavBar";
import CartModal from "../components/cart/CartModal";

const ProductList = () => {
  const [cartItems, setCartItems] = useState([]); // State to manage cart items
  const [showCartModal, setShowCartModal] = useState(false); // State to manage modal visibility

  // Function to fetch cart items from local storage
  const fetchCartItemsFromLocalStorage = () => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  };

  // Fetch cart items from local storage when the component mounts
  useEffect(() => {
    fetchCartItemsFromLocalStorage();
  }, []);

  // Function to add a product to the cart
  // Function to add a product to the cart
  const handleAddToCart = (productId) => {
    const selectedProduct = products.find(
      (product) => product.product_id === productId
    );
    if (selectedProduct) {
      const isItemInCart = cartItems.some(
        (item) => item.product_id === productId
      );
      if (!isItemInCart) {
        // If the product is not in the cart, add it to the state with quantity initialized to 1
        const updatedCartItems = [
          ...cartItems,
          { ...selectedProduct, quantity: 1 },
        ];
        setCartItems(updatedCartItems);
        setShowCartModal(true);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      } else {
        console.log("Product is already in the cart.");
      }
    }
  };

  // Function to remove an item from the cart
  const handleRemoveItemFromCart = (productId) => {
    // Remove the item from cart items state
    const updatedCartItems = cartItems.filter(
      (item) => item.product_id !== productId
    );
    setCartItems(updatedCartItems);
    // Update local storage with the updated cart items
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // Toggle function to open or close the modal
  const toggleCartModal = () => {
    setShowCartModal(!showCartModal);
  };

  return (
    <>
      <NewNavBar />
      <h1 className="mx-auto w-full font-extralight text-6xl my-5 border-b-2 border-gray-200 pb-2 text-gray-600 text-center">
        Product List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="bg-white rounded-lg overflow-hidden shadow-md relative"
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-gray-700 mb-2">Color: {product.color}</p>
              <p className="text-gray-700 mb-2">Type: {product.type}</p>
              <p className="text-gray-700 mb-2">Price: ${product.price}</p>
              <p className="text-gray-700 mb-2">
                Available Quantity: {product.quantity_available}
              </p>
            </div>
            <button
              onClick={() => handleAddToCart(product.product_id)}
              className="absolute bottom-0 left-0 w-full py-2 bg-blue-500 text-white hover:bg-blue-600 transition duration-300 opacity-0 hover:opacity-100"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {/* Button to toggle cart modal */}
      <button
        onClick={toggleCartModal}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Open Cart
      </button>
      {/* Render cart modal with updated cart items */}
      {showCartModal && (
        <CartModal
          cartItems={cartItems} // Pass the updated cart items
          onClose={() => {
            toggleCartModal();
            fetchCartItemsFromLocalStorage(); // Fetch updated cart items from local storage when closing the modal
          }}
          onRemoveItem={handleRemoveItemFromCart} // Pass function to remove item from cart
        />
      )}
    </>
  );
};

export default ProductList;
