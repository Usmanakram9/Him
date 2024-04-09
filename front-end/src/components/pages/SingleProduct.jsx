import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer";
import NewNavBar from "../NewNavBar";
import BreadCrump from "../BreadCrump";
import { CiSearch } from "react-icons/ci";
import "../../assets/css/Product/SingleProduct.css";
import { FaRupeeSign } from "react-icons/fa6";
import useSubProductStore from "../../stores/subProductStore";

import MarbleCalculator from "./utils/MarbleCalculator";
import Loading from "../../shared/Loading";
const SingleProduct = () => {
  const containerRef = useRef(null);
  const { id } = useParams();

  const [showCalculator, setShowCalculator] = useState(false);
  const { getSubProductById, isLoading } = useSubProductStore();
  const [prod, setprod] = useState("");
  const [priceData, setPriceData] = useState({});

  const handleCalculateClick = () => {
    setShowCalculator(true);
  };

  const handleReverseClick = () => {
    setShowCalculator(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("mousemove", handleMouseMove);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await getSubProductById(id);
      setprod(res);
      //  console.log(res);
    };
    fetch();
  }, [id, getSubProductById]);

  console.log(priceData);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const img = container.querySelector("img");
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
  };
  const breadcrumbItems = [{ label: "Single Product" }];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NewNavBar />

      <div className="">
        <BreadCrump items={breadcrumbItems} />
      </div>
      <div
        className={`${
          showCalculator ? "cont" : "h-screen"
        } flex p-5 justify-between space-x-6`}
      >
        {isLoading && <Loading />}
        <div className="flex w-full">
          <div className="flex flex-col space-y-8 w-1/4 sideImg p-5 ">
            <div className="img">
              <img src={prod?.subimage} alt="bg" className="active" />
            </div>

            {/* <div className="img">
              <img
                src={bg2}
                alt="bg"
                onClick={() => handleImageClick(bg2)}
                className={mainImage === bg2 ? "active" : "inactive"}
              />
            </div> */}
          </div>
          <div
            className="flex w-3/4 mainImg relative rounded"
            ref={containerRef}
          >
            <img
              src={prod?.subimage}
              alt="bg "
              className={`w-full ${showCalculator ? "h-3/4" : "h-3/4"}`}
            />
            <CiSearch className="absolute top-0 right-0 m-2 text-3xl bg-white text-black rounded" />
          </div>
        </div>

        <div className="flex flex-col w-full space-y-4">
          {!showCalculator && (
            <>
              <div className="text-2xl font-bold">{prod?.product}</div>

              <div className="des text-justify">{prod?.subproddesc} </div>
              <div className="flex justify-between">
                <p>Price</p>
                <div className="flex space-x-2">
                  <p>
                    <FaRupeeSign className="text-2xl" />{" "}
                  </p>
                  <p>{prod?.subproPrice}</p>
                </div>
              </div>
              <button className="text-cyan-800" onClick={handleCalculateClick}>
                Calculate
              </button>
            </>
          )}

          {showCalculator && (
            <>
              <button onClick={handleReverseClick}>Reverse</button>
              <MarbleCalculator
                setPriceData={setPriceData}
                prodPri={prod && prod.subproPrice}
                productId={id}
              />
            </>
          )}
          {/* i picked the marble calculator form here */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;
