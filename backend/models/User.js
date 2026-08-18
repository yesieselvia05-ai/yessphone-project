// File: backend/models/User.js
const db = require('../config/database');
const bcrypt = require('bcrypt');

// 1. Fungsi untuk mencari user berdasarkan username
const findByUsername = async (username) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0]; // Return user pertama atau undefined
  } catch (error) {
    throw new Error('Error mencari user: ' + error.message);
  }
};

// 2. Fungsi untuk mencari user berdasarkan ID
const findById = async (id) => {
  try {
    const [rows] = await db.query('SELECT id, username, role FROM users WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error('Error mencari user: ' + error.message);
  }
};

// 3. Fungsi untuk registrasi user baru
const createUser = async (userData) => {
  try {
    const { username, password, role = 'user' } = userData;
    
    // Hash password dengan bcrypt (10 rounds)
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await db.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role]
    );
    
    return { id: result.insertId, username, role };
  } catch (error) {
    throw new Error('Error membuat user: ' + error.message);
  }
};

module.exports = {
  findByUsername,
  findById,
  createUser
};