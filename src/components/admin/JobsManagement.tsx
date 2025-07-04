
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MapPin, 
  DollarSign,
  Clock,
  Building,
  IndianRupee
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
import { jobsApi } from '@/Services/api';
import { Job, CreateJobData, UpdateJobData } from '@/types/api';
import JobDialog from './JobDialog';

const JobsManagement: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | undefined>(undefined);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobsApi.getAll();
      setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await jobsApi.delete(id);
      fetchJobs();
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  // Open the dialog when Post New Job is clicked
  const handleNewJob = () => {
    setEditingJob(undefined);  // clear existing form
    setShowDialog(true);
  };

  // Save job function (for both create and update)
  const handleSave = async (data: CreateJobData | UpdateJobData) => {
    try {
      if (editingJob?._id) {
        await jobsApi.update(editingJob._id, data as UpdateJobData);
      } else {
        await jobsApi.create(data as CreateJobData);
      }
      fetchJobs();  // refresh job list
      setShowDialog(false);
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.salary.toString().includes(searchTerm) ||
    job.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Listings Management</h1>
          <p className="text-gray-600 mt-1">Manage job postings and applications</p>
        </div>
        <Button className="flex items-center space-x-2" onClick={handleNewJob}>
          <Plus className="w-4 h-4" />
          <span>Post New Job</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 hover:shadow-lg hover:shadow-blue-400/40">
            <div className="flex items-center space-x-3">
              <Briefcase className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 hover:shadow-lg hover:shadow-blue-400/40">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {jobs.filter(job => job.status === "Active").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 hover:shadow-lg hover:shadow-blue-400/40">
            <div className="flex items-center space-x-3">
              <Building className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Companies</p>
                <p className="text-2xl font-bold text-gray-900">
                  {[...new Set(jobs.map(job => job.company))].length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Job Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {job.urgent == true && (
                        <Badge variant="destructive" className="text-xs">
                          URGENT
                        </Badge>
                      )}
                      <span className="font-medium">{job.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span>{job.company}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{job.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{job.jobType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <IndianRupee className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{job.salary}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => { setEditingJob(job); setShowDialog(true); }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(job._id!)}>
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

      <JobDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onSave={handleSave}
        initialData={editingJob}
      />
    </div>
  );
};

export default JobsManagement;
