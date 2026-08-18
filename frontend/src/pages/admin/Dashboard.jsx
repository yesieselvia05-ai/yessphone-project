// File: frontend/src/pages/admin/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import AdminLayout from '../../components/admin/AdminLayout';

function Dashboard() {
  const [stats, setStats] = useState({
    totalPhones: 0,
    totalStock: 0,
    totalValue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/phones');
        const phones = response.data.data;
        
        setStats({
          totalPhones: phones.length,
          totalStock: phones.reduce((sum, p) => sum + p.stock, 0),
          totalValue: phones.reduce((sum, p) => sum + (p.price * p.stock), 0)
        });
      } catch (error) {
        console.error('Gagal mengambil statistik:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Produk', value: stats.totalPhones, icon: '📱', color: 'blue' },
    { label: 'Total Stok', value: stats.totalStock, icon: '📦', color: 'green' },
    { label: 'Nilai Inventori', value: `Rp ${stats.totalValue.toLocaleString('id-ID')}`, icon: '', color: 'purple' },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Selamat datang di panel admin YessPhone</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <span className="text-5xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Aksi Cepat</h2>
        <div className="flex gap-4">
          <Link to="/admin/phones/add" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            ➕ Tambah HP Baru
          </Link>
          <Link to="/admin/phones" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">
             Kelola Produk
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;