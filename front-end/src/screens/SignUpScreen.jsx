import { useFormik } from "formik";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useProductStore from "../stores/signupStore";
import NewNavBar from "../components/NewNavBar";
import Toast, { showErrorToast } from "../components/Toast";
import LoginGoogle from "../components/LoginGoogle";

const SignUpScreen = () => {
  const navigate = useNavigate();
  const { signup } = useProductStore();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    if (userDetails) {
      navigate("/");
    }
  }, []);

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await signup(values);
        if (response) {
          navigate("/");
        } else {
          showErrorToast("Please try again later.");
        }

        formik.resetForm();
      } catch (error) {
        console.log("Sign up failed");
      }
    },
  });

  return (
    <>
      <NewNavBar />
      <div className="flex items-center justify-center mt-4">
        <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 w-full lg:w-96 mx-2 mt-2">
          <h1 className="text-2xl text-gray-600 mb-4 font-semibold text-center">
            Join Himalaya Enterprises
          </h1>

          <form onSubmit={formik.handleSubmit}>
            {/* First Name Input */}
            <div className="mb-4">
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-600"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className={`mt-1 p-2 w-full border rounded-md ${
                  formik.touched.firstname && formik.errors.firstname
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Enter your first name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
              />
              <span style={{ color: "red" }}>
                {formik.touched.firstname && formik.errors.firstname
                  ? formik.errors.firstname
                  : ""}
              </span>
            </div>

            {/* Last Name Input */}
            <div className="mb-4">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-600"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className={`mt-1 p-2 w-full border rounded-md ${
                  formik.touched.lastname && formik.errors.lastname
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Enter your last name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
              />
              <span style={{ color: "red" }}>
                {formik.touched.lastname && formik.errors.lastname
                  ? formik.errors.lastname
                  : ""}
              </span>
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`mt-1 p-2 w-full border rounded-md ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <span style={{ color: "red" }}>
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""}
              </span>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`mt-1 p-2 w-full border rounded-md ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Enter your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <span style={{ color: "red" }}>
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-700 text-white p-2 rounded-full mb-4 hover:bg-cyan-600"
            >
              Agree & Join
            </button>
          </form>

          {/* Agreement Text */}
          <p className="text-sm text-gray-600 ">
            By clicking Agree & Join, you agree to Himalaya Enterprises{" "}
            <a href="#" className="text-cyan-500">
              User Agreement
            </a>
            ,{" "}
            <a href="#" className="text-cyan-500">
              Privacy Policy
            </a>
            , and{" "}
            <a href="#" className="text-cyan-500">
              Cookie Policy
            </a>
            .
          </p>

          <LoginGoogle />
          {/* Sign In Link */}
          <Link
            to="/login"
            className="w-full inline-block text-center bg-transparent outline outline-1 outline-gray-800 text-cyan-600 p-2 mt-2 rounded-full mb-4 hover:bg-gray-200"
          >
            Already a user? Sign In
          </Link>
        </div>
      </div>
      <Toast />
    </>
  );
};

export default SignUpScreen;
