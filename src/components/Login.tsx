
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Lock, Mail, BookOpen, Newspaper } from 'lucide-react';
import Navigation from './Navigation';
import { useAuth } from '@/hooks/useAuth';

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // For now using mock data - replace with actual API call
      const mockToken = 'mock-token-123';
      const mockUser = {
        _id: '1',
        name: 'User',
        email: data.email,
        role: 'Admin' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      login(mockUser, mockToken);
      
      // Navigate based on role
      if (mockUser.role === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center py-4 px-4 pt-12 min-h-screen">
        <div className="w-full max-w-6xl">
          {/* Enhanced 3D Card Container */}
          <div className="perspective-1000 transform-gpu">
            <div className="relative transform-style-preserve-3d hover:rotate-y-2 transition-transform duration-700 ease-out hover:scale-105">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 transform hover:shadow-3xl transition-all duration-500 backdrop-blur-sm bg-white/95">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left - Login Form with Enhanced Animations */}
                  <div className="p-8 lg:p-12 relative overflow-hidden">
                    {/* Enhanced Animated Background Elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-100 rounded-full opacity-20 animate-bounce"></div>
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-100 rounded-full opacity-10 animate-ping"></div>
                    
                    <div className="relative z-10">
                      <div className="text-center transform hover:scale-105 transition-all duration-300">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 animate-pulse hover:animate-spin transition-all duration-500">
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in">Welcome Back</h1>
                        <p className="text-gray-600 animate-fade-in">Sign in to access your stories</p>
                      </div>

                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="transform hover:scale-105 transition-all duration-200">
                                <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                                <FormControl>
                                  <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                                    <Input
                                      placeholder="your@email.com"
                                      className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-200 focus:scale-105"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem className="transform hover:scale-105 transition-all duration-200">
                                <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                                <FormControl>
                                  <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                                    <Input
                                      type={showPassword ? 'text' : 'password'}
                                      placeholder="Enter your password"
                                      className="pl-10 pr-12 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-200 focus:scale-105"
                                      {...field}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-gray-100 hover:scale-110 transition-all duration-200"
                                      onClick={() => setShowPassword(!showPassword)}
                                    >
                                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button 
                            type="submit" 
                            className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-300 hover:from-blue-300 hover:to-blue-500 text-white rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:animate-pulse" 
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <div className="flex items-center animate-pulse">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Signing in...
                              </div>
                            ) : 'Sign In'}
                          </Button>
                        </form>
                      </Form>

                      <div className="mt-8 text-center">
                        <p className="text-gray-600">
                          Don't have an account?{' '}
                          <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">
                            Create one
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right - Enhanced Branding Section */}
                  <div className="bg-gradient-to-br from-blue-200 to-blue-400 p-8 lg:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
                    {/* Enhanced Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full animate-ping"></div>
                      <div className="absolute top-32 right-20 w-16 h-16 border border-white rounded-full animate-pulse"></div>
                      <div className="absolute bottom-20 left-16 w-12 h-12 border border-white rounded-full animate-bounce"></div>
                      <div className="absolute top-1/2 right-1/4 w-8 h-8 border border-white rounded-full animate-spin"></div>
                    </div>
                    
                    <div className="relative z-10 text-center">
                      <div className="transform hover:scale-110 transition-transform duration-500 hover:rotate-3">
                        <img
                          src="/lovable-uploads/Login_Logo.png"
                          alt="VJtha Logo"
                          className="w-72 h-72 mx-auto object-contain animate-float"
                        />
                      </div>
                      
                      <h2 className="text-3xl font-bold mb-4 animate-fade-in">VJtha Learning</h2>
                      <p className="text-lg opacity-90 mb-6 animate-fade-in">Your gateway to insightful stories</p>
                      
                      <div className="space-y-4 text-left max-w-sm">
                        <div className="flex items-center space-x-3">
                          <Newspaper className="w-5 h-5 text-blue-200" />
                          <span className="text-sm opacity-90">Latest industry insights</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <BookOpen className="w-5 h-5 text-blue-200" />
                          <span className="text-sm opacity-90">Expert authored articles</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Lock className="w-5 h-5 text-blue-200" />
                          <span className="text-sm opacity-90">Premium content access</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
