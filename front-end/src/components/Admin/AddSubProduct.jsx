import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

import useSubProductStore from "../../stores/subProductStore";
import Toast, { showSuccessToast, showErrorToast } from "../Toast";
import Loading from "../../shared/Loading";

const AddSubProduct = () => {
  const [productName, setProductName] = useState("");
  const [pro, setPro] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [buttonName, setButtonName] = useState("Add SubProduct");
  const [selectedSubProductId, setSelectedSubProductId] = useState(null);

  const {
    data: subProductData,
    getSubProducts,
    addSubProduct,
    deleteSubProduct,
    updateSubProduct,
    isLoading: subProductLoading,
  } = useSubProductStore();

  useEffect(() => {
    const fetchData = async () => {
      await getSubProducts();
    };
    fetchData();
  }, [getSubProducts]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      // if (!selectedProduct || !productName || !description || !selectedFile) {
      //   throw new Error("Please fill in all fields.");
      // }

      // Upload the image first
      const imageFormData = new FormData();
      imageFormData.append("image", selectedFile);
      const { image } = await useSubProductStore
        .getState()
        .uploadImage(imageFormData);

      // Prepare subProduct data
      const subProductData = {
        product: pro, // Make sure selectedProduct is the correct product ID
        subimage: image,
        subprodname: productName,
        subproPrice: price,
        subproddesc: description,
      };

      // if (
      //   !subProductData.subimage ||
      //   !subProductData.subprodname ||
      //   !subProductData.subproddesc
      // ) {
      //   throw new Error("Please fill in all fields.");
      // }

      if (selectedSubProductId) {
        await updateSubProduct(selectedSubProductId, subProductData);
        showSuccessToast("SubProduct updated successfully!");
      } else {
        // Add new subProduct
        await addSubProduct(subProductData);
        showSuccessToast("SubProduct added successfully!");
      }

      // Clear form fields and reset button state
      setProductName("");
      setPro("");
      setPrice("");
      setDescription("");
      setSelectedFile(null);
      setSelectedSubProductId(null);
      setButtonName("Add SubProduct");

      // Fetch updated subProducts
      getSubProducts();
    } catch (error) {
      showErrorToast(`Error: ${error.message}`);
    }
  };

  // Deleteing a SubProduct
  const deleteHandler = async (subProductId) => {
    try {
      await deleteSubProduct(subProductId);
      showSuccessToast("Product deleted successfully!");
    } catch (error) {
      showErrorToast(`Error: ${error.message}`);
    }
  };

  const editHandler = async (subProduct) => {
    try {
      // Extract the product ID directly
      const productId = subProduct.product._id;
      console.log(productId);
      // Set the correct product ID
      setProductName(subProduct.product);
      setPro(subProduct.subprodname);
      setPrice(subProduct.subproPrice);
      setDescription(subProduct.subproddesc);
      setSelectedFile(subProduct.subimage);
      setSelectedSubProductId(subProduct._id);
      setButtonName("Update");
    } catch (error) {
      console.error(`Error in editHandler: ${error.message}`);
    }
  };
  return (
    <>
      <AdminNavBar />

      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Add Product Details</p>
                  <p>Please fill out all the fields.</p>
                </div>
                <div className="lg:col-span-2">
                  {/* <form > */}
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-3">
                      <label htmlFor="productName">Product Name</label>
                      <input
                        type="text"
                        placeholder="Enter Product Name"
                        id="productName"
                        name="productName"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="pro">Product Category</label>
                      <input
                        placeholder="Enter Product Category"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        id="pro"
                        name="pro"
                        value={pro}
                        onChange={(e) => setPro(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="proPrice">Product Price</label>
                      <input
                        placeholder="Enter Price"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        id="proPrice"
                        name="proPrice"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="image">Upload Image</label>
                      <input
                        type="file"
                        id="image"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="description">Description</label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write Description"
                      />
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          type="button"
                          onClick={handleAddProduct}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          {buttonName}
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {subProductLoading && <Loading />}

      <div className="flex justify-center items-center h-full">
        <div className="relative w-3/4 overflow-x-auto shadow-md sm:rounded-lg">
          <h1 className="text-4xl text-black text-center mb-8 md:mb-12">
            All Sub-Products
          </h1>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:bg-gray-900 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Sub Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
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
              {Array.isArray(subProductData) &&
                subProductData.map((subProduct, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {subProduct.product}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {subProduct.subprodname}
                    </td>
                    <td className="px-6 py-4">{subProduct.subproddesc}</td>
                    <td className="px-6 py-4">
                      {subProduct.subimage &&
                        typeof subProduct.subimage === "string" && (
                          <img
                            src={subProduct.subimage}
                            alt="SubProduct"
                            className="h-28 w-28"
                          />
                        )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => editHandler(subProduct)}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => deleteHandler(subProduct._id)}
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

export default AddSubProduct;
