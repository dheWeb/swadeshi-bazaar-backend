const express = require('express');
const router = express.Router();
const { createProduct, fetchAllProducts, fetchProductById, updateProduct } = require('../controller/Product');

// Route to create a new product
router.post('/', createProduct);

// Route to fetch all products with optional filtering, pagination, and sorting
router.get('/', fetchAllProducts);

// Route to fetch a product by its ID
router.get('/:id', fetchProductById);

// Route to update a product by its ID
router.put('/:id', updateProduct);

module.exports = router;
