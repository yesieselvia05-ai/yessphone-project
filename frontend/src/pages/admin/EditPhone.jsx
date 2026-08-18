// File: frontend/src/pages/admin/EditPhone.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';

function EditPhone() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    brand: '', model: '', price: '', stock: '', description: ''
  });
  
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null); // Gambar yang sudah ada

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const response = await api.get(`/phones/${id}`);
        const phone = response.data.data;
        setFormData({
          brand: phone.brand,
          model: phone.model,
          price: phone.price,
          stock: phone.stock,
          description: phone.description
        });
        if (phone.image_url) {
          setCurrentImage(`http://localhost:5000${phone.image_url}`);
          setImagePreview(`http://localhost:5000${phone.image_url}`);
        }
      } catch (error) {
        console.error('Gagal mengambil data:', error);
        alert('Data tidak ditemukan');
        navigate('/admin/phones');
      } finally {
        setLoading(false);
      }
    };
    fetchPhone();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      data.append('brand', formData.brand);
      data.append('model', formData.model);
      data.append('price', formData.price);
      data.append('stock', formData.stock);
      data.append('description', formData.description);
      
      if (image) {
        data.append('image', image);
      }

      await api.put(`/phones/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert('HP berhasil diupdate!');
      navigate(`/phones/${id}`);
    } catch (error) {
      alert('Gagal mengupdate HP: ' + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/admin/phones" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Kembali ke Daftar HP
        </Link>
        
        <h2 className="text-3xl font-bold mb-6">Edit HP</h2>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} required 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <input type="text" name="model" value={formData.model} onChange={handleChange} required 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Harga</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          
          {/* Upload Gambar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Produk</label>
            <input type="file" name="image" accept="image/*" onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  {image ? 'Preview Gambar Baru:' : 'Gambar Saat Ini:'}
                </p>
                <img src={imagePreview} alt="Preview" className="max-w-xs rounded-lg border" />
              </div>
            )}
          </div>
          
          <button type="submit" disabled={saving}
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition disabled:opacity-50 font-medium">
            {saving ? 'Menyimpan...' : 'Update HP'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPhone;