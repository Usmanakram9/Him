import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentCheckout = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!userDetails) {
      navigate("/");
    }
  }, []);

  return (
    <div className="text-xl h-screen flex justify-center my-auto items-center">
      To be built soon.....
    </div>
  );
};

export default PaymentCheckout;
