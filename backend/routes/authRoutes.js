// File: backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

// POST /api/auth/login - Login user
router.post('/login', authController.login);

// POST /api/auth/register - Registrasi user baru
router.post('/register', authController.register);

// GET /api/auth/profile - Get profil user (harus login)
router.get('/profile', authenticate, authController.getProfile);

module.exports = router;