// File: backend/models/Phone.js
const db = require('../config/database');

// 1. Fungsi untuk mengambil semua data phones
const getAllPhones = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM phones ORDER BY created_at DESC');
    return rows;
  } catch (error) {
    throw new Error('Error mengambil data phones: ' + error.message);
  }
};

// 2. Fungsi untuk mengambil phone berdasarkan ID
const getPhoneById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM phones WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error('Error mengambil data phone: ' + error.message);
  }
};

// 3. Fungsi untuk membuat phone baru (dengan image)
const createPhone = async (phoneData) => {
  try {
    const { brand, model, price, stock, description, image_url } = phoneData;
    const [result] = await db.query(
      'INSERT INTO phones (brand, model, price, stock, description, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [brand, model, price, stock, description, image_url || null]
    );
    return { id: result.insertId, ...phoneData };
  } catch (error) {
    throw new Error('Error membuat phone baru: ' + error.message);
  }
};

// 4. Fungsi untuk update phone (dengan image)
const updatePhone = async (id, phoneData) => {
  try {
    const { brand, model, price, stock, description, image_url } = phoneData;
    const [result] = await db.query(
      'UPDATE phones SET brand = ?, model = ?, price = ?, stock = ?, description = ?, image_url = ? WHERE id = ?',
      [brand, model, price, stock, description, image_url || null, id]
    );
    if (result.affectedRows === 0) {
      return null;
    }
    return { id, ...phoneData };
  } catch (error) {
    throw new Error('Error update phone: ' + error.message);
  }
};

// 5. Fungsi untuk delete phone
const deletePhone = async (id) => {
  try {
    const [result] = await db.query('DELETE FROM phones WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  } catch (error) {
    throw new Error('Error delete phone: ' + error.message);
  }
};

module.exports = {
  getAllPhones,
  getPhoneById,
  createPhone,
  updatePhone,
  deletePhone
};