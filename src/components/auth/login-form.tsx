'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Icons } from '@/components/shared/Icons';
import { HBInput } from '@/components/shared/HBInput';
import { HBForm } from '@/components/shared/HBForm';
import { loginSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

export const LoginForm = () => {
  const [isPending, setIsPending] = React.useState(false);

  const onLoginSubmit = async (data: any) => {
    setIsPending(true);
    console.log('Login attempt with:', data);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Login successful! Welcome back.');
    } finally {
      setIsPending(false);
    }
  };

  const onRegisterSubmit = async (data: any) => {
    setIsPending(true);
    console.log('Register attempt with:', data);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Registration successful! Please verify your email.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-none bg-white/80 shadow-2xl backdrop-blur-xl dark:bg-slate-900/80 overflow-hidden">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-none bg-slate-100/50 dark:bg-slate-800/50 h-14">
          <TabsTrigger 
            value="login" 
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400 font-semibold transition-all h-full"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger 
            value="register"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400 font-semibold transition-all h-full"
          >
            Create Account
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="mt-0">
          <CardHeader className="space-y-1 text-center pt-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
              <Icons.shieldCheck className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <HBForm 
              resolver={zodResolver(loginSchema)}
              onSubmit={onLoginSubmit}
              defaultValues={{ email: '', password: '', remember: false }}
              className="space-y-4"
            >
              <HBInput label="Email" name="email" type="email" placeholder="name@example.com" icon={<Icons.mail className="h-4 w-4" />} required />

              <HBInput 
                label="Password" 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                icon={<Icons.lock className="h-4 w-4" />} 
                required 
                labelRight={
                  <Link href="/recover" className="text-sm font-medium text-teal-600 hover:underline dark:text-teal-400">
                    Forgot password?
                  </Link>
                }
              />

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm font-medium leading-none text-slate-500 dark:text-slate-400">
                  Keep me signed in
                </label>
              </div>
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white" disabled={isPending}>
                {isPending ? <><Icons.loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : 'Sign In'}
              </Button>
            </HBForm>
          </CardContent>
        </TabsContent>

        <TabsContent value="register" className="mt-0">
          <CardHeader className="space-y-1 text-center pt-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
              <Icons.userPlus className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Get Started
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Join HealBridge to manage your healthcare journey
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <HBForm 
              resolver={zodResolver(loginSchema)}
              onSubmit={onRegisterSubmit}
              defaultValues={{ email: '', password: '' }}
              className="space-y-4"
            >
              <HBInput label="Full Name" name="name" placeholder="John Doe" icon={<Icons.shieldCheck className="h-4 w-4" />} required />
              <HBInput label="Email Address" name="email" type="email" placeholder="john@example.com" icon={<Icons.mail className="h-4 w-4" />} required />
              <HBInput label="Password" name="password" type="password" placeholder="••••••••" icon={<Icons.lock className="h-4 w-4" />} required />

              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white" disabled={isPending}>
                {isPending ? <><Icons.loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</> : 'Create Account'}
              </Button>
            </HBForm>
          </CardContent>
        </TabsContent>

        <CardFooter className="flex flex-col space-y-4 pb-8">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200 dark:border-slate-800" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/0 px-2 text-slate-500 dark:text-slate-400">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <Button variant="outline" className="w-full">Google</Button>
            <Button variant="outline" className="w-full">GitHub</Button>
          </div>
        </CardFooter>
      </Tabs>
    </Card>
  );
};
