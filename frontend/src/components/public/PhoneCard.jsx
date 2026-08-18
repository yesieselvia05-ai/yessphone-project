// File: frontend/src/components/public/PhoneCard.jsx
import { Link } from 'react-router-dom';

function PhoneCard({ phone }) {
  // Buat URL gambar lengkap
  const imageUrl = phone.image_url 
    ? `http://localhost:5000${phone.image_url}` 
    : null;

  return (
    <Link to={`/phones/${phone.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 h-full flex flex-col">
        {/* Image */}
        <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={`${phone.brand} ${phone.model}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <span className="text-6xl">📱</span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">
            {phone.brand}
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
            {phone.model}
          </h3>
          <p className="text-2xl font-bold text-green-600 mb-3">
            Rp {phone.price.toLocaleString('id-ID')}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className={`text-sm px-3 py-1 rounded-full ${
              phone.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {phone.stock > 0 ? `Stok: ${phone.stock}` : 'Habis'}
            </span>
            <span className="text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
              Detail →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PhoneCard;