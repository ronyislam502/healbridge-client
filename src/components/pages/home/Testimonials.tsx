'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Patient',
    content: "HealBridge made it so easy to find a specialist. The booking process was seamless and the doctor was extremely professional.",
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    name: 'Michael Chen',
    role: 'Patient',
    content: "The interface is beautiful and intuitive. I love how I can manage all my family's health schedules in one place.",
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=michael'
  },
  {
    name: 'Emma Williams',
    role: 'Patient',
    content: "Outstanding service. The real-time availability feature saved me so much time. Highly recommended for everyone!",
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=emma'
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
            What our patients say
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Hear from some of our community members about their experience with HealBridge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Icons.star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                "{item.content}"
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                  <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{item.name}</h4>
                  <p className="text-xs font-semibold text-teal-600">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
