import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSubProductStore from "../../../stores/subProductStore";
import Loading from "../../../shared/Loading";

const Products = () => {
  const { getSubProducts, isLoading } = useSubProductStore();
  const [subProducts, setSubProducts] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetechSubProducts = async () => {
      const res = await getSubProducts();
      setSubProducts(res.slice(0, 3));
    };
    fetechSubProducts();
  }, [getSubProducts]);

  const handleclick = async (subProductId,e) => {
    e.preventDefault();
    navigate(`../SingleProduct/${subProductId}`);
  }
  return (
    <>
      <div className="h-screen md:h-min flex flex-col w-full p-10">
        <div className="flex justify-center items-center flex-col pb-4">
          <div className="head">
            <div className="flex text-gray-500">EXPERIENCE MARBLE LUXURY</div>
          </div>
          <div className="des">
            <div className="flex pt-5 md:text-5xl text-2xl">
              Our most{" "}
              <span className="ml-2 border-b border-b-8 border-cyan-800 mr-2">
                Popular{" "}
              </span>{" "}
              Products
            </div>
          </div>
        </div>
 {isLoading && (
   <Loading />
 )}
        <div className="flex flex-col md:h-1/2 md:flex-row justify-between space-x-2 w-full pb-2">
          {subProducts &&
            subProducts.map((subProduct, index) => (
              <div key={index} className="flex w-2/4 ">
                <div className="relative w-full overflow-hidden">
                  <img
                    src={subProduct.subimage}
                    className="h-3/4 rounded"
                    alt="asdf"
                  />
                  <div className="name">
                    <p className="text-2xl font-bold">{subProduct.product}</p>
                  </div>
                  <div className="des">
                    <p>{subProduct.subprodname}</p>
                  </div>
                  <div className="price text-1xl font-bold">
                    <p>{subProduct.subproPrice}</p>
                  </div>
                  <div className="button-container absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <button
                     onClick={(e) => handleclick(subProduct._id, e)}
                      type="button"
                      className="bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900 focus:shadow-outline text-white py-2 px-4 rounded transition-transform transform translate-y-full"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="flex justify-center">
          <button className="border border-2 border-black text-black font-bold hover:bg-black hover:text-white focus:shadow-outline py-2 px-4 rounded transition-colors duration-1000">
            View All Products
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;
