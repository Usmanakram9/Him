import React, { useEffect, useState } from "react";
import NewNavBar from "../NewNavBar";
import { useNavigate } from "react-router-dom";

const AddressCheckout = () => {
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const storedAddress = localStorage.getItem("checkout-address");
  const defaultAddress = {
    house: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  };
  const [address, setAddress] = useState(
    storedAddress ? JSON.parse(storedAddress) : defaultAddress
  );

  useEffect(() => {
    if (!userDetails) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleNext = () => {
    // Save address to local storage
    localStorage.setItem("checkout-address", JSON.stringify(address));
    navigate("/checkout-payment");
  };

  return (
    <>
      <NewNavBar />
      <div className="max-w-lg mx-auto p-8 bg-gray-50 mt-20 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Enter Your Address</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              House:
            </label>
            <input
              type="text"
              name="house"
              value={address.house}
              onChange={handleChange}
              placeholder="Enter house/building number"
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Street:
            </label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              placeholder="Enter street address"
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City:
            </label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 md:flex md:justify-between">
            <div className="w-full md:w-1/2 md:mr-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                State:
              </label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleChange}
                placeholder="Enter state"
                className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Postal Code:
              </label>
              <input
                type="text"
                name="postalCode"
                value={address.postalCode}
                onChange={handleChange}
                placeholder="Enter postal code"
                className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </form>
        <button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default AddressCheckout;
