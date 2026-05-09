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
import { HBFileUpload } from '@/components/shared/HBFileUpload';

import { loginSchema, patientRegisterSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { FieldValues } from 'react-hook-form';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useLogInMutation } from '@/redux/features/auth/authApi';
import { useSignUpMutation } from '@/redux/features/user/userApi';
import { verifyToken } from '../../utilities/verifyToken';
import { setUser, TUser } from '@/redux/features/auth/authSlice';
import Cookies from "js-cookie";
import Image from 'next/image';


export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const [signIn, {isLoading: isLoginLoading}] = useLogInMutation();
  const [signUp, {isLoading: isRegisterLoading}] = useSignUpMutation();


  const onLoginSubmit = async (data: FieldValues) => {
    try {
      const authData = {
        email: data.email,
        password: data.password
      };
      
      const res = await signIn(authData).unwrap();

      console.log("res", res)
      
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));

      if (res?.success) {
        Cookies.set("accessToken", res.data.accessToken);
        // refreshToken is usually handled by http-only cookies from server
        toast.success(res?.message || "Login successful");
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  const onRegisterSubmit = async (data: FieldValues) => {
    try {
      const registerData = {
        password: data.password,
        patient: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address
        }
      };
     
      const formData = new FormData();
      formData.append("data", JSON.stringify(registerData));
      
      if (data.avatar && data.avatar[0]) {
        formData.append("avatar", data.avatar[0]);
      }
      
      const res = await signUp(formData).unwrap();

      
      if (res?.success) {
        toast.success(res?.message || "Registration successful! Please login.");
         router.push("/login");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed. Please try again.");
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
          <CardHeader className="text-center">
              <Image 
                  src="https://res.cloudinary.com/dkk9lvbtf/image/upload/v1778161565/1778077513978_solqyp.png"
                  alt='HealBridge logo' 
                  width={150} 
                  height={120} 
                  className="mx-auto h-auto w-auto rounded-lg mb-4"
              />

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
              // defaultValues={{ email: '', password: '', remember: false }}
              className="space-y-4"
            >
              <HBInput label="Email" name="email" type="email" placeholder="name@example.com" icon={<Icons.mail className="h-4 w-4" />} required />

              <HBInput 
                label="Password" 
                name="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                icon={<Icons.lock className="h-4 w-4" />} 
                required 
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-teal-600 transition-colors duration-300"
                  >
                    {showPassword ? <Icons.eyeOff className="h-4 w-4" /> : <Icons.eye className="h-4 w-4" />}
                  </button>
                }
                labelRight={
                  <Link href="/forget-pass" className="text-sm font-medium text-teal-600 hover:underline dark:text-teal-400">
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
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white" disabled={isLoginLoading}>
                {isLoginLoading ? <><Icons.loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : 'Sign In'}
              </Button>

            </HBForm>
          </CardContent>
        </TabsContent>

        <TabsContent value="register" className="mt-0">
          <CardHeader className="text-center">
              <Image 
                  src="https://res.cloudinary.com/dkk9lvbtf/image/upload/v1778161565/1778077513978_solqyp.png"
                  alt='HealBridge logo' 
                  width={150} 
                  height={120} 
                  className="mx-auto h-auto w-auto rounded-lg mb-4"
              />

            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Get Started
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Join HealBridge to manage your healthcare journey
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <HBForm 
              resolver={zodResolver(patientRegisterSchema)}
              onSubmit={onRegisterSubmit}
              // defaultValues={{ name: '', email: '', password: '', phone: '', address: '' }}
              className="space-y-4"
            >
              <div className='flex gap-2'>
                <HBInput label="Full Name" name="name" placeholder="John Doe" icon={<Icons.shieldCheck className="h-4 w-4" />} required containerClassName="flex-1" />
                <HBInput label="Email Address" name="email" type="email" placeholder="john@example.com" icon={<Icons.mail className="h-4 w-4" />} required containerClassName="flex-1" />
              </div>

              <div className='flex gap-2'>
                <HBInput label="Phone Number" name="phone" placeholder="+1 234 567 890" icon={<Icons.phone className="h-4 w-4" />} required containerClassName="flex-1" />
                <HBInput label="Address" name="address" placeholder="123 Street, City" icon={<Icons.mapPin className="h-4 w-4" />} required containerClassName="flex-1" />
              </div>

              
              <div className='flex gap-2 items-end'>
                <HBFileUpload label="Profile Picture" name="avatar" containerClassName="flex-1" />
                <HBInput 
                  label="Password" 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  icon={<Icons.lock className="h-4 w-4" />} 
                  required 
                  containerClassName="flex-1"
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-teal-600 transition-colors duration-300"
                    >
                      {showPassword ? <Icons.eyeOff className="h-4 w-4" /> : <Icons.eye className="h-4 w-4" />}
                    </button>
                  }
                />
              </div>



              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white" disabled={isRegisterLoading}>
                {isRegisterLoading ? <><Icons.loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</> : 'Create Account'}
              </Button>
            </HBForm>
          </CardContent>
        </TabsContent>


        {/* <CardFooter className="flex flex-col space-y-4 pb-8">
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
        </CardFooter> */}
      </Tabs>
    </Card>
  );
};
