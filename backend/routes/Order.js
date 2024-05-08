const express = require('express');
const router = express.Router();
const { fetchOrdersByUser, createOrder, deleteOrder, updateOrder, fetchAllOrders } = require('../controller/Order');

// Route to fetch orders by user
router.get('/user/:userId', fetchOrdersByUser);

// Route to create a new order
router.post('/', createOrder);

// Route to delete an order
router.delete('/:id', deleteOrder);

// Route to update an order
router.put('/:id', updateOrder);

// Route to fetch all orders with pagination and sorting
router.get('/', fetchAllOrders);

module.exports = router;
