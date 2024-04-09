import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faSignOutAlt,
  faBell,
  faEnvelope,
  faArrowLeft,
  faUser,
  faBox,
  faPlusCircle,
  faList
} from "@fortawesome/free-solid-svg-icons";

const AdminNavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prodbar, setProdBar] = useState(false);
  const [usersBar, setUsersBar] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <div className="flex antialiased text-white dark:bg-dark dark:text-light relative overflow-hidden">
        <div
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 z-10 flex flex-col w-80 transition-transform duration-300 text-black`}
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
            <Link to={'/admin-panel/'} className="text-2xl mt-6 font-semibold">Himalaya Enterprises</Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-6 right-10 p-2 text-white hover:text-gray-800 focus:outline-none"
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
            <ul className="mt-10 ml-10 space-y-4">
              <li>
                <button
                  onClick={() => setProdBar(!prodbar)}
                  className="flex items-center hover:text-yellow-500"
                >
                  <FontAwesomeIcon icon={faBox} className="w-5 h-5 mr-2" />
                  Products
                </button>
              </li>
              {prodbar && (
                <>
                  
                  <li className="flex items-center hover:text-yellow-500 ml-8 mt-2">
                    <FontAwesomeIcon icon={faPlusCircle} className="w-5 h-5 mr-2" />
                    <Link to="/admin-panel/products/addsubproduct">
                      Add Product
                    </Link>
                  </li>
                </>
              )}
              <li>
                <button
                  onClick={() => setUsersBar(!usersBar)}
                  className="flex items-center hover:text-yellow-500"
                >
                  <FontAwesomeIcon icon={faUser} className="w-5 h-5 mr-2" />
                  Customers
                </button>
              </li>
              {usersBar && (
                <>
                  
                  <li className="flex items-center hover:text-yellow-500 ml-8 mt-2">
                    <FontAwesomeIcon icon={faPlusCircle} className="w-5 h-5 mr-2" />
                    <Link to="/admin-panel/addcustomer">Add Customer</Link>
                  </li>
                  <li className="flex items-center hover:text-yellow-500 ml-8 mt-2">
                    <FontAwesomeIcon icon={faList} className="w-5 h-5 mr-2" />
                    <Link to="/admin-panel/users">All Customers</Link>
                  </li>
                </>
              )}
              <li>
                <a href="/" className="flex items-center hover:text-yellow-500">
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="w-5 h-5 mr-2"
                  />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        <main className="flex flex-col items-end justify-center flex-1 mb-10">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`${
              isSidebarOpen ? "hidden" : "fixed p-2 text-white bg-gray-900 rounded-lg top-5 left-5"
            }`}
            
          >
            Menu
          </button>

          <header className="fixed mt-16 px-1 md:px-4 py-2 shadow bg-gray-900 rounded-md p-3 z-50">
            <div className="flex justify-between ">
              <div className="flex items-center">
                <button
                  data-messages
                  className="p-1 mr-1 focus:outline-none  hover:bg-gray-800 hover:rounded-md"
                  type="button"
                >
                  <FontAwesomeIcon
                    icon={faBell}
                    className="w-3 h-3 mr-1 md:w-5 md:h-5"
                  />
                </button>
                <button
                  data-notifications
                  className="p-1 mr-1 focus:outline-none hover:bg-gray-800 hover:rounded-md"
                  type="button"
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="w-3 h-3 mr-1 md:w-5 md:h-5"
                  />
                </button>
                {isDropdownOpen && (
                  <>
                    <button
                      data-messages
                      className="p-1 mr-1 focus:outline-none text-xs md:text-base hover:bg-gray-800 hover:rounded-md"
                      type="button"
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        className="w-3 h-3 mr-1 md:w-5 md:h-5"
                      />
                      User Profile
                    </button>
                    <button
                      data-notifications
                      className="p-1 mr-1 focus:outline-none text-xs md:text-base hover:bg-gray-800 hover:rounded-md"
                      type="button"
                    >
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="w-3 h-3 mr-1 md:w-5 md:h-5"
                      />
                      Logout
                    </button>
                  </>
                )}
                <div
                  data-dropdown
                  className={`cursor-pointer flex items-center px-3 py-2 focus:outline-none hover:bg-gray-800 hover:rounded-md ${
                    isDropdownOpen ? "bg-gray-800 rounded-md" : ""
                  } `}
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                  {/* User profile information */}
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Profile"
                    className="h-4 w-4 md:h-8 md:w-8 rounded-full"
                  />
                  <span className="ml-4 text-sm hidden md:inline-block">
                    Jessica Smith
                  </span>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="w-3 h-3 md:w-5 md:h-3 ml-2"
                  />
                  {/* Dropdown content */}
                </div>
              </div>
            </div>
          </header>
        </main>
      </div>
    </>
  );
};

export default AdminNavBar;
