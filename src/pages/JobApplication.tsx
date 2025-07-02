
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, MapPin, DollarSign, Briefcase, Clock, Building, Send, Upload, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CommonSidebar from '@/components/CommonSidebar';
import { AIPopup } from './AIPopup';
import {
  internships,
  techJobs,
  nonTechJobs,
  todayJobs,
  urgentJobs
} from '@/lib/mockdata';

const JobApplication = () => {
  const { id } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: '',
    resume: null as File | null
  });

  const allJobs = [
    ...internships,
    ...techJobs,
    ...nonTechJobs,
    ...todayJobs,
    ...urgentJobs
  ];

  const job = allJobs.find(j => j.id === parseInt(id || '0'));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resume: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (!job) {
    return (
      <>
        <Navigation />
        <AIPopup /> {/* AI Assistant Popup */}
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Job Not Found</h1>
            <p className="text-gray-600 mb-8">The job you're looking for doesn't exist.</p>
            <Link to="/jobs/tech">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Jobs
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (isSubmitted) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
          <Card className="max-w-md mx-auto text-center shadow-xl">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for applying to {job.title} at {job.company}. We'll review your application and get back to you soon.
              </p>
              <div className="space-y-3">
                <Link to="/jobs/tech">
                  <Button className="w-full">
                    View More Jobs
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="w-full">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  // Helper functions to safely access properties
  const isUrgent = 'isUrgent' in job ? job.isUrgent : false;
  const jobExperience = 'experience' in job ? job.experience : ('duration' in job ? job.duration : 'Not specified');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link to="/jobs/tech" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  {isUrgent ? 'Urgent' : 'Open'}
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  {'type' in job ? job.type : 'Full-time'}
                </Badge>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
              <p className="text-xl text-white/90 mb-6">{job.company}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/90">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  {job.salary}
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  {jobExperience}
                </div>
              </div>
            </div>
            
            <div className="lg:w-80">
              <img
                src={job.image}
                alt={job.title}
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Application Form - 75% Width */}
            <div style={{ width: '75%' }}>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Apply for this Position</CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below to submit your application.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                          className="h-12"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 123-4567"
                          required
                          className="h-12"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Years of Experience
                        </label>
                        <Input
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          placeholder="e.g., 3 years"
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resume *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          required
                          className="hidden"
                          id="resume-upload"
                        />
                        <label htmlFor="resume-upload" className="cursor-pointer">
                          <span className="text-blue-600 hover:text-blue-700 font-medium">
                            Click to upload your resume
                          </span>
                          <p className="text-gray-500 text-sm mt-1">PDF, DOC, or DOCX (max 5MB)</p>
                        </label>
                        {formData.resume && (
                          <p className="text-green-600 text-sm mt-2">
                            ✓ {formData.resume.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Letter
                      </label>
                      <textarea
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        placeholder="Tell us why you're interested in this position..."
                        rows={6}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <Button type="submit" className="w-full h-12 text-lg">
                      <Send className="w-5 h-5 mr-2" />
                      Submit Application
                    </Button>
                  </form>

                  {/* Job Details in Form */}
                  <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Job Summary</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-900">Company</p>
                        <p className="text-gray-600">{job.company}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Location</p>
                        <p className="text-gray-600">{job.location}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Salary</p>
                        <p className="text-gray-600">{job.salary}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Posted</p>
                        <p className="text-gray-600">{job.postedTime}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="font-medium text-gray-900 mb-2">Description</p>
                      <p className="text-gray-600 text-sm">{job.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Common Sidebar - 25% Width */}
            <div style={{ width: '25%' }} className="min-w-80">
              <div className="sticky top-8">
                <CommonSidebar />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobApplication;
