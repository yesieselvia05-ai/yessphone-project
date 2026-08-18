// File: frontend/src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

function Navbar() {
  const { user, logout } = useAuth(); // Ambil user dan fungsi logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Kembali ke home setelah logout
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">📱</span>
            <span className="text-2xl font-bold text-gray-800">YessPhone</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
              Beranda
            </Link>

            {/* Logic Tampilan Menu Berdasarkan Status Login */}
            {user ? (
              <>
                <span className="text-gray-700 font-medium">Halo, {user.username}!</span>
                {user.role === 'admin' && (
                  <Link to="/admin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                    Admin Panel
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;