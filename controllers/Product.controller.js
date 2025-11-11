// Backend/controllers/Product.controller.js
import Product from "../models/Product.js";

// GET all products
export const getAllProducts = async (req, res) => {
  try {
    // Accept both ?category= and ?cat=
    const { category, cat } = req.query;

    let filter = {};
    if (category || cat) {
      filter.category = category || cat;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// GET products by category (for the route /category/:category)
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    console.log("Fetching products for category:", category);

    const products = await Product.find({
      category: { $regex: new RegExp(category, "i") }, // case-insensitive
    }).sort({ createdAt: -1 });

    console.log(`Found ${products.length} products for category: ${category}`);

    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products by category:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Keep rest of the controller same (no changes)


// GET single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Search products
export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });
    
    res.status(200).json(products);
  } catch (err) {
    console.error('Error searching products:', err);
    res.status(500).json({ error: 'Failed to search products' });
  }
};

// POST create a product
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// PUT update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// DELETE product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.status(200).json({ msg: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};