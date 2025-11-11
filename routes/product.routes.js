// Backend/routes/product.routes.js
import express from 'express';
import * as productController from '../controllers/Product.controller.js';

const router = express.Router();

// Get all products
router.get('/', productController.getAllProducts);

// Search products (MUST be before /:id)
router.get('/search', productController.searchProducts);

// Get products by category (MUST be before /:id)
router.get('/category/:category', productController.getProductsByCategory);

// Get single product by ID (MUST be LAST among GET routes)
router.get('/:id', productController.getProductById);

// Create new product (admin only)
router.post('/', productController.createProduct);

// Update product (admin only)
router.put('/:id', productController.updateProduct);

// Delete product (admin only)
router.delete('/:id', productController.deleteProduct);

export default router;