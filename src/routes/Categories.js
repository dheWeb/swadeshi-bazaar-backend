const express = require('express');
const router = express.Router();
const { fetchCategories, createCategory } = require('../controller/Category');

// Route to fetch all categories
router.get('/', fetchCategories);

// Route to create a new category
router.post('/', createCategory);

module.exports = router;
