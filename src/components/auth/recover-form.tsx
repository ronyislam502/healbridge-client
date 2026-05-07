'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Icons } from '@/components/shared/Icons';
import { HBInput } from '@/components/shared/HBInput';
import { HBForm } from '@/components/shared/HBForm';
import { recoverSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

export const RecoverForm = () => {
  const [isPending, setIsPending] = React.useState(false);

  const onSubmit = async (data: any) => {
    setIsPending(true);
    console.log('Recovery attempt for:', data.email);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Recovery link sent! Please check your email.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-none bg-white/80 shadow-2xl backdrop-blur-xl dark:bg-slate-900/80">
      <CardHeader className="space-y-1 text-center pt-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
          <Icons.lock className="h-6 w-6 text-teal-600 dark:text-teal-400" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Reset Password
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400">
          Enter your email and we&apos;ll send you a link to get back into your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <HBForm 
          resolver={zodResolver(recoverSchema)}
          onSubmit={onSubmit}
          defaultValues={{ email: '' }}
          className="space-y-4"
        >
          <HBInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="name@example.com"
            icon={<Icons.mail className="h-4 w-4" />}

            required
          />
          
          <Button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white transition-all duration-200"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Link...
              </>
            ) : (
              'Send Reset Link'
            )}
          </Button>
        </HBForm>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pb-8">
        <Link 
          href="/login" 
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors dark:text-slate-400 dark:hover:text-teal-400"
        >
          <Icons.arrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </CardFooter>
    </Card>
  );
};
