// File: backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import database connection
const db = require('./config/database');

// Import routes
const phoneRoutes = require('./routes/phoneRoutes');
const authRoutes = require('./routes/authRoutes'); // Import auth routes

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")))


// Simple route untuk test
app.get('/', (req, res) => {
  res.json({ 
    message: '📱 Selamat datang di YessPhone API!',
    status: 'Server berjalan',
    timestamp: new Date().toISOString()
  });
});

// Test endpoint untuk database
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM phones');
    res.json({
      message: 'Database terhubung!',
      data: rows
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error koneksi database',
      error: error.message 
    });
  }
});

// Gunakan routes
app.use('/api/phones', phoneRoutes);
app.use('/api/auth', authRoutes); // Tambahkan auth routes

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route tidak ditemukan'
  });
});

// Start server
const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server YessPhone berjalan di http://localhost:${PORT}`);
  console.log(` API Endpoints tersedia di http://localhost:${PORT}/api/phones`);
  console.log(` Auth Endpoints tersedia di http://localhost:${PORT}/api/auth`);
});