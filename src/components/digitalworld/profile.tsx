/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Navigation from '../Navigation';
import { AIPopup } from '@/pages/AIPopup';
import Footer from '../Footer';
const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
    }
  }, []);

  if (!user) return <p className="text-center mt-10 text-red-500">User not logged in</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navigation />
      <AIPopup />
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
     

      <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium">Name</label>
        <input value={user.name} disabled className="w-full px-3 py-2 mt-1 border rounded bg-gray-100" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Email</label>
        <input value={user.email} disabled className="w-full px-3 py-2 mt-1 border rounded bg-gray-100" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Role</label>
        <input value={user.role} disabled className="w-full px-3 py-2 mt-1 border rounded bg-gray-100" />
      </div>
     

      {user.lastLogin && (
        <div className="mb-4">
          <label className="block text-sm font-medium">Last Login</label>
          <input value={new Date(user.lastLogin).toLocaleString()} disabled className="w-full px-3 py-2 mt-1 border rounded bg-gray-100" />
        </div>
      )}
    </div>
     <Footer />
    </div>
      
  );
};

export default ProfilePage;





