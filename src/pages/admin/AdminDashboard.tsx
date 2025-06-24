
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import DashboardHome from '@/components/admin/DashboardHome';
import ArticlesManagement from '@/components/admin/ArticlesManagement';
import CategoriesManagement from '@/components/admin/CategoriesManagement';
import UsersManagement from '@/components/admin/UsersManagement';
import JobsManagement from '@/components/admin/JobsManagement';
import CommentsManagement from '@/components/admin/CommentsManagement';
import SEOManager from '@/components/admin/SEOManager';
import AdminSettings from '@/components/admin/AdminSettings';
import AuditLogs from '@/components/admin/AuditLogs';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/articles" element={<ArticlesManagement />} />
        <Route path="/categories" element={<CategoriesManagement />} />
        <Route path="/users" element={<UsersManagement />} />
        <Route path="/jobs" element={<JobsManagement />} />
        <Route path="/comments" element={<CommentsManagement />} />
        <Route path="/seo" element={<SEOManager />} />
        <Route path="/settings" element={<AdminSettings />} />
        <Route path="/audit" element={<AuditLogs />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
