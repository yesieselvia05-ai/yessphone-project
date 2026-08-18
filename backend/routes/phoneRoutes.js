// File: backend/routes/phoneRoutes.js
const express = require('express');
const router = express.Router();
const phoneController = require('../controllers/phoneController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload'); // Import multer

// GET /api/phones - Ambil semua phones (publik)
router.get('/', phoneController.getAllPhones);

// GET /api/phones/:id - Ambil phone berdasarkan ID (publik)
router.get('/:id', phoneController.getPhoneById);

// POST /api/phones - Buat phone baru (harus admin, dengan upload gambar)
router.post('/', authenticate, authorizeAdmin, upload.single('image'), phoneController.createPhone);

// PUT /api/phones/:id - Update phone (harus admin, dengan upload gambar)
router.put('/:id', authenticate, authorizeAdmin, upload.single('image'), phoneController.updatePhone);

// DELETE /api/phones/:id - Delete phone (harus admin)
router.delete('/:id', authenticate, authorizeAdmin, phoneController.deletePhone);

module.exports = router;