'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';

const features = [
  { title: 'Live Consultations', icon: Icons.activity },
  { title: 'Digital Prescriptions', icon: Icons.calendar },
  { title: 'Health Tracking', icon: Icons.heart },
  { title: '24/7 Support', icon: Icons.messageSquare },
];

const HealthApp = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Professional Device Mockup */}
          <div className="relative order-2 lg:order-1 flex justify-center">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-500/5 rounded-full blur-[120px] -z-10" />
             
             {/* iPhone-style Frame */}
             <div className="relative w-72 h-[580px] bg-slate-900 rounded-[3.5rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[6px] border-slate-800">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-2xl z-20 flex items-center justify-center">
                  <div className="w-10 h-1.5 bg-slate-800 rounded-full" />
                </div>
                
                {/* Screen Content */}
                <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[2.8rem] overflow-hidden relative">
                  <div className="p-6 pt-12 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                        <Icons.activity className="w-5 h-5 text-teal-500" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-full" />
                      <div className="h-3 w-1/2 bg-slate-50 dark:bg-slate-800/50 rounded-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-28 bg-teal-500/10 rounded-2xl border border-teal-500/20" />
                      <div className="h-28 bg-blue-500/10 rounded-2xl border border-blue-500/20" />
                    </div>
                    <div className="h-40 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800" />
                  </div>
                  
                  {/* Bottom Navigation Mockup */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-6 flex justify-between items-center">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800" />
                    ))}
                  </div>
                </div>
             </div>
          </div>

          {/* Content Column */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-6">
              <span className="inline-block px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full text-xs font-bold uppercase tracking-widest">
                Coming Soon
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                Healthcare in your <span className="text-blue-600">pocket</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                Experience the future of healthcare with the HealBridge mobile app. Manage appointments, chat with doctors, and track your wellness on the go.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 py-1">
                  <div className="w-5 h-5 text-teal-600">
                    <Icons.check className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{feature.title}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <button className="h-14 px-8 bg-slate-900 text-white rounded-2xl flex items-center gap-3 hover:bg-slate-800 transition-colors">
                  <Icons.activity className="w-6 h-6" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-400 leading-none">Download on the</p>
                    <p className="text-lg font-bold leading-none mt-1">App Store</p>
                  </div>
               </button>
               <button className="h-14 px-8 bg-slate-900 text-white rounded-2xl flex items-center gap-3 hover:bg-slate-800 transition-colors">
                  <Icons.calendar className="w-6 h-6" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-400 leading-none">Get it on</p>
                    <p className="text-lg font-bold leading-none mt-1">Google Play</p>
                  </div>
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthApp;
