/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Navigation from './Navigation';

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  mobile: z.string().min(10, { message: "Mobile number must be at least 10 digits." }),
});

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    setLoading(true);

    const users = JSON.parse(localStorage.getItem("vjtha_users") || "[]");
    const alreadyExists = users.some((u: any) => u.email === data.email);

    if (alreadyExists) {
      toast.error("User already registered with this email.");
      setLoading(false);
      return;
    }

    users.push(data);
    localStorage.setItem("vjtha_users", JSON.stringify(users));

    toast.success("Registered successfully!");
    setLoading(false);
    navigate("/login");
  };

  return (
    <>
      <Navigation />
      <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-8">
        <div className="w-full max-w-4xl px-4">
          <Card className="shadow-lg bg-blue-50 border border-gray-200"
           style={{ fontFamily: `'Georgia', 'Times New Roman', serif` }}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left - Form Section */}
              <div className="p-6">
                 <CardHeader className="text-center border-b border-gray-300 pb-4 mb-4">
                  <CardTitle className="text-2xl font-bold uppercase tracking-wide">
                    Create a Account
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your name" {...field} />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your email" type="email" {...field} />
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your password" type="password" {...field} />
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
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your mobile number" type="tel" {...field} maxLength={10} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <div className="text-center w-full text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Login
                    </Link>
                  </div>
                </CardFooter>
              </div>

              {/* Right - Branding / Info Section */}
              <div className="bg-white border-l border-gray-200 flex flex-col items-center justify-center p-6 text-center">
                <img
                  src="/lovable-uploads/05a5f58f-1680-44ab-ba49-862bbd7cb4e1.png"
                  alt="VJtha Logo"
                  className="w-48 h-48 mb-4 object-contain"
                />
                <h2 className="text-xl font-semibold mb-2">Welcome to VJtha Media</h2>
                <p className="text-gray-600 text-sm">
                  Stay informed. Be inspired. Join the community of truth and voice.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Register;
