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
import Image from 'next/image';
import { FieldValues } from 'react-hook-form';
import { useForgotPasswordMutation } from '@/redux/features/auth/authApi';
import { TError } from '@/types/global';

export const RecoverForm = () => {
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log("data", data)
    try {
      const forgotData = {
        email: data?.email,
      };
      const res = await forgotPassword(forgotData).unwrap();

      if (res?.success) {
        toast.success(res?.message);
        // router.push("/reset-pass");
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err?.data?.message);
    }
  };

  return (
    <Card className="w-full max-w-md border-none bg-white/80 shadow-2xl backdrop-blur-xl dark:bg-slate-900/80">
      <CardHeader className="space-y-1 text-center pt-8">
        <Image 
            src="https://res.cloudinary.com/dkk9lvbtf/image/upload/v1778161565/1778077513978_solqyp.png"
            alt='HealBridge logo' 
            width={150} 
            height={120} 
            className="mx-auto h-auto w-auto rounded-lg mb-4"
            />
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
            disabled={isLoading}
          >
            {isLoading ? (
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
