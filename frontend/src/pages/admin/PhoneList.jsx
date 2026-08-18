// File: frontend/src/pages/admin/PhoneList.jsx (Sesuaikan dengan nama file kamu)
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

function PhoneList() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchPhones();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus HP ini?')) {
      try {
        await api.delete(`/phones/${id}`);
        alert('HP berhasil dihapus!');
        // Refresh data
        setPhones(phones.filter(phone => phone.id !== id));
      } catch (error) {
        alert('Gagal menghapus HP');
      }
    }
  };

  if (loading) return <div className="p-8 text-center">Memuat data...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Kelola HP</h1>
          <Link to="/admin/phones/add" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Tambah HP Baru
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gambar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand & Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {phones.map((phone) => (
                <tr key={phone.id} className="hover:bg-gray-50 transition">
                  {/* KOLOM GAMBAR */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {phone.image_url ? (
                      <img 
                        src={`http://localhost:5000${phone.image_url}`} 
                        alt={phone.model}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">
                        📱
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{phone.brand}</div>
                    <div className="text-sm text-gray-500">{phone.model}</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    Rp {phone.price.toLocaleString('id-ID')}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      phone.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {phone.stock} unit
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/admin/phones/edit/${phone.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(phone.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {phones.length === 0 && (
            <div className="text-center py-10 text-gray-500">Belum ada data HP.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PhoneList;