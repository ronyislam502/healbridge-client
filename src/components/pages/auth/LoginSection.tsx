'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Icons } from '@/components/shared/Icons';
import { HBInput } from '@/components/shared/HBInput';
import { HBForm } from '@/components/shared/HBForm';
import { loginSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { FieldValues } from 'react-hook-form';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useLogInMutation } from '@/redux/features/auth/authApi';
import { verifyToken } from '../../utilities/verifyToken';
import { setUser, TUser } from '@/redux/features/auth/authSlice';
import Cookies from "js-cookie";
import Image from 'next/image';

export const LoginSection = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const [signIn, { isLoading: isLoginLoading }] = useLogInMutation();

  const onLoginSubmit = async (data: FieldValues) => {
    try {
      const authData = { email: data.email, password: data.password };
      const res = await signIn(authData).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));

      if (res?.success) {
        Cookies.set("accessToken", res.data.accessToken);
        toast.success("Welcome back to HealBridge");
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col items-center gap-4">
        <Image 
          src="https://res.cloudinary.com/dkk9lvbtf/image/upload/v1778161565/1778077513978_solqyp.png"
          alt='HealBridge' 
          width={140} 
          height={120} 
          className="h-auto w-auto"
        />
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Sign In to Account
          </h3>
          <p className="text-sm text-slate-500 mt-1">Welcome back! Please enter your details.</p>
        </div>
      </div>

      <HBForm 
        resolver={zodResolver(loginSchema)}
        onSubmit={onLoginSubmit}
        className="space-y-6"
      >
        <HBInput 
          label="Email Address" 
          name="email" 
          type="email" 
          placeholder="Enter your email" 
          icon={<Icons.mail className="h-4 w-4 text-blue-600" />} 
          required 
          className="h-12 rounded-xl focus:border-blue-600 focus:ring-blue-600/10"
        />

        <HBInput 
          label="Password" 
          name="password" 
          type={showPassword ? "text" : "password"} 
          placeholder="••••••••" 
          icon={<Icons.lock className="h-4 w-4 text-blue-600" />} 
          required 
          className="h-12 rounded-xl focus:border-blue-600 focus:ring-blue-600/10"
          suffix={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-blue-600 transition-colors"
            >
              {showPassword ? <Icons.eyeOff className="h-4 w-4" /> : <Icons.eye className="h-4 w-4" />}
            </button>
          }
          labelRight={
            <Link href="/forget-pass" className="text-sm font-semibold text-blue-600 hover:underline">
              Forgot?
            </Link>
          }
        />

        <div className="flex items-center space-x-2">
          <Checkbox id="remember" className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-600" />
          <label htmlFor="remember" className="text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer">
            Remember me
          </label>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-base font-bold transition-all shadow-lg shadow-blue-600/20" 
          disabled={isLoginLoading}
        >
          {isLoginLoading ? <Icons.loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
        </Button>
      </HBForm>

      <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account? <span className="text-blue-600 font-bold cursor-pointer hover:underline">Register now</span>
      </p>
    </div>
  );
};
