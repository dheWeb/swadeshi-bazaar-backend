const express = require('express');
const router = express.Router();
const product_review = require('../controller/product_review');

// Route to add a product review
router.post('/products/:productId/reviews', product_review.addProductReview);

// Route to fetch all reviews for a specific product
router.get('/products/:productId/reviews', product_review.fetchProductReviews);

// Route to update a product review
router.put('/products/reviews/:reviewId', product_review.updateProductReview);

module.exports = router;
