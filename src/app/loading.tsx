'use client';

import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      {/* Background Neon Glowing Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-purple-500/10 blur-[130px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-teal-500/10 blur-[130px] animate-pulse]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {/* Logo Container with Orbit Rings */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Pulsing Backlit Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-full blur-2xl animate-pulse duration-2000" />
          
          {/* Animated Orbiting Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/30 animate-spin [animation-duration:10s]" />
          <div className="absolute inset-2 rounded-full border border-teal-500/20 animate-spin [animation-duration:15s] [animation-direction:reverse]" />

          {/* Glowing Inner Shield */}
          <div className="relative w-36 h-36 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-2xl flex items-center justify-center p-6 scale-95 hover:scale-100 transition-transform duration-500 animate-bounce [animation-duration:3s]">
            <Image 
              src="https://res.cloudinary.com/dkk9lvbtf/image/upload/v1778161565/1778077513978_solqyp.png"
              alt="HealBridge Logo" 
              width={120} 
              height={96} 
              className="h-auto w-auto object-contain animate-pulse"
              priority
            />
          </div>
        </div>

        {/* Loading Diagnostics Text */}
        <div className="space-y-3">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-widest uppercase italic flex items-center justify-center gap-2">
            Loading <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-500">HealBridge</span>
          </h2>
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-bounce [animation-delay:0.2s]" />
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-bounce [animation-delay:0.6s]" />
          </div>
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic pt-2">
            Securing safe channel & setting up medical workspace
          </p>
        </div>
      </div>
    </div>
  );
}
