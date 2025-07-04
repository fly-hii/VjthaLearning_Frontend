
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Navigation from '../Navigation';
import { AIPopup } from '@/pages/AIPopup';
import Footer from '../Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Building, Clock, User, Briefcase, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0
  });

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      fetchAppliedJobs(parsed._id);
    }
  }, []);

  const fetchAppliedJobs = async (userId: string) => {
    try {
      // Mock data for now - replace with actual API call
      const mockApplications = [
        {
          id: 1,
          jobTitle: 'Frontend Developer',
          company: 'Tech Corp',
          location: 'Remote',
          appliedDate: '2024-01-15',
          status: 'pending',
          salary: '$70,000 - $90,000'
        },
        {
          id: 2,
          jobTitle: 'React Developer',
          company: 'StartUp Inc',
          location: 'New York',
          appliedDate: '2024-01-10',
          status: 'accepted',
          salary: '$80,000 - $100,000'
        },
        {
          id: 3,
          jobTitle: 'Full Stack Developer',
          company: 'Big Tech',
          location: 'San Francisco',
          appliedDate: '2024-01-05',
          status: 'rejected',
          salary: '$100,000 - $120,000'
        }
      ];
      
      setAppliedJobs(mockApplications);
      
      // Calculate stats
      const totalApplications = mockApplications.length;
      const pendingApplications = mockApplications.filter(job => job.status === 'pending').length;
      const acceptedApplications = mockApplications.filter(job => job.status === 'accepted').length;
      const rejectedApplications = mockApplications.filter(job => job.status === 'rejected').length;
      
      setStats({
        totalApplications,
        pendingApplications,
        acceptedApplications,
        rejectedApplications
      });
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    }
  };

  const updateApplicationStatus = async (applicationId: number, newStatus: string) => {
    try {
      // Mock API call - replace with actual implementation
      setAppliedJobs(prev => 
        prev.map(job => 
          job.id === applicationId ? { ...job, status: newStatus } : job
        )
      );
      toast.success(`Application status updated to ${newStatus}`);
      
      // Recalculate stats
      const updatedJobs = appliedJobs.map(job => 
        job.id === applicationId ? { ...job, status: newStatus } : job
      );
      const totalApplications = updatedJobs.length;
      const pendingApplications = updatedJobs.filter(job => job.status === 'pending').length;
      const acceptedApplications = updatedJobs.filter(job => job.status === 'accepted').length;
      const rejectedApplications = updatedJobs.filter(job => job.status === 'rejected').length;
      
      setStats({
        totalApplications,
        pendingApplications,
        acceptedApplications,
        rejectedApplications
      });
    } catch (error) {
      toast.error('Failed to update application status');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (!user) return <p className="text-center mt-10 text-red-500">User not logged in</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navigation />
      <AIPopup />
      
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* User Profile Card with 3D Animation */}
        <Card className="transform hover:scale-105 transition-all duration-300 hover:shadow-2xl bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader className="text-center">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <User className="w-12 h-12 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">{user.name}</CardTitle>
            <p className="text-gray-600">{user.email}</p>
            <Badge className="mx-auto w-fit">{user.role}</Badge>
          </CardHeader>
          <CardContent>
            {user.lastLogin && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Last Login: {new Date(user.lastLogin).toLocaleString()}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Briefcase className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingApplications}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Accepted</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.acceptedApplications}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <XCircle className="w-8 h-8 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.rejectedApplications}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applied Jobs */}
        <Card className="transform hover:scale-102 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Applied Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appliedJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-all duration-200 bg-white">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{job.jobTitle}</h3>
                        <div className="flex items-center gap-4 mt-2 text-gray-600">
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Applied: {new Date(job.appliedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 mt-1 font-medium">{job.salary}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(job.status)}
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </div>
                        {job.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateApplicationStatus(job.id, 'accepted')}
                              className="text-green-600 hover:bg-green-50"
                            >
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateApplicationStatus(job.id, 'rejected')}
                              className="text-red-600 hover:bg-red-50"
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
