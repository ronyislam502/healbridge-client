import * as React from 'react';
import Image from 'next/image';
import { LoginForm } from '@/components/pages/auth/login-form';

export const metadata = {
  title: 'Login | HealBridge',
  description: 'Access your HealBridge healthcare account.',
};

const LoginPage = () => {
  return (
    <main className="relative h-full w-full flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/login-bg.png"
          alt="Medical Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 via-slate-950/80 to-slate-950" />
      </div>

      {/* Decorative Blur Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />


      {/* Content */}
      <div className="relative z-10 w-full px-4 py-12 flex flex-col items-center">
        <LoginForm />

        <div className="mt-8 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} HealBridge Inc. All rights reserved.
          <div className="mt-2 flex justify-center gap-4">
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
