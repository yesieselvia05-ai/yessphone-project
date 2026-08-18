// File: frontend/src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Tampilkan loading saat context masih mengecek token
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;
  }

  // Jika tidak ada user (belum login), lempar ke halaman login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Jika user bukan admin, lempar ke beranda
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Jika user ada dan admin, tampilkan halaman (children)
  return children;
}

export default ProtectedRoute;