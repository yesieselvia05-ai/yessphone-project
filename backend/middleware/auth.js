// File: backend/middleware/auth.js
const jwt = require('jsonwebtoken');

// Middleware untuk verifikasi token
const authenticate = (req, res, next) => {
  try {
    // Ambil token dari header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak ditemukan'
      });
    }
    
    // Ambil token saja (hapus "Bearer ")
    const token = authHeader.split(' ')[1];
    
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Simpan data user ke req.user agar bisa diakses di controller
    req.user = decoded;
    
    // Lanjutkan ke route berikutnya
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token sudah expired'
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Token tidak valid'
    });
  }
};

// Middleware untuk cek role admin
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Akses ditolak. Hanya admin yang bisa akses'
    });
  }
  next();
};

module.exports = {
  authenticate,
  authorizeAdmin
};