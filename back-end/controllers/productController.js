import Product from "../models/productSchema.js";
// Import any other necessary modules or models here

const addProduct = async (req, res) => {
    const { name, description, price, images } = req.body;

    try {
        const productExists = await Product.findOne({ name });

        if (productExists) {
            return res.status(400).json({ message: 'This product is already registered' });
        } else {
            const product = await Product.create({
                name,
                description, 
                price,
                images
            });

            return res.status(201).json(product);
        }
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

const getProducts = async (req, res) => {
    try {
        const allProducts = await Product.find({});
        return res.status(200).json(allProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.remove();

        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, images } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.images = images || product.images;

        const updatedProduct = await product.save();

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

export {
    addProduct,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct
};
