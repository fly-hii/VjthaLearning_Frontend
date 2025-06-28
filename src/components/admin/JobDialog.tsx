/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Job } from '@/types/api';

interface JobDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<Job>) => void;
  initialData?: Partial<Job>;
}

const JobDialog: React.FC<JobDialogProps> = ({
  open,
  onClose,
  onSave,
  initialData = {}
}) => {
  const [form, setForm] = useState<Partial<Job>>(initialData);

  const handleChange = (field: keyof Job, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (
      !form.title ||
      !form.company ||
      !form.location ||
      !form.jobType ||
      !form.workMode ||
      !form.experienceFrom ||
      !form.experienceTo ||
      !form.description ||
      !form.requirements ||
      !form.skills
    )
      return;

    onSave(form);
  };
useEffect(() => {
  setForm(initialData);
}, [initialData]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {initialData?._id ? 'Edit Job' : 'Post New Job'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto pr-2">
          <Input
            placeholder="Job Title"
            value={form.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
          <Input
            placeholder="Company"
            value={form.company || ''}
            onChange={(e) => handleChange('company', e.target.value)}
          />

          <Input
            placeholder="Location"
            value={form.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
          />
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Urgent</label>
            <input
              type="checkbox"
              checked={form.urgent || false}
              onChange={(e) => handleChange('urgent', e.target.checked)}
              className="w-4 h-4"
            />
          </div>

          <select
            value={form.jobType || ''}
            onChange={(e) => handleChange('jobType', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>

          <select
            value={form.workMode || ''}
            onChange={(e) => handleChange('workMode', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Work Mode</option>
            <option value="On-Site">On-Site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          <select
            value={form.jobFunctionality || ''}
            onChange={(e) => handleChange('jobFunctionality', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Job Functionality</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Sales">Sales</option>
            <option value="Customer Service">Customer Service</option>
          </select>

          <Input
            placeholder="Experience From (years)"
            type="number"
            value={form.experienceFrom?.toString() || ''}
            onChange={(e) =>
              handleChange('experienceFrom', parseInt(e.target.value))
            }
          />
          <Input
            placeholder="Experience To (years)"
            type="number"
            value={form.experienceTo?.toString() || ''}
            onChange={(e) =>
              handleChange('experienceTo', parseInt(e.target.value))
            }
          />

          <Input
            placeholder="Salary"
            type="number"
            value={form.salary?.toString() || ''}
            onChange={(e) => handleChange('salary', parseInt(e.target.value))}
          />
          <Input
            type="date"
            value={
              form.deadline
                ? new Date(form.deadline).toISOString().split('T')[0]
                : ''
            }
            onChange={(e) =>
              handleChange('deadline', new Date(e.target.value))
            }
          />

          <select
            value={form.status || 'Active'}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>

          <Input
            placeholder="Number of Vacancies"
            type="number"
            value={form.vacancies?.toString() || ''}
            onChange={(e) =>
              handleChange('vacancies', parseInt(e.target.value))
            }
          />

          <div className="md:col-span-2">
            <Textarea
              placeholder="Job Description"
              value={form.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Textarea
              placeholder="Requirements (comma separated)"
              value={(form.requirements || []).join(', ')}
              onChange={(e) =>
                handleChange(
                  'requirements',
                  e.target.value.split(',').map((s) => s.trim())
                )
              }
            />
          </div>
          <div className="md:col-span-2">
            <Textarea
              placeholder="Skills (comma separated)"
              value={(form.skills || []).join(', ')}
              onChange={(e) =>
                handleChange(
                  'skills',
                  e.target.value.split(',').map((s) => s.trim())
                )
              }
            />
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <Button onClick={handleSubmit}>
              {initialData?._id ? 'Update Job' : 'Create Job'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDialog;
