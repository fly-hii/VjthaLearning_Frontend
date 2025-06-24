
import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  Filter, 
  Calendar,
  User,
  FileText,
  Settings,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const AuditLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');

  const auditLogs = [
    {
      id: 1,
      action: 'Article Created',
      user: 'Sarah Johnson',
      target: 'Introduction to React Hooks',
      timestamp: '2024-01-20 14:30:00',
      ip: '192.168.1.100',
      details: 'New article published',
      severity: 'info'
    },
    {
      id: 2,
      action: 'User Role Changed',
      user: 'Admin',
      target: 'Mike Chen',
      timestamp: '2024-01-20 13:15:00',
      ip: '192.168.1.101',
      details: 'Promoted to Author role',
      severity: 'warning'
    },
    {
      id: 3,
      action: 'Article Deleted',
      user: 'Admin',
      target: 'Outdated Tutorial',
      timestamp: '2024-01-20 12:00:00',
      ip: '192.168.1.101',
      details: 'Article permanently removed',
      severity: 'error'
    },
    {
      id: 4,
      action: 'Settings Updated',
      user: 'Admin',
      target: 'Site Configuration',
      timestamp: '2024-01-20 10:45:00',
      ip: '192.168.1.101',
      details: 'SMTP settings modified',
      severity: 'info'
    },
    {
      id: 5,
      action: 'User Blocked',
      user: 'Admin',
      target: 'spam.user@example.com',
      timestamp: '2024-01-20 09:30:00',
      ip: '192.168.1.101',
      details: 'User blocked for spam activity',
      severity: 'warning'
    },
  ];

  const actions = ['All', 'Article Created', 'Article Updated', 'Article Deleted', 'User Role Changed', 'User Blocked', 'Settings Updated'];

  const getActionIcon = (action: string) => {
    if (action.includes('Article')) return <FileText className="w-4 h-4" />;
    if (action.includes('User')) return <User className="w-4 h-4" />;
    if (action.includes('Settings')) return <Settings className="w-4 h-4" />;
    if (action.includes('Deleted')) return <Trash2 className="w-4 h-4" />;
    return <Shield className="w-4 h-4" />;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600 mt-1">Track all administrative actions and changes</p>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Export Logs</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Actions</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Article Actions</p>
                <p className="text-2xl font-bold text-gray-900">856</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <User className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">User Actions</p>
                <p className="text-2xl font-bold text-gray-900">267</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Settings className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">System Changes</p>
                <p className="text-2xl font-bold text-gray-900">124</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search audit logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {actions.map(action => (
                <option key={action} value={action.toLowerCase()}>{action}</option>
              ))}
            </select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getActionIcon(log.action)}
                      <span className="font-medium">{log.action}</span>
                      <Badge className={`text-xs ${getSeverityColor(log.severity)}`}>
                        {log.severity}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{log.user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <span className="truncate">{log.target}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{log.timestamp}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {log.ip}
                    </code>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <span className="text-sm text-gray-600 truncate">{log.details}</span>
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

export default AuditLogs;
