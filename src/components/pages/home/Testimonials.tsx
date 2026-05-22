'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import Image from 'next/image';
import { useGetAllReviewsQuery } from '@/redux/features/review/reviewApi';

const Testimonials = () => {
  const { data, isLoading } = useGetAllReviewsQuery({ limit: 3, sortBy: 'createdAt', sortOrder: 'desc' });
  const reviews = data?.data || [];

  if (isLoading) {
    return (
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null; // Don't show the section if there are no reviews yet
  }

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
          {reviews.map((item: any, idx: number) => (
            <div 
              key={item.id || idx} 
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(Math.round(item.rating || 5))].map((_, i) => (
                  <Icons.star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                "{item.comment}"
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {item.patient?.avatar ? (
                    <Image src={item.patient.avatar} alt={item.patient.name} fill className="object-cover" />
                  ) : (
                    <span className="text-slate-400 font-bold text-xl uppercase">{item.patient?.name?.[0] || 'P'}</span>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{item.patient?.name || 'Anonymous'}</h4>
                  <p className="text-xs font-semibold text-teal-600">Patient</p>
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
