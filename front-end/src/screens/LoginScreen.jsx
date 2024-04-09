import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import NewNavBar from "../components/NewNavBar";
import useSignupStore from "../stores/signupStore";
import Toast, { showErrorToast } from "../components/Toast";
import { useEffect } from "react";
import LoginGoogle from "../components/LoginGoogle";

const LoginScreen = () => {
  const navigate = useNavigate();
  const { login } = useSignupStore();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    if (userDetails) {
      navigate("/");
    }
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await login(values);
        if (response) {
          navigate("/");
        } else {
          showErrorToast("Email or Password is incorrect, Please try again.");
        }

        formik.resetForm();
      } catch (error) {
        console.log("Login failed");
      }
    },
  });

  return (
    <>
      <NewNavBar />
      <div className="flex items-center justify-center mt-4">
        <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 w-full lg:w-96 mx-2 mt-2">
          <h1 className="text-2xl text-gray-600 mb-4 font-semibold text-center">
            Login
          </h1>

          <form onSubmit={formik.handleSubmit}>
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
              Login
            </button>
          </form>

          <LoginGoogle />
          {/* Sign Up Link */}
          <Link
            to="/signup"
            className="w-full inline-block text-center bg-transparent outline outline-1 outline-gray-800 text-cyan-600 p-2 mt-2 rounded-full mb-4 hover:bg-gray-200"
          >
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
      <Toast />
    </>
  );
};

export default LoginScreen;
