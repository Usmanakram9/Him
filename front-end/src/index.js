import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NewNavBar from "./components/NewNavBar";
import ProductsScreen from "./screens/ProductsScreen";
// import AdminLogin from './components/Admin/AdminLogin';
import AdminPanel from "./components/Admin/AdminPanel";
import AddProduct from "./components/Admin/AddProduct";
import AddSubProduct from "./components/Admin/AddSubProduct";
import UsersList from "./components/Admin/UsersList";
import AddCustomer from "./components/Admin/AddCustomer";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import CreateBill from "./components/Admin/CreateBill";

import BillVerification from "./components/Admin/BillVerification";
import InvoiceHub from "./components/Admin/InvoiceHub";
import SingleProdBill from "./components/Admin/SingleProdBill";
import DeliveryScreen from "./components/Admin/DeliveryScreen";
import CompletedDeliveryScreen from "./components/Admin/CompletedDeliveryScreen";
import AddPayment from "./components/Admin/AddPayment";
import PaymentHistory from "./components/Admin/PaymentHistory";
import SingleProduct from "./components/pages/SingleProduct";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProductList from "./screens/ProductList";
import ProfileScreen from "./screens/ProfileScreen";
import AddressCheckout from "./components/checkout/AddressCheckout";
import PaymentCheckout from "./components/checkout/PaymentCheckout";
let isAdmin = false;

const router = (
  <BrowserRouter>
    {isAdmin && <NewNavBar />}
    <Routes>
      <Route path="/" element={<App />}>
        <Route index={true} element={<Home />} />
        <Route path="/products" element={<ProductsScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/SingleProduct/:id" element={<SingleProduct />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/checkout-address" element={<AddressCheckout />} />
        <Route path="/checkout-payment" element={<PaymentCheckout />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route
          path="/productdetail/:productId"
          element={<ProductDetailsScreen />}
        />
      </Route>

      <Route path="/admin-panel" element={<AdminPanel />} />
      <Route path="/admin-panel/products/addproduct" element={<AddProduct />} />
      <Route
        path="/admin-panel/products/addsubproduct"
        element={<AddSubProduct />}
      />
      <Route path="/admin-panel/users" element={<UsersList />} />
      <Route path="/admin-panel/addcustomer" element={<AddCustomer />} />
      <Route path="/admin-panel/createBill/:id" element={<CreateBill />} />
      <Route path="/admin-panel/verification" element={<BillVerification />} />
      <Route path="/admin-panel/InvoiceHub/:id" element={<InvoiceHub />} />
      <Route
        path="/admin-panel/singleProd/:billId/View/:formFieldId"
        element={<SingleProdBill />}
      />
      <Route
        path="/admin-panel/Delivery/:custID/:billId/:formFieldId"
        element={<DeliveryScreen />}
      />
      <Route
        path="/admin-panel/completedDelivery/:custID/:billId/:formFieldId"
        element={<CompletedDeliveryScreen />}
      />
      <Route
        path="/admin-panel/addPayment/:custID/:billId/"
        element={<AddPayment />}
      />
      <Route
        path="/admin-panel/PaymentHistory/:billId/:custId"
        element={<PaymentHistory />}
      />
    </Routes>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="159415962534-gf72qi9tc2qc9d4d17feoqavb3fad3ci.apps.googleusercontent.com">
      {router}
    </GoogleOAuthProvider>
  </React.StrictMode>
);
