// File: frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Home from './pages/public/Home';
import Detail from './pages/public/Detail';
import Login from './pages/Login';

// Admin pages
import Dashboard from './pages/admin/Dashboard';
import PhoneList from './pages/admin/PhoneList';
import AddPhone from './pages/admin/AddPhone';
import EditPhone from './pages/admin/EditPhone';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/phones/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes (Protected) */}
          <Route path="/admin" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/admin/phones" element={
            <ProtectedRoute><PhoneList /></ProtectedRoute>
          } />
          <Route path="/admin/phones/add" element={
            <ProtectedRoute><AddPhone /></ProtectedRoute>
          } />
          <Route path="/admin/phones/edit/:id" element={
            <ProtectedRoute><EditPhone /></ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;