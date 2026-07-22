import { Suspense } from 'react';
import Image from 'next/image';
import { LoginForm } from '@/components/pages/auth/login-form';
import Link from 'next/link';

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
          src="https://res.cloudinary.com/dkk9lvbtf/image/upload/v1780852102/login-bg_ftc2ck.jpg"
          alt="Medical Background"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0  from-teal-900/40 via-slate-950/80 to-slate-950" />
      </div>

      {/* Decorative Blur Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />


      {/* Content */}
      <div className="relative z-10 w-full px-4 py-12 flex flex-col items-center">
        <Suspense fallback={<div className="text-white font-medium">Loading login form...</div>}>
          <LoginForm />
        </Suspense>

        <div className="mt-8 text-center text-sm text-slate-100">
          &copy; {new Date().getFullYear()} HealBridge Inc. All rights reserved.
          <div className="mt-2 flex justify-center gap-4">
            <Link href="/privacy" className="text-white hover:text-teal-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white hover:text-teal-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
