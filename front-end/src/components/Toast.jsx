// Toast.js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showSuccessToast = (message, options = {}) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    ...options,
  });
};

const showErrorToast = (message, options = {}) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    ...options,
  });
};

const Toast = () => {
  return (
    <>
      <ToastContainer />
    </>
  );
};

export { showSuccessToast, showErrorToast };
export default Toast;
