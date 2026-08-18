// File: frontend/src/pages/admin/AddPhone.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';

function AddPhone() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    price: '',
    stock: '',
    description: ''
  });
  
  const [image, setImage] = useState(null); // State untuk file gambar
  const [imagePreview, setImagePreview] = useState(null); // State untuk preview gambar
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Buat preview gambar
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Buat FormData untuk kirim file + data
      const data = new FormData();
      data.append('brand', formData.brand);
      data.append('model', formData.model);
      data.append('price', formData.price);
      data.append('stock', formData.stock);
      data.append('description', formData.description);
      
      if (image) {
        data.append('image', image);
      }

      // Kirim ke backend
      await api.post('/phones', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert('HP berhasil ditambahkan!');
      navigate('/admin/phones');
    } catch (error) {
      alert('Gagal menambahkan HP: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/admin/phones" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Kembali ke Daftar HP
        </Link>
        
        <h2 className="text-3xl font-bold mb-6">Tambah HP Baru</h2>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <input 
              type="text" name="brand" value={formData.brand} onChange={handleChange} required 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <input 
              type="text" name="model" value={formData.model} onChange={handleChange} required 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Harga</label>
            <input 
              type="number" name="price" value={formData.price} onChange={handleChange} required 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
            <input 
              type="number" name="stock" value={formData.stock} onChange={handleChange} required 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea 
              name="description" value={formData.description} onChange={handleChange} rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          {/* Upload Gambar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Produk</label>
            <input 
              type="file" name="image" accept="image/*" onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img src={imagePreview} alt="Preview" className="max-w-xs rounded-lg border" />
              </div>
            )}
          </div>
          
          <button 
            type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
          >
            {loading ? 'Menyimpan...' : 'Simpan HP'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPhone;