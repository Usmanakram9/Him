import React, { useEffect } from "react";
import "../assets/css/ProductDetailsScreen.css";
import { useParams } from "react-router-dom";
import useSubProductStore from "../stores/subProductStore";
import Loading from "../components/Loading";

const ProductDetailsScreen = () => {
  const { productId } = useParams();

  const { data, getSubProductById, isLoading, error } = useSubProductStore();

  useEffect(() => {
    getSubProductById(productId);
  }, [productId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section
      id="product-detail"
      className="product-details bg-gray-900 text-white py-20"
    >
      <div className="container mx-auto flex flex-col items-center">
        {data.length > 0 && (
          <>
            <div className="w-96 h-96 overflow-hidden mb-8">
              <img
                className="w-full h-full object-cover rounded-md "
                src={data[0].subimage}
                alt="Product"
              />
            </div>

            {/* Right side with product name and description */}
            <div className="text-center">
              <h2 className="text-3xl font-semibold mb-4">
                {data[0].subprodname}
              </h2>
              <p className="text-gray-300 mb-6">{data[0].subproddesc}</p>
              {/* "Buy Now" button centered at the bottom */}
              <button className="bg-transparent outline outline-1 outline-amber-500 text-white px-8 py-3 rounded-full hover:bg-gray-800 hover:text-white hover:outline-none">
                Buy Now
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetailsScreen;
