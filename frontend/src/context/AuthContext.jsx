// File: frontend/src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

// 1. Membuat Context
const AuthContext = createContext();

// 2. Provider Component (Pembungkus aplikasi)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Cek status login saat aplikasi pertama kali dibuka
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          // Ambil profil user berdasarkan token yang tersimpan
          const response = await api.get('/auth/profile');
          setUser(response.data.data);
        } catch (error) {
          console.error('Token tidak valid:', error);
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [token]);

  // Fungsi Login
  const login = async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    const { token, user } = response.data.data;
    
    // Simpan ke state dan localStorage
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  };

  // Fungsi Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook untuk memudahkan penggunaan context
export const useAuth = () => useContext(AuthContext);