'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const HomeCTA = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          {/* Subtle Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8 leading-tight">
              Ready to experience modern healthcare?
            </h2>
            
            <p className="text-blue-100 text-lg font-medium mb-10 max-w-xl">
              Join thousands of patients who have already transformed their healthcare journey with HealBridge. Fast, secure, and professional.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button asChild className="h-14 px-10 bg-white text-blue-600 hover:bg-blue-50 rounded-2xl font-bold transition-all shadow-lg">
                <Link href="/doctors" className="flex items-center gap-2">
                   Find Your Doctor
                  <Icons.chevronRight className="w-4 h-4" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-14 px-10 border-blue-400 text-white hover:bg-white/10 rounded-2xl font-bold transition-all">
                <Link href="/register">
                  Join as Doctor
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCTA;
