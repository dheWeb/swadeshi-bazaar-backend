const express = require('express');
const passport = require('passport');
const router = express.Router();
const { createUser, loginUser,logoutUser,forgotPassword } = require('../controller/Auth');
const { googleLogin, googleCallback } = require('../controller/Auth');

// Route for Google OAuth login
router.get('/google', googleLogin);

// Route for Google OAuth callback
router.get('/google/callback', googleCallback);
// Route for creating a new user
router.post('/signup', createUser);

// Route for user login
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/forgot-password',forgotPassword)
module.exports = router;
