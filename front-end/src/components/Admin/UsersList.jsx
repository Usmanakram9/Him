import React, { useState, useEffect } from "react";
import useSignupStore from "../../stores/signupStore";
import AdminNavBar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import "../../assets/css/UserList.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers,faEdit,
  faTrashAlt,
  faEye,
  faPlus, } from "@fortawesome/free-solid-svg-icons";

const UsersList = () => {
  const navigate = useNavigate();
  const {
    singleUser,
    data,
    getUsers,
    deleteUserById,
    getUserById,
    updateUserById,
  } = useSignupStore();

  useEffect(() => {
    getUsers();
  }, []);

  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstname: "",
    lastname: "",
    factoryname: "",
    email: "",
    contact: "",
    cnic: "",
  });

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      await deleteUserById(userId);
      getUsers();
    }
  };

  const handleUpdate = async (userId) => {
    // Set edit mode to true and fetch user details
    setEditMode(true);
    await getUserById(userId);
    setEditedUser(singleUser);
  };

  const handleBill = async (userId) => {
    navigate(`/admin-panel/InvoiceHub/${userId}`);
  };

  const handleChange = (e) => {
    // Update the state when the user changes input values
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    // Update the user details
    await updateUserById(singleUser._id, editedUser);
    // Reset edit mode and fetch the updated user list
    setEditMode(false);
    getUsers();
  };

  const useback = () => {
    navigate("/admin-panel/");
  };

  return (
    <>
      <AdminNavBar />

      {/* <button className="text-blue-500 text-sm mb-4 ml-4 mt-4" onClick={useback}>
          &larr; Back
        </button> */}
      <div className="flex items-center py-4 whitespace-nowrap ml-4">
        <button onClick={useback} className="text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </button>

        <span className="mx-5 text-gray-500 rtl:-scale-x-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>

        <button
          href="#"
          className="flex items-center text-blue-600 -px-2 hover:underline"
        >
          <FontAwesomeIcon
            icon={faUsers}
            className="w-6 h-6 mx-2 text-current"
            title="Client List"
          />

          <span className="mx-2">Client's List</span>
        </button>
      </div>

      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col">
          <div className="flex flex-col mt-8">
            <div className="container max-w-7xl px-4">
              <div className="flex flex-wrap justify-center text-center mb-20">
                <div className="w-full lg:w-6/12 px-4">
                  <h1 className="text-gray-900 text-4xl font-bold mb-5">
                    Clients
                  </h1>
                  <p className="text-gray-700 text-lg font-light">
                    Our trusties 
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap">
              {Array.isArray(data) && data.length > 0 ? (
              data.map((user) => (
                <div
                  key={user._id}
                 className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                  <div className="flex flex-col">
                    
                      <img
                        alt="client"
                        className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                        src="https://onlinezeal.com/wp-content/uploads/2019/12/head-659651_640.png"
                      />
                    

                    <div className="text-center mt-6">
                      <h1 className="text-gray-900 text-xl font-bold mb-1">
                      {user.firstname} {user.lastname}
                      </h1>

                      <div className="text-gray-700 font-light mb-2">
                      {user.factoryname}
                      </div>

                      <div
                        className="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300 space-x-2"
                      >
                        <button
                         onClick={() => handleUpdate(user._id)}
                          className="flex rounded-full hover:bg-orange-50 h-8 w-8"
                          title="Edit"
                        >
                           <FontAwesomeIcon
            icon={faEdit}
            className="text-orange-400 mx-auto mt-2"
            title="Edit Client"
          />
                        </button>

                        
                           <Link
                      to={`/admin-panel/createBill/${user._id}`}
                      className="flex rounded-full hover:bg-blue-50 h-8 w-8"
                    >
                          
                          <FontAwesomeIcon
            icon={faPlus}
            className="text-blue-300 mx-auto mt-2"
            title="Create Bill"
          />
                        </Link>

                        <button
                           onClick={() => handleDelete(user._id)}
                          className="flex rounded-full hover:bg-red-50 h-8 w-8"
                        >
                            <FontAwesomeIcon
            icon={faTrashAlt}
            className="text-red-300 mx-auto mt-2"
            title="Delete Client"
          />
                        </button>
                        <button
                          onClick={() => handleBill(user._id)}
                          className="flex rounded-full hover:bg-green-50 h-8 w-8"
                        >
                            <FontAwesomeIcon
            icon={faEye}
            className="text-green-300 mx-auto mt-2"
            title="view Bill"
          />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                </div>
                  ))
                  ) : (
                    <p>No data available</p>
                  )}
                
              </div>
             
            </div>
          </div>
        </div>
      </div>
      <div className="userList flex flex-col items-center justify-center h-full">
        <div className="container mx-auto">
          <h1 className="text-3xl sm:text-4xl text-center font-bold mb-8">
            Client List
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((user) => (
                <div
                  key={user._id}
                  className=" bg-opacity-10 bg-black overflow-hidden shadow-md rounded-lg transition transform hover:scale-105"
                >
                  <div className="p-4">
                    <h2 className="text-base sm:text-lg font-semibold mb-2">
                      {user.firstname} {user.lastname}
                    </h2>
                    <div className="text-xs sm:text-sm mb-4">
                      <p>Email: {user.email}</p>
                      <p>Factory Name: {user.factoryname}</p>
                      <p>Contact Number: {user.contact}</p>
                      <p>CNIC: {user.cnic}</p>
                    </div>
                    <button
                      onClick={() => handleBill(user._id)}
                      className="text-xs sm:text-sm text-red-600 hover:underline"
                    >
                      View Bill
                    </button>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
                    <button
                      className="text-xs sm:text-sm text-blue-600 hover:underline mr-2"
                      onClick={() => handleUpdate(user._id)}
                    >
                      Edit
                    </button>
                    <Link
                      to={`/admin-panel/createBill/${user._id}`}
                      className="text-xs sm:text-sm text-green-600 hover:underline mr-2"
                    >
                      Create Bill
                    </Link>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-xs sm:text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Display user details in a form when in edit mode */}
      {editMode && (
        <div className="container mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-4">Edit User Details</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={editedUser.firstname}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={editedUser.lastname}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="factoryname"
                className="block text-sm font-medium text-gray-700"
              >
                Factory Name
              </label>
              <input
                type="text"
                id="factoryname"
                name="factoryname"
                value={editedUser.factoryname}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700"
              >
                Contact
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={editedUser.contact}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="cnic"
                className="block text-sm font-medium text-gray-700"
              >
                CNIC
              </label>
              <input
                type="text"
                id="cnic"
                name="cnic"
                value={editedUser.cnic}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      <AdminFooter />
    </>
  );
};

export default UsersList;
