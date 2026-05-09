'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Happy Patients', value: '25k+', icon: Icons.users, color: 'text-teal-600', bg: 'bg-teal-50' },
  { label: 'Expert Doctors', value: '150+', icon: Icons.calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Success Rate', value: '98%', icon: Icons.activity, color: 'text-rose-600', bg: 'bg-rose-50' },
  { label: 'Awards Won', value: '12+', icon: Icons.star, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const Stats = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center text-center group"
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110",
                stat.bg
              )}>
                <stat.icon className={cn("w-8 h-8", stat.color)} />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
