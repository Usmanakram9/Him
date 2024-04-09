import React, { useState, useEffect } from "react";
import NewNavBar from "../components/NewNavBar";
import Footer from "../components/Footer";
import useSignupStore from "../stores/signupStore";
import Loading from "../shared/Loading";
import Toast, {showSuccessToast,showErrorToast} from "../components/Toast";

const ProfileScreen = () => {
  const { updateUserById,isLoading } = useSignupStore();
  // State variables to hold user information
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  // Effect to fetch user details from local storage
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (userDetails) {
      setUserData(userDetails);
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserById(userData._id, userData);
      localStorage.setItem('userDetails', JSON.stringify(userData));
      showSuccessToast("Profie updated successfully!");
    } catch (error) {
      // console.error("Error updating profile:", error);
      showErrorToast(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <NewNavBar />
     {isLoading && (
      <Loading />
     )}
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Update Profile</p>
                  <p>Please fill out all the fields.</p>
                </div>
                <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-3">
                      <label htmlFor="firstname">First Name</label>
                      <input
                        
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        type="text" name="firstname" value={userData.firstname} onChange={handleInputChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="lastname">Last Name</label>
                      <input
                        placeholder="Enter Last Name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        type="text" name="lastname" value={userData.lastname} onChange={handleInputChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="email">Email</label>
                      <input
                        placeholder="Enter Price"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        type="email" name="email" value={userData.email} onChange={handleInputChange}
                      />
                    </div>
                   

                  

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          type="submit"
                         
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Update Profile
                        </button>
                        <Toast />
                      </div>
                    </div>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileScreen;
