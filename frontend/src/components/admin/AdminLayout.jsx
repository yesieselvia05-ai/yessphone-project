// File: frontend/src/components/admin/AdminLayout.jsx
import { Link, useLocation } from 'react-router-dom';

function AdminLayout({ children }) {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: '' },
    { path: '/admin/phones', label: 'Kelola HP', icon: '📱' },
    { path: '/admin/phones/add', label: 'Tambah HP', icon: '➕' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <Link to="/admin" className="flex items-center space-x-2">
            <span className="text-2xl"></span>
            <span className="text-xl font-bold">YessPhone Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link to="/" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition" target='_blank'>
            <span className="text-xl">🌐</span>
            <span className="font-medium">Lihat Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;