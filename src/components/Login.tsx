
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
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

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
    const response = await signIn(data.email, data.password);
    if (response && typeof response === 'object' && 'user' in response && response.user?.role === 'Admin') {
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-6xl">
          {/* 3D Card Container */}
          <div className="perspective-1000">
            <div className="relative transform-style-preserve-3d hover:rotate-y-2 transition-transform duration-700 ease-out">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 transform hover:scale-105 transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left - Login Form */}
                  <div className="p-8 lg:p-12 relative overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-100 rounded-full opacity-20 animate-bounce"></div>
                    
                    <div className="relative z-10">
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 animate-pulse">
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to access your stories</p>
                      </div>

                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                                <FormControl>
                                  <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    <Input
                                      placeholder="your@email.com"
                                      className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-200"
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
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                                <FormControl>
                                  <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    <Input
                                      type={showPassword ? 'text' : 'password'}
                                      placeholder="Enter your password"
                                      className="pl-10 pr-12 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-200"
                                      {...field}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-gray-100"
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
                            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" 
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <div className="flex items-center">
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

                  {/* Right - Branding Section */}
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 lg:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full animate-ping"></div>
                      <div className="absolute top-32 right-20 w-16 h-16 border border-white rounded-full animate-pulse"></div>
                      <div className="absolute bottom-20 left-16 w-12 h-12 border border-white rounded-full animate-bounce"></div>
                    </div>
                    
                    <div className="relative z-10 text-center">
                      <div className="mb-8 transform hover:scale-110 transition-transform duration-300">
                        <img
                          src="/lovable-uploads/05a5f58f-1680-44ab-ba49-862bbd7cb4e1.png"
                          alt="VJtha Logo"
                          className="w-32 h-32 mx-auto object-contain bg-white/10 rounded-2xl p-4 backdrop-blur-sm"
                        />
                      </div>
                      
                      <h2 className="text-3xl font-bold mb-4">VJtha Media</h2>
                      <p className="text-lg opacity-90 mb-6">Your gateway to insightful stories</p>
                      
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
