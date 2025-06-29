/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import { usersApi } from '@/Services/api';
import { User } from '@/types/api';
import {
  Users,
  Search,
  Edit,
  Trash2,
  UserCheck,
  Crown
} from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL ;
const UsersManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const roles = ['All', 'Admin', 'User'];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4 text-yellow-600" />;
      default: return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await usersApi.getAll();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const name = user.name?.toLowerCase() || '';
    const email = user.email?.toLowerCase() || '';
    const role = user.role?.toLowerCase() || '';

    const matchesSearch = name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || role === filterRole;

    return matchesSearch && matchesRole;
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await usersApi.delete(id);
      setUsers(prev => prev.filter(user => user._id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleEdit = async (id: string, updatedFields: Partial<User>) => {
    try {
      const updatedUser = await usersApi.update(id, updatedFields);
      setUsers(prev =>
        prev.map(user => (user._id === id ? { ...user, ...updatedUser } : user))
      );
    } catch (error) {
      console.error('Edit failed:', error);
    }
  };

  // Dialog States
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [roleToAdd, setRoleToAdd] = useState<'User' | 'Admin'>('User');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const roleType = roleToAdd;

  const openDialog = (role: 'User' | 'Admin') => {
    setRoleToAdd(role);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password || !roleType) {
      alert('All fields are required');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: roleType
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add user');

      alert(`${roleType === 'Admin' ? 'Admin' : 'User'} created successfully`);
      closeDialog();
    } catch (err: any) {
      console.error('Add user failed:', err);
      alert(err.message || 'Error adding user');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
        </div>
        <div className="flex justify-end space-x-4 mb-4 pr-4">
          <Button onClick={() => openDialog('User')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add User
          </Button>
          <Button onClick={() => openDialog('Admin')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Admin
          </Button>
        </div>
      </div>

     {isDialogOpen && (
  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    {/* Background overlay */}
    <div className="fixed inset-0 bg-black bg-opacity-30 z-40" aria-hidden="true" />

    {/* Dialog panel */}
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-md z-50">

        {/* Close button */}
        <button
          onClick={() => setIsDialogOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">
          Add {roleToAdd === 'Admin' ? 'Admin' : 'User'}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full mb-3 border border-gray-300 p-2 rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full mb-3 border border-gray-300 p-2 rounded"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full mb-4 border border-gray-300 p-2 rounded"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create {roleToAdd}
          </button>
        </form>
      </div>
    </div>
  </Dialog>
)}


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 hover:shadow-lg hover:shadow-blue-400/40">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter(user => user.role === 'User').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 hover:shadow-lg hover:shadow-blue-400/40">
            <div className="flex items-center space-x-3">
              <Crown className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter(user => user.role === 'Admin').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 hover:shadow-lg hover:shadow-blue-400/40">
            <div className="flex items-center space-x-3">
              <UserCheck className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {roles.map(role => (
                <option key={role} value={role.toLowerCase()}>{role}</option>
              ))}
            </select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {user.name?.split(' ').map(n => n[0]).join('') || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(user.role)}
                      <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                  </TableCell>
                  <TableCell>
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : '—'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        title="Edit User"
                        onClick={() => handleEdit(user._id, { name: prompt('Enter new name', user.name) || user.name })}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        title="Delete User"
                        onClick={() => handleDelete(user._id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManagement;
