// File: frontend/src/pages/public/Home.jsx
import { useState, useEffect } from 'react';
import api from '../../api/axios';
import Navbar from '../../components/public/Navbar';
import PhoneCard from '../../components/public/PhoneCard';

function Home() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPhones = async () => {
    try {
      const response = await api.get('/phones');
      setPhones(response.data.data);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">📱 YessPhone Store</h1>
          <p className="text-xl text-blue-100">Temukan smartphone impianmu dengan harga terbaik</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Produk Terbaru</h2>
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Memuat data HP...</p>
          </div>
        ) : phones.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">Belum ada produk tersedia</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {phones.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;