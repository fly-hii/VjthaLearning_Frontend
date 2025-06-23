
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
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
      await signIn(data.email, data.password);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-8">
        <div className="w-full max-w-5xl px-4">
          <Card
            className="shadow-lg border border-gray-300 bg-blue-50 font-serif"
            style={{ fontFamily: `'Georgia', 'Times New Roman', serif` }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left - Login Form */}
              <div className="p-6 border-r border-gray-300">
                <CardHeader className="text-center border-b border-gray-300 pb-4 mb-4">
                  <CardTitle className="text-3xl font-bold uppercase tracking-wide">
                    The VJtha Login
                  </CardTitle>
                  <CardDescription className="italic text-gray-700">
                    "Access your headlines. Log in to the newsroom."
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      {/* Email Field */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="email@example.com"
                                  className="pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Password Field */}
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  type={showPassword ? 'text' : 'password'}
                                  placeholder="Enter your password"
                                  className="pl-10 pr-10"
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-0 top-0 h-full px-3"
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

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Checking...' : 'Login'}
                      </Button>
                    </form>
                  </Form>
                </CardContent>

                <CardFooter className="flex flex-col">
                  <div className="text-center w-full text-sm">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary hover:underline font-medium">
                      Sign up
                    </Link>
                  </div>
                </CardFooter>
              </div>

              {/* Right - Logo and Description */}
              <div className="bg-white border-l border-gray-300 flex flex-col items-center justify-center p-6 text-center">
                <img
                  src="/lovable-uploads/05a5f58f-1680-44ab-ba49-862bbd7cb4e1.png"
                  alt="VJtha Logo"
                  className="w-48 h-48 mb-4 object-contain bg-white"
                />
                <h2 className="text-xl font-semibold italic mb-2">
                  Welcome to VJtha Media
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed max-w-xs">
                  Delivering verified stories, independent journalism, and the voice of the people — every single day.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
