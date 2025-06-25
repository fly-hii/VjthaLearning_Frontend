
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock, Phone, UserPlus, Star, Shield, Zap } from 'lucide-react';
import Navigation from './Navigation';
import { useAuth } from '@/contexts/AuthContext';

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  mobile: z.string().min(10, { message: "Mobile number must be at least 10 digits." }),
});

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setLoading(true);
    try {
      await signUp(data.email, data.password, data.name);
      navigate("/login");
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-100 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-5xl">
          {/* 3D Card Container */}
          <div className="perspective-1000">
            <div className="relative transform-style-preserve-3d hover:rotate-y-2 transition-transform duration-700 ease-out">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 transform hover:scale-105 transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left - Branding Section */}
                  <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-8 lg:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-16 right-12 w-24 h-24 border border-white rounded-full animate-spin"></div>
                      <div className="absolute bottom-24 left-8 w-16 h-16 border border-white rounded-full animate-pulse"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full animate-ping"></div>
                    </div>
                    
                    <div className="relative z-10 text-center">
                      <div className="mb-8 transform hover:scale-110 transition-transform duration-300">
                        <img
                          src="/lovable-uploads/05a5f58f-1680-44ab-ba49-862bbd7cb4e1.png"
                          alt="VJtha Logo"
                          className="w-32 h-32 mx-auto object-contain bg-white/10 rounded-2xl p-4 backdrop-blur-sm"
                        />
                      </div>
                      
                      <h2 className="text-3xl font-bold mb-4">Join VJtha Learning</h2>
                      <p className="text-lg opacity-90 mb-8">Become part of our storytelling community</p>
                      
                      <div className="space-y-4 text-left max-w-sm">
                        <div className="flex items-center space-x-3 transform hover:translate-x-2 transition-transform">
                          <Star className="w-5 h-5 text-yellow-300" />
                          <span className="text-sm opacity-90">Exclusive premium content</span>
                        </div>
                        <div className="flex items-center space-x-3 transform hover:translate-x-2 transition-transform">
                          <Shield className="w-5 h-5 text-green-300" />
                          <span className="text-sm opacity-90">Secure & private platform</span>
                        </div>
                        <div className="flex items-center space-x-3 transform hover:translate-x-2 transition-transform">
                          <Zap className="w-5 h-5 text-orange-300" />
                          <span className="text-sm opacity-90">Real-time notifications</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right - Registration Form */}
                  <div className="p-8 lg:p-12 relative overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute top-0 right-0 w-28 h-28 bg-purple-100 rounded-full opacity-20 animate-bounce"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
                    
                    <div className="relative z-10">
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-4 animate-pulse">
                          <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                        <p className="text-gray-600">Start your journey with us</p>
                      </div>

                      <Form {...form}>
                        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
                                <FormControl>
                                  <div className="relative group">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                                    <Input 
                                      placeholder="Enter your full name" 
                                      className="pl-10 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-blue-200"
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
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                                <FormControl>
                                  <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                                    <Input 
                                      placeholder="your@email.com" 
                                      type="email" 
                                      className="pl-10 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-blue-200"
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
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                                    <Input 
                                      placeholder="Create a strong password" 
                                      type="password" 
                                      className="pl-10 h-12 border-2 hover:shadow-blue-200 border-gray-200 focus:border-purple-500 rounded-xl transition-all duration-300 hover:shadow-md"
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
                            name="mobile"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Mobile Number</FormLabel>
                                <FormControl>
                                  <div className="relative group">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                                    <Input 
                                      placeholder="Enter your mobile number" 
                                      type="tel" 
                                      className="pl-10 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl transition-all hover:shadow-blue-200 duration-300 hover:shadow-md"
                                      {...field} 
                                      maxLength={10} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" 
                            disabled={loading}
                          >
                            {loading ? (
                              <div className="flex items-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Creating Account...
                              </div>
                            ) : 'Create Account'}
                          </Button>
                        </form>
                      </Form>

                      <div className="mt-8 text-center">
                        <p className="text-gray-600">
                          Already have an account?{' '}
                          <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors">
                            Sign in
                          </Link>
                        </p>
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

export default Register;