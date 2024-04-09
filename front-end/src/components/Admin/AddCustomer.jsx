import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faIdCard,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import AdminNavBar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import useSignupStore from "../../stores/signupStore";
import Toast, { showSuccessToast, showErrorToast } from "../../components/Toast";

const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Invalid characters in first name")
    .required("First name is required"),
  lastname: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Invalid characters in last name")
    .required("Last name is required"),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format")
    .required("Email is required"),
  factoryname: Yup.string().required("Factory/Address is required"),
  contact: Yup.string()
    .required("Contact number is required")
    .matches(/^[0-9]+$/, "Contact number must be a number")
    .matches(11, "Contact number should not exceed 11 characters"),
    cnic: Yup.string()
    .matches(/^[0-9]+$/, "CNIC must be a number")
    .min(13, "CNIC should be at least 13 digits")
    .max(13, "CNIC should be exactly 13 digits"),
});


const AddCustomer = () => {
  const { addUser } = useSignupStore();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      factoryname: "",
      contact: "",
      cnic: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      try {
        addUser(values);
        showSuccessToast("Registered successfully!");
        formik.resetForm();
      } catch (error) {
        showErrorToast(`Error: ${error.message}`);
      }
    },
  });

  return (
    <>
      <AdminNavBar />
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-3">
                        <label htmlFor="firstname">
                          {" "}
                          <FontAwesomeIcon
                            icon={faUser}
                            size="lg"
                            className="mr-2 text-gray-600"
                          />
                          First Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter First Name"
                          id="firstname"
                          name="firstname"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={formik.values.firstname}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.firstname && formik.errors.firstname && (
                          <div className="text-red-500">{formik.errors.firstname}</div>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="lastname">
                          {" "}
                          <FontAwesomeIcon
                            icon={faUser}
                            size="lg"
                            className="mr-2 text-gray-600"
                          />
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Last Name"
                          id="lastname"
                          name="lastname"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={formik.values.lastname}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.lastname && formik.errors.lastname && (
                          <div className="text-red-500">{formik.errors.lastname}</div>
                        )}
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="email">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            size="lg"
                            className="mr-2 text-gray-600"
                          />
                          Email Address
                        </label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="email@domain.com"
                        />
                        {formik.touched.email && formik.errors.email && (
                          <div className="text-red-500">{formik.errors.email}</div>
                        )}
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="factoryname">Address / Factory</label>
                        <input
                          type="text"
                          placeholder="Enter Address"
                          id="factoryname"
                          name="factoryname"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={formik.values.factoryname}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.factoryname && formik.errors.factoryname && (
                          <div className="text-red-500">{formik.errors.factoryname}</div>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="contact">
                          <FontAwesomeIcon
                            icon={faPhone}
                            size="lg"
                            className="mr-2 text-gray-600"
                          />
                          Contact Number
                        </label>
                        <input
                          type="text"
                          id="contact"
                          name="contact"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={formik.values.contact}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Enter Contact"
                        />
                        {formik.touched.contact && formik.errors.contact && (
                          <div className="text-red-500">{formik.errors.contact}</div>
                        )}
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="cnic">
                          <FontAwesomeIcon
                            icon={faIdCard}
                            size="lg"
                            className="mr-2 text-gray-600"
                          />
                          CNIC Number (Optional)
                        </label>
                        <input
                          type="text"
                          id="cnic"
                          name="cnic"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={formik.values.cnic}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Enter CNIC (Optional)"
                        />
                        {formik.touched.cnic && formik.errors.cnic && (
                          <div className="text-red-500">{formik.errors.cnic}</div>
                        )}
                      </div>

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Add Client
                          </button>
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

      <Toast />
      <AdminFooter />
    </>
  );
};

export default AddCustomer;
