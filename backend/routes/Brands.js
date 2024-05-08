const express = require('express');
const router = express.Router();
const { fetchBrands, createBrand } = require('../controller/Brand');

// Route to fetch all brands
router.get('/', fetchBrands);

// Route to create a new brand
router.post('/', createBrand);

module.exports = router;
