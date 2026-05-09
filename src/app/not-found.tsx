'use client';

import Link from 'next/link';
import { Icons } from '@/components/shared/Icons';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 max-w-2xl">
        {/* Animated Icon Container */}
        <div className="relative w-48 h-48 mx-auto mb-12 group">
          <div className="absolute inset-0 bg-teal-500/20 rounded-[3rem] rotate-12 group-hover:rotate-45 transition-transform duration-700 blur-xl" />
          <div className="absolute inset-0 bg-blue-500/20 rounded-[3rem] -rotate-12 group-hover:-rotate-45 transition-transform duration-700 blur-xl" />
          <div className="relative w-full h-full bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-center">
             <div className="text-8xl font-black text-slate-900 dark:text-white italic tracking-tighter animate-bounce">
                4<span className="text-teal-500">0</span>4
             </div>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-6">
          Lost in <span className="text-teal-500">HealBridge</span>?
        </h1>
        <p className="text-lg md:text-xl font-medium text-slate-500 dark:text-slate-400 mb-12 leading-relaxed">
          The medical record or page you're searching for seems to have been misplaced. 
          Don't worry, our specialized navigators can help you find your way back.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/"
            className="h-16 px-10 rounded-2xl bg-slate-900 dark:bg-teal-500 text-white font-black uppercase tracking-widest hover:bg-teal-500 dark:hover:bg-teal-600 transition-all shadow-xl shadow-teal-500/20 flex items-center gap-3 active:scale-95"
          >
            <Icons.activity className="w-5 h-5" />
            Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="h-16 px-10 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-black uppercase tracking-widest hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-3 active:scale-95"
          >
            <Icons.phone className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Support Section */}
        <div className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-center gap-8">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                <Icons.check className="w-5 h-5" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Secure Platform</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-500">
                <Icons.activity className="w-5 h-5" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">24/7 Support</span>
           </div>
        </div>
      </div>
    </div>
  );
}
