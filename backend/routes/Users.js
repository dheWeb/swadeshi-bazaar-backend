const express = require('express');
const router = express.Router();
const { fetchUserById, updateUser } = require('../controller/User');

// Route to fetch a user by their ID
router.get('/:id', fetchUserById);

// Route to update a user by their ID
router.put('/:id', updateUser);

module.exports = router;
