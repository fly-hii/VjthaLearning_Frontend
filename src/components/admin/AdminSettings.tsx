
import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Mail, 
  Shield, 
  Download, 
  Upload,
  Save,
  Key
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const AdminSettings: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    adminName: user?.name || '',
    adminEmail: user?.email || '',
    smtpHost: '',
    smtpPort: '',
    smtpUser: '',
    smtpPassword: '',
    siteTitle: 'VJtha Learning',
    siteDescription: 'Tech blog and job platform',
    enableComments: true,
    enableNotifications: true,
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Save settings logic here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-600 mt-1">Configure your admin preferences</p>
        </div>
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Admin Account */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Admin Account</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <Input
                value={settings.adminName}
                onChange={(e) => setSettings({ ...settings, adminName: e.target.value })}
                placeholder="Admin name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <Input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                placeholder="admin@example.com"
              />
            </div>
            <Button variant="outline" className="w-full flex items-center space-x-2">
              <Key className="w-4 h-4" />
              <span>Change Password</span>
            </Button>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Email Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
              <Input
                value={settings.smtpHost}
                onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                placeholder="smtp.gmail.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
              <Input
                value={settings.smtpPort}
                onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                placeholder="587"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
              <Input
                value={settings.smtpUser}
                onChange={(e) => setSettings({ ...settings, smtpUser: e.target.value })}
                placeholder="your-email@gmail.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
              <Input
                type="password"
                value={settings.smtpPassword}
                onChange={(e) => setSettings({ ...settings, smtpPassword: e.target.value })}
                placeholder="App password"
              />
            </div>
          </CardContent>
        </Card>

        {/* Site Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Site Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
              <Input
                value={settings.siteTitle}
                onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                placeholder="Site title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                placeholder="Brief description of your site"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.enableComments}
                  onChange={(e) => setSettings({ ...settings, enableComments: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Enable Comments</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.enableNotifications}
                  onChange={(e) => setSettings({ ...settings, enableNotifications: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Enable Email Notifications</span>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Data Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Backup & Export</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export Articles</span>
                </Button>
                <Button variant="outline" className="w-full flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export Users</span>
                </Button>
                <Button variant="outline" className="w-full flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Full Backup</span>
                </Button>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Import Data</h4>
              <Button variant="outline" className="w-full flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Import Content</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
