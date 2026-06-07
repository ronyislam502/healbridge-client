'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import Image from 'next/image';
import { useGetAllReviewsQuery } from '@/redux/features/review/reviewApi';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Testimonials = () => {
  const { data, isLoading } = useGetAllReviewsQuery({ limit: 10, sortBy: 'createdAt', sortOrder: 'desc' });
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
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-12 w-72 h-72 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-12 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-black tracking-widest text-teal-600 dark:text-teal-400 uppercase bg-teal-50 dark:bg-teal-500/10 rounded-full border border-teal-500/10">
            <Icons.star className="w-3 h-3 fill-current text-teal-500" />
            Patient Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6 italic uppercase">
            What our <span className="text-teal-500">patients</span> say
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
            Hear from some of our community members about their experience with HealBridge.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative px-4"
        >
          <CarouselContent className="-ml-6">
            {reviews.map((item: any, idx: number) => (
              <CarouselItem key={item.id || idx} className="pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                <div className="h-full bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-0.5 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Icons.star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${
                            i < Math.round(item.rating || 5) 
                              ? "text-amber-400 fill-amber-400" 
                              : "text-slate-200 dark:text-slate-800"
                          }`} 
                        />
                      ))}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 italic">
                      "{item.comment}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-50 dark:border-slate-800/60">
                    <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                      {item.patient?.avatar ? (
                        <Image src={item.patient.avatar} alt={item.patient.name} fill sizes="48px" className="object-cover" />
                      ) : (
                        <span className="text-slate-400 font-bold text-xl uppercase">{item.patient?.name?.[0] || 'P'}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white leading-tight line-clamp-1">{item.patient?.name || 'Anonymous'}</h4>
                      <p className="text-xs font-semibold text-teal-500">Patient</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {reviews.length > 3 && (
            <>
              <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 hover:text-teal-500 hover:border-teal-500/20 hidden md:flex" />
              <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 hover:text-teal-500 hover:border-teal-500/20 hidden md:flex" />
            </>
          )}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
