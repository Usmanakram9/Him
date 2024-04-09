import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/product-screen.css";
import useSubProductStore from "../stores/subProductStore";
import useProductStore from "../stores/productStore";
import NewNavBar from "../components/NewNavBar";


const ProductsScreen = () => {
  const { data, getSubProducts } = useSubProductStore();
  const { data: productData, getProducts } = useProductStore();

  useEffect(() => {
    getSubProducts();
    getProducts();
  }, []);

  const [selectedProductId, setSelectedProductId] = useState(null);

  const subMenuHandler = (productId) => {
    setSelectedProductId(productId);
  };

  const filterData = () => {
    if (!selectedProductId) {
      return data;
    }
    return data.filter((product) => product.product._id === selectedProductId);
  };

  return (
    <>
      <NewNavBar />
      <section
        id="product-screen"
        className="product-screen h-full bg-gray-900 text-white"
      >
        <div className="container mx-auto px-4 sm:px-8 pb-8 sm:pb-16 md:pb-24 lg:pb-28 mt-8 sm:mt-12 md:mt-16 lg:mt-20">
          <div className="submenu mt-20 overflow-hidden scrollbar-hide text-white overflow-x-auto bg-gray-800 bg-opacity-30 p-2 rounded-md mb-4 whitespace-nowrap">
            {productData &&
              productData.map((product) => (
                <button
                  key={product._id}
                  className="px-2 py-1 mx-1 rounded transition-all duration-300 hover:bg-gray-700"
                  onClick={() => subMenuHandler(product._id)}
                >
                  {product.nameofproduct}
                </button>
              ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filterData().map((product, index) => (
              <Link to={`/productdetail/${product._id}`} key={index}>
                <div className="w-full sm:max-w-md lg:max-w-full mx-auto bg-transparent outline-1 outline outline-slate-500 text-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl hover:bg-transparent hover:outline-amber-500 hover:outline-1 hover:outline transform hover:scale-105 transition duration-300">
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={product.subimage}
                      alt={product.subprodname}
                      className="w-full h-full object-cover transform scale-100 transition duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">
                        {product.subprodname}
                      </h2>
                    </div>
                    <div className="flex space-x-2 text-sm font-medium justify-start mt-4">
                      <button className="transition ease-in duration-300 inline-flex items-center text-sm font-medium bg-transparent outline outline-1 outline-slate-500 px-5 py-2 hover:outline hover:outline-1 hover:outline-amber-500 tracking-wider text-white rounded-full">
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      
      </section>
    </>
  );
};

export default ProductsScreen;
