import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  CiUser,
  CiTimer,
  CiFacebook,
  CiInstagram,
  CiTwitter,
  CiPhone,
} from "react-icons/ci";

import { MdMarkEmailUnread } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaOpencart } from "react-icons/fa6";
import useSignupStore from "../stores/signupStore";
import CartModal from "./cart/CartModal";
import useCartStore from "../stores/cartStore";

const NewNavBar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [showLogout, setShowLogout] = useState(false);
  const { logout } = useSignupStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCartStore();

  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleToggleLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <>
      <div className="hidden md:flex justify-between w-full lg:flex bg-gradient-to-r from-cyan-600 to-cyan-800 text-white">
        <div className="flex space-x-2 ml-2 jsutify-between text-white ">
          <CiTimer className="mt-1" />
          <div className="text">Mon 9:00 a.m to 6:00 p.m</div>
          <div className="flex justify-between text-2xl">
            <CiFacebook />
            <CiInstagram />
            <CiTwitter />
          </div>
        </div>
        <div className="flex space-x-2 mr-2">
          <div className="flex space-x-2">
            <CiPhone className="text-2xl" /> +91 123456789
          </div>
          <div className="flex space-x-2">
            <MdMarkEmailUnread className="text-2xl mr-1" />
            my@gmail.com
          </div>
        </div>
      </div>

      <div className="flex justify-between antialiased text-gray-900 bg-white relative overflow-hidden fixed z-30">
        <div className="flex justify-between items-center mb-2 rounded w-10 h-10 ml-2 mt-2 text-2xl cursor-pointer lg:hidden bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900">
          <GiHamburgerMenu
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-black flex items-center w-full"
          />
        </div>

        <div className="hidden lg:flex justify-center w-full">
          <ul className="flex space-x-4 mt-5">
            <li>
              <Link to="/" className="text-lg md:text-sm">
                <span className="text-black hover:text-cyan-800 hover:border-b-2 hover:border-b-cyan-800">
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link to="/" className="text-lg md:text-sm">
                <span className="text-black hover:text-cyan-800 hover:border-b-2 hover:border-b-cyan-800">
                  About Us
                </span>
              </Link>
            </li>
            <li>
              <Link to="/" className="text-lg md:text-sm">
                <span className="text-black hover:text-cyan-800 hover:border-b-2 hover:border-b-cyan-800 ">
                  Our Services
                </span>
              </Link>
            </li>
            <li>
              <Link to="/" className="text-lg md:text-sm">
                <span className="text-black hover:text-cyan-800 hover:border-b-2 hover:border-b-cyan-800">
                  Our History
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex w-full p-2 justify-center">
          <div className="flex flex-col items-center">
            <div className="text-black opacity-50">Himalaya</div>

            <div className="text-black text-2xl">Enterprises</div>
          </div>
        </div>
        <div className="hidden lg:flex w-full justify-end space-x-4 items-center p-2">
          <div className="search">
            <input
              type="text"
              placeholder="Search Product"
              className="border border-gray-300 lg:px-2 lg:py-2 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:px-1 md:py-1"
            />
            <button className="bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900 text-white lg:px-2 lg:py-2 rounded-md mr-2 md:px-1 md:py-1">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <div className="relative cursor-pointer" onClick={handleToggleCart}>
            <FaOpencart className="h-8 w-8" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute top-0 right-0 -mt-3 bg-red-500 text-white w-4 h-4 flex justify-center items-center rounded-full">
                {cartItems && cartItems.length}
              </div>
            )}
          </div>
          {userDetails ? (
            <>
              <div>
                <h1
                  onClick={handleToggleLogout}
                  className="text-cyan-700 font-bold text-xl whitespace-nowrap hover:text-cyan-500 flex cursor-pointer"
                >
                  <CiUser className="h-5 mt-1 w-5 cursor-pointer mr-2" />
                  {userDetails.firstname} {userDetails.lastname}
                </h1>
                <div className="border-b-2 border-gray-200"></div>
                {showLogout && (
                  <div className="w-full flex flex-col justify-center">
                    <button
                      className="mt-2"
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      <span className="bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900 text-white rounded-lg mt-1 px-6 py-1 ml-2 text-red font-bold">
                        Profile
                      </span>
                    </button>
                    <button
                      onClick={() => logout()}
                      className="bg-gradient-to-r from-red-600 to-gray-600 hover:from-gray-700 hover:to-red-600 text-white rounded-lg mt-1 px-2 py-1 ml-2 text-red font-bold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <CiUser
              className="h-8 w-8 cursor-pointer"
              onClick={() => {
                navigate("/signup");
              }}
            />
          )}
        </div>
        {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
        <div className="lg:hidden xl:hidden md:flex sm:flex space-x-4 justify-end items-center p-2">
          {userDetails ? (
            <>
              <div>
                <h1
                  onClick={handleToggleLogout}
                  className="text-cyan-700 font-bold md:text-2xl text-md whitespace-nowrap hover:text-cyan-500 flex cursor-pointer"
                >
                  <CiUser className="md:h-6 h-4 md:mt-1 mt-1 md:w-6 w-4 cursor-pointer md:mr-2 mr-1" />
                  {userDetails.firstname} {userDetails.lastname}
                </h1>
                <div className="border-b-2 border-gray-200"></div>
                {showLogout && (
                  <div className="w-full flex justify-center">
                    <button
                      onClick={() => logout()}
                      className="bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900 text-white rounded-lg mt-1 px-4 py-1 ml-2 text-red font-bold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <CiUser
              className="h-8 w-8 cursor-pointer"
              onClick={() => {
                navigate("/signup");
              }}
            />
          )}
        </div>
        <div className="lg:hidden xl:hidden md:flex sm:flex space-x-4 justify-end items-center p-2">
          <FaOpencart
            className="h-8 w-8 cursor-pointer"
            onClick={handleToggleCart}
          />
          <div className="absolute top-0 right-0 mt-1 bg-red-500 text-white w-4 h-4 flex justify-center items-center rounded-full">
            {cartItems && cartItems.length}
          </div>
        </div>
      </div>
      <div className="flex antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light relative overflow-hidden z-20">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 z-10 flex flex-col w-80 transition-transform duration-300 text-white`}
        >
          <svg
            className="absolute inset-0 w-full h-full text-black opacity-70"
            style={{ filter: "drop-shadow(10px 0 10px #00000030)" }}
            preserveAspectRatio="none"
            viewBox="0 0 309 800"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z" />
          </svg>
          <div
            className={`${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } fixed inset-y-0 z-10 flex flex-col w-80 transition-transform duration-300 text-white`}
          >
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-6 right-10 p-2 text-white hover:text-gray-300 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="sr-only">Close sidebar</span>
            </button>
            <ul className="mt-20 ml-8 space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-lg text-white hover:text-amber-500"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#product-carousel"
                  className="text-lg text-white hover:text-amber-500"
                >
                  Featured Products
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-lg text-white hover:text-amber-500"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-lg text-white hover:text-amber-500"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-lg text-white hover:text-amber-500"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-lg text-white hover:text-amber-500"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-lg text-white hover:text-amber-500"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Menu Button (Fixed) */}
        {/* <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed p-2 text-2xl bg-black text-white rounded-lg top-5 left-5"
        >
          Menu
        </button> */}
      </div>
    </>
  );
};

export default NewNavBar;
