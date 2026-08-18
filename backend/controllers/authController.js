// File: backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. Controller untuk LOGIN
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validasi input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username dan password wajib diisi'
      });
    }
    
    // Cari user di database
    const user = await User.findByUsername(username);
    
    // Jika user tidak ditemukan
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Username atau password salah'
      });
    }
    
    // Bandingkan password yang diinput dengan password hash di database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Username atau password salah'
      });
    }
    
    // Buat JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    
    // Kirim response dengan token
    res.json({
      success: true,
      message: 'Login berhasil',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 2. Controller untuk REGISTRASI
const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    // Validasi input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username dan password wajib diisi'
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password minimal 6 karakter'
      });
    }
    
    // Cek apakah username sudah ada
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username sudah digunakan'
      });
    }
    
    // Buat user baru
    const newUser = await User.createUser({ username, password, role });
    
    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 3. Controller untuk GET profil user (dari token)
const getProfile = async (req, res) => {
  try {
    // req.user sudah diisi oleh middleware auth (akan kita buat nanti)
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  login,
  register,
  getProfile
};