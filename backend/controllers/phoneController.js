// File: backend/controllers/phoneController.js
const Phone = require('../models/Phone');
const fs = require('fs');
const path = require('path');

// 1. Controller untuk GET semua phones
const getAllPhones = async (req, res) => {
  try {
    const phones = await Phone.getAllPhones();
    res.json({
      success: true,
      message: 'Data phones berhasil diambil',
      data: phones
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 2. Controller untuk GET phone by ID
const getPhoneById = async (req, res) => {
  try {
    const { id } = req.params;
    const phone = await Phone.getPhoneById(id);
    
    if (!phone) {
      return res.status(404).json({
        success: false,
        message: 'Phone tidak ditemukan'
      });
    }
    
    res.json({
      success: true,
      message: 'Data phone berhasil diambil',
      data: phone
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 3. Controller untuk CREATE phone baru (dengan upload gambar)
const createPhone = async (req, res) => {
  try {
    const { brand, model, price, stock, description } = req.body;
    
    // Validasi sederhana
    if (!brand || !model || !price) {
      return res.status(400).json({
        success: false,
        message: 'Brand, model, dan price wajib diisi'
      });
    }
    
    // Ambil path gambar jika ada file yang diupload
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    
    const newPhone = await Phone.createPhone({
      brand,
      model,
      price,
      stock: stock || 0,
      description: description || '',
      image_url
    });
    
    res.status(201).json({
      success: true,
      message: 'Phone berhasil ditambahkan',
      data: newPhone
    });
  } catch (error) {
    // Jika ada error, hapus file yang sudah terupload
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 4. Controller untuk UPDATE phone (dengan upload gambar)
const updatePhone = async (req, res) => {
  try {
    const { id } = req.params;
    const { brand, model, price, stock, description } = req.body;
    
    // Ambil data phone lama untuk cek gambar sebelumnya
    const oldPhone = await Phone.getPhoneById(id);
    
    if (!oldPhone) {
      return res.status(404).json({
        success: false,
        message: 'Phone tidak ditemukan'
      });
    }
    
    // Jika ada file baru yang diupload
    let image_url = oldPhone.image_url; // Default pakai gambar lama
    
    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
      
      // Hapus gambar lama jika ada
      if (oldPhone.image_url) {
        const oldImagePath = path.join(__dirname, '..', oldPhone.image_url);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }
    
    const updatedPhone = await Phone.updatePhone(id, {
      brand,
      model,
      price,
      stock,
      description,
      image_url
    });
    
    res.json({
      success: true,
      message: 'Phone berhasil diupdate',
      data: updatedPhone
    });
  } catch (error) {
    // Jika ada error, hapus file baru yang sudah terupload
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 5. Controller untuk DELETE phone
const deletePhone = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Ambil data phone untuk hapus gambarnya
    const phone = await Phone.getPhoneById(id);
    
    if (!phone) {
      return res.status(404).json({
        success: false,
        message: 'Phone tidak ditemukan'
      });
    }
    
    // Hapus gambar dari folder uploads
    if (phone.image_url) {
      const imagePath = path.join(__dirname, '..', phone.image_url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    // Hapus data dari database
    const deleted = await Phone.deletePhone(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Phone tidak ditemukan'
      });
    }
    
    res.json({
      success: true,
      message: 'Phone berhasil dihapus'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllPhones,
  getPhoneById,
  createPhone,
  updatePhone,
  deletePhone
};