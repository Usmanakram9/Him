import React, { useState } from "react";
import { useEffect } from "react";
import bg1 from "../assets/images/bg.jpg";
import bg2 from "../assets/images/product3.jpg";
import bg3 from "../assets/images/product4.jpg";

import "../assets/css/Home.css";

import NewNavBar from "../components/NewNavBar";

import ServInitial from "./pages/landingPage/ServInitial";
import ShowSection from "./pages/landingPage/ShowSection";
import ProfCollec from "./pages/landingPage/ProfCollec";
import AboutInitial from "./pages/landingPage/AboutInitial";
import Products from "./pages/landingPage/Products";
import Testimonials from "./pages/landingPage/Testimonials";
import Gallery from "./pages/landingPage/Gallery";
import Footer from "./Footer";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [bg1, bg2, bg3];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change images every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [images.length]);

  const handleChangeSlide = (index) => {
    setActiveIndex(index);
  };
  return (
    <>
      <NewNavBar />
      <div className="flex-col md:flex md:flex-col lg:flex-row lg:justify-between h-screen w-full ">
        <div className="flex lg:w-1/2 w-full p-5 flex-col mt-20">
          <div className="flex text-lg text-6xl lg:text-5xl mb-4 font-bold">
            Transform Your Floors with Elegance
          </div>
          <p className="mb-4">
            Himalaya Natural Stone is an innovative marble supplier known for
            its exceptional quality and distinctive designs featured in our
            extensive portfolio of over 40 products. With our diverse range of
            more than 500 material references.
          </p>
          <div className="flex gap-x-1">
            <button
              type="submit"
              className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900 focus:shadow-outline focus:outline-none"
            >
              Explore Products
            </button>
            <a
              href="/"
              aria-label=""
              className="inline-flex hover:text-white hover:bg-black rounded items-center border border-2 border-black border-solid font-semibold h-12 px-6 mr-6"
            >
              Learn more
            </a>
          </div>
        </div>

        <div className="lg:flex h-2/6 md:h-3/4 md:w-1/2 lg:h-screen lg:w-1/2 lg:p-8 lg:flex-col flex-col flex p-6">
          <div className="relative h-full">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`bg${index + 1}`}
                className={`absolute top-0 left-0 w-full h-full rounded transition-opacity duration-500 ${
                  activeIndex === index ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  zIndex: `${activeIndex === index ? "1" : "-1"}`,
                }}
              />
            ))}
          </div>

          <div className="flex mt-5 space-x-3 ">
            {images.map((_, index) => (
              <p
                key={index}
                className={`cursor-pointer ${
                  activeIndex === index
                    ? "font-bold border-b-2 border-black scale-125"
                    : ""
                }`}
                onClick={() => handleChangeSlide(index)}
              >
                {index < 9 ? `0${index + 1}` : index + 1}
              </p>
            ))}
          </div>
        </div>
      </div>

      <ServInitial />
      <ShowSection />

      <ProfCollec />
      <AboutInitial />
      <Products />

      <Testimonials />
      <Gallery />
      <Footer />
      {/* <AboutUs /> */}
    </>
  );
};

export default Home;
