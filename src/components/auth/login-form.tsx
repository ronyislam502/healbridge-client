'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Loader2, Mail, Lock, ShieldCheck } from 'lucide-react';
import { HBInput } from '@/components/shared/HBInput';
import { HBForm } from '@/components/shared/HBForm';
import { loginSchema, LoginInput } from '@/lib/validations/auth';
import Link from 'next/link';

export const LoginForm = () => {
  const [isPending, setIsPending] = React.useState(false);

  const onSubmit = async (data: LoginInput) => {
    setIsPending(true);
    console.log('Login attempt with:', data);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Login successful! Welcome back.');
    } finally {
      setIsPending(false);
    }
  };


  return (
    <Card className="w-full max-w-md border-none bg-white/80 shadow-2xl backdrop-blur-xl dark:bg-slate-900/80">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
          <ShieldCheck className="h-6 w-6 text-teal-600 dark:text-teal-400" />
        </div>
        <CardTitle className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400">
          Enter your credentials to access your HealBridge account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <HBForm 
          schema={loginSchema} 
          onSubmit={onSubmit}
          defaultValues={{
            email: '',
            password: '',
            remember: false
          }}
          className="space-y-4"
        >
          {(form) => (
            <>
              <HBInput
                label="Email"
                placeholder="name@example.com"
                icon={Mail}
                error={form.formState.errors.email?.message}
                {...form.register('email')}
              />
              
              <HBInput
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                error={form.formState.errors.password?.message}
                labelRight={
                  <Link href="/recover" className="text-sm font-medium text-teal-600 hover:underline dark:text-teal-400">
                    Forgot password?
                  </Link>
                }
                {...form.register('password')}
              />

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  onCheckedChange={(checked) => form.setValue('remember', !!checked)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me for 30 days
                </label>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white transition-all duration-200"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </>
          )}
        </HBForm>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          <Button variant="outline" className="w-full">
            Google
          </Button>
          <Button variant="outline" className="w-full">
            GitHub
          </Button>
        </div>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Don&apos;t have an account?{' '}
          <a href="/register" className="font-semibold text-teal-600 hover:underline dark:text-teal-400">
            Sign up
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};
