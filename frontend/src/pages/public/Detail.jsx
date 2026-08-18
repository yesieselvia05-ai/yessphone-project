// File: frontend/src/pages/public/Detail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios'; // Sesuaikan path jika perlu

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await api.get(`/phones/${id}`);
        setPhone(response.data.data);
      } catch (error) {
        console.error('Gagal mengambil detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm(`Yakin ingin menghapus ${phone.brand} ${phone.model}?`)) {
      try {
        await api.delete(`/phones/${id}`);
        alert('HP berhasil dihapus!');
        navigate('/');
      } catch (error) {
        alert('Gagal menghapus HP: ' + error.message);
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Memuat detail...</div>;
  if (!phone) return <div className="min-h-screen flex items-center justify-center">HP tidak ditemukan</div>;

  // Buat URL gambar lengkap
  const imageUrl = phone.image_url ? `http://localhost:5000${phone.image_url}` : null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Tombol Kembali */}
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium">
          ← Kembali ke Beranda
        </Link>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            
            {/* BAGIAN GAMBAR (Kiri / Atas di Mobile) */}
            <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-8 min-h-[300px]">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={`${phone.brand} ${phone.model}`}
                  className="max-w-full max-h-[400px] object-contain rounded-lg shadow-sm"
                />
              ) : (
                <div className="text-center">
                  <span className="text-9xl block mb-2">📱</span>
                  <p className="text-gray-400 text-sm">Gambar tidak tersedia</p>
                </div>
              )}
            </div>

            {/* BAGIAN INFORMASI (Kanan / Bawah di Mobile) */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-2">
                {phone.brand}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {phone.model}
              </h1>
              
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-green-600">
                  Rp {phone.price.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Deskripsi Produk</h3>
                <p className="text-gray-600 leading-relaxed">
                  {phone.description || 'Tidak ada deskripsi untuk produk ini.'}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ketersediaan Stok</h3>
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  phone.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {phone.stock > 0 ? `✅ Tersedia (${phone.stock} unit)` : '❌ Stok Habis'}
                </span>
              </div>

              <button onClick={() => {
                  window.location.href="https://wa.me/6289504500197?text=Halo! saya mau pesan produk ini"
                }}
              className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                 Pesan via WA
              </button>
              {/* Tombol Aksi (Hanya muncul jika user adalah admin - opsional, tapi bagus untuk UX) */}
              {/* Kamu bisa cek user role dari context jika mau menampilkan tombol edit/hapus di sini */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;