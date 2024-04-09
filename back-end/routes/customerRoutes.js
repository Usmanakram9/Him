import express from "express";
const router = express.Router();

import {
  registerUser,
  deleteCustomer,
  updateCustomer,
  getCustomers,
  getSingleCustomer,
  signup,
  login,
  signupWithGoogle,
} from "../controllers/customerController.js";

router.route("/").post(registerUser).get(getCustomers);
router
  .route("/:id")
  .delete(deleteCustomer)
  .put(updateCustomer)
  .get(getSingleCustomer);

//------------------------------------------------------------------------------------------------
//login system routes
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/google").post(signupWithGoogle);

export default router;
