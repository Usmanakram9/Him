import Cust from "../models/customerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "2days",
  });
  return token;
};

const registerUser = async (req, res) => {
  const { firstname, lastname, factoryname, email, contact, cnic } = req.body;

  // Validate if CNIC is a number
  if (isNaN(cnic)) {
    return res.status(400).json({ message: "CNIC must be a number." });
  }

  // Validate if contact is a number
  else if (isNaN(contact)) {
    return res.status(400).json({ message: "Contact must be a number." });
  } else {
    // Check if the email already exists
    const emailExists = await Cust.findOne({ email });

    if (emailExists) {
      return res
        .status(400)
        .json({ message: "This email is already registered!" });
    }

    // Check if the CNIC already exists
    const cnicExists = await Cust.findOne({ cnic });

    if (cnicExists) {
      return res
        .status(400)
        .json({ message: "This CNIC is already registered!" });
    } else {
      // Create the customer
      const customer = await Cust.create({
        firstname,
        lastname,
        factoryname,
        email,
        contact,
        cnic,
      });

      if (customer) {
        return res.status(201).json({
          _id: customer._id,
          firstname: customer.firstname,
          lastname: customer.lastname,
          factoryname: customer.factoryname,
          email: customer.email,
          contact: customer.contact,
          cnic: customer.cnic,
        });
      } else {
        return res.status(400).json({ message: "Invalid customer data" });
      }
    }
  }
};

const deleteCustomer = async (req, res) => {
  const customer = await Cust.findById(req.params.id);
  if (customer) {
    await Cust.deleteOne({ _id: customer._id });
    res.status(200).json({ message: "customer deleted successfully" });
  } else {
    res.status(400).json("Customer not found");
  }
};

const updateCustomer = async (req, res) => {
  const customer = await Cust.findById(req.params.id);
  if (customer) {
    customer.firstname = req.body.firstname || customer.firstname;
    customer.lastname = req.body.lastname || customer.lastname;
    customer.factoryname = req.body.factoryname || customer.factoryname;
    customer.email = req.body.email || customer.email;
    customer.contact = req.body.contact || customer.contact;
    customer.cnic = req.body.cnic || customer.cnic;
    const updatedCustomer = await customer.save();

    res.status(200).json({
      message: "Customer updated successfully",
      _id: updatedCustomer._id,
      firstname: updatedCustomer.firstname,
      lastname: updatedCustomer.lastname,
      factoryname: updatedCustomer.factoryname,
      email: updatedCustomer.email,
      contact: updatedCustomer.contact,
      cnic: updatedCustomer.cnic,
    });
  } else {
    console.error("error");
    res.status(400).json("customer not found");
  }
};

const getCustomers = async (req, res) => {
  const customer = await Cust.find({});
  res.status(200).json(customer);
};

const getSingleCustomer = async (req, res) => {
  const customer = await Cust.findById(req.params.id).select("-password");
  if (customer) {
    res.status(200).json(customer);
  } else {
    res.status(400).json("Customer not found");
  }
};

const signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    // Validate name, email, and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email, and password are required" });
    }

    const alreadyRegistered = await Cust.findOne({ email });
    if (alreadyRegistered) {
      return res.status(400).json({ message: "email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a user instance
    const user = new Cust({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate a JWT
    const token = createToken(user._id);

    return res.status(200).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: token,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (e) => e.message
      );
      return res.status(400).json({ message: validationErrors.join(", ") });
    }
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await Cust.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If the password is valid, create a JWT
    const token = createToken(user._id);

    // Return user details including name in the response
    return res.status(200).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const signupWithGoogle = async (req, res) => {
  const { email, given_name, family_name } = req.body;
  try {
    // Check if the user with the given email already exists
    let user = await Cust.findOne({ email });

    if (!user) {
      // If the user does not exist, create a new user
      user = new Cust({
        firstname: given_name,
        lastname: family_name,
        email,
      });

      await user.save();
    }

    // Generate a JWT token
    const token = createToken(user._id);

    // Return user details and token
    return res.status(200).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: token,
    });
  } catch (error) {
    console.error("Error signing up with Google:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  registerUser,
  deleteCustomer,
  updateCustomer,
  getCustomers,
  getSingleCustomer,
  signup,
  login,
  signupWithGoogle,
};
