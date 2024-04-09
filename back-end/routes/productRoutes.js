import express from "express";
import {
    addProduct,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct
} from "../controllers/productController.js";

const router = express.Router();

// Route to add a new product
router.post("/products", addProduct);

// Route to get all products
router.get("/products", getProducts);

// Route to get a product by its ID
router.get("/products/:id", getProductById);

// Route to delete a product by its ID
router.delete("/products/:id", deleteProduct);

// Route to update a product by its ID
router.put("/products/:id", updateProduct);

export default router;
