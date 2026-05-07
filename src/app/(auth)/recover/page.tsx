import * as React from 'react';
import Image from 'next/image';
import { RecoverForm } from '@/components/auth/recover-form';

export const metadata = {
  title: 'Recover Password | HealBridge',
  description: 'Recover your HealBridge healthcare account password.',
};

const RecoverPage = () => {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950">
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
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] animate-pulse" />

      {/* Content */}
      <div className="relative z-10 w-full px-4 py-12 flex flex-col items-center">
        <div className="mb-8 flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <span className="text-white font-bold text-xl">H</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">HealBridge</span>
        </div>
        
        <RecoverForm />

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

export default RecoverPage;
