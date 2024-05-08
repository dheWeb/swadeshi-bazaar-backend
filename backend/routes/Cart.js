const express = require('express');
const router = express.Router();
const { fetchCartByUser, addToCart, deleteFromCart, updateCart } = require('../controller/Cart');

// Route to fetch cart items by user
router.get('/', fetchCartByUser);

// Route to add item to cart
router.post('/', addToCart);

// Route to delete item from cart
router.delete('/:id', deleteFromCart);

// Route to update cart item
router.put('/:id', updateCart);

module.exports = router;
