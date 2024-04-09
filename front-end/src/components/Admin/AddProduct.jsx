import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import useProductStore from "../../stores/productStore";
import Toast, { showSuccessToast, showErrorToast } from "../Toast";
import Loading from "../Loading";

const AddProduct = () => {
  const {
    data,
    getProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    isLoading,
    error,
  } = useProductStore();
  const [productName, setProductName] = useState("");
  const [buttonName, setButtonName] = useState("Add");
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const addProductHandler = async (e) => {
    e.preventDefault();

    try {
      if (selectedProductId) {
        await updateProduct(selectedProductId, { nameofproduct: productName });
        showSuccessToast("Product updated successfully!");
        setButtonName("Add");
        setSelectedProductId(null);
      } else {
        await addProduct({ nameofproduct: productName });
        showSuccessToast("Product added successfully!");
      }

      setProductName("");
    } catch (error) {
      showErrorToast(`Error: ${error.message}`);
    }
  };

  const deleteHandler = async (productId) => {
    try {
      await deleteProduct(productId);
      showSuccessToast("Product deleted successfully!");
    } catch (error) {
      showErrorToast(`Error: ${error.message}`);
    }
  };

  const editHandler = (productId, productName) => {
    setProductName(productName);
    setButtonName("Update");
    setSelectedProductId(productId);
  };

  const style = {
    fontFamily: "Courier New",
  };

  return (
    <>
      <AdminNavBar />
      <div
        style={style}
        className="flex flex-col items-center justify-center h-full"
      >
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="bg-gray-900 rounded-md p-4">
            <h1 className="text-xl font-bold text-white mb-4">Add Product</h1>
            <div className="flex flex-col md:flex-row">
              <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="flex-grow p-2 rounded-l border-0 bg-transparent outline-none text-white placeholder-white dark:placeholder-gray-500 dark:text-white mb-2 md:mb-0 md:mr-2"
              />
              <button
                className="bg-white dark:bg-[#0F172A] text-indigo-500 dark:text-white p-2 rounded-r hover:bg-gray-800 hover:text-white transition duration-300"
                onClick={addProductHandler}
              >
                {buttonName}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Adding products table here */}
      <div
        style={style}
        className="flex justify-center items-center h-full mt-24"
      >
        <div className="relative w-full md:w-4/5 lg:w-3/5 xl:w-2/3 overflow-x-auto shadow-md sm:rounded-lg">
          <h1 className="text-4xl text-black text-center mb-12">
            All Products
          </h1>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-900 uppercase dark:bg-gray-900 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <Loading />}
              {error && showErrorToast(error)}
              {data &&
                data.map((product, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {product.nameofproduct}
                    </th>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() =>
                          editHandler(product._id, product.nameofproduct)
                        }
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => deleteHandler(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Toast />
      <AdminFooter />
    </>
  );
};

export default AddProduct;
