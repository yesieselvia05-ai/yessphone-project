// File: backend/config/database.js
const mysql = require('mysql2/promise');
require('dotenv').config();

// Membuat pool koneksi ke database
const pool = mysql.createPool({
  host: process.env.DB_HOST,        // Host dari .env
  user: process.env.DB_USER,        // User dari .env
  password: process.env.DB_PASSWORD, // Password dari .env
  database: process.env.DB_NAME,     // Nama database dari .env
  port: process.env.DB_PORT,         // Port dari .env
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test koneksi
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Berhasil koneksi ke database MySQL!');
    connection.release();
  } catch (error) {
    console.error('❌ Gagal koneksi ke database:', error.message);
  }
};

testConnection();

module.exports = pool;