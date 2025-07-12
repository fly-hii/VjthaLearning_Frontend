
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  FolderOpen, 
  Briefcase, 
  MessageSquare, 
  Search, 
  Settings, 
  Shield,
  LogOut,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/articles', icon: FileText, label: 'Articles' },
    { path: '/admin/categories', icon: FolderOpen, label: 'Categories' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/jobs', icon: Briefcase, label: 'Jobs' },
    { path: '/admin/seo', icon: Search, label: 'SEO Manager' },
    { path: '/admin/audit', icon: Shield, label: 'Audit Logs' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-200 rounded-xl shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="w-full flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <header className="bg-blue-200  rounded-xl	 border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center space-x-2"
            >
              <Menu className="w-5 h-5" />
              <span className="hidden sm:inline"></span>
            </Button>
              <div>
                <img 
                src="/lovable-uploads/05a5f58f-1680-44ab-ba49-862bbd7cb4e1.png" 
                alt="Vjtha Learning Logo" 
                className="w-16 h-16 object-contain"
              />            
              </div>
            <div className="flex items-center space-x-4">
                <span role="img" aria-label="user">👤</span>
              <div className="text-sm text-gray-500">
                Welcome back, <span className="font-medium text-gray-900">{user?.name}   </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
