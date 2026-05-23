'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '@/components/shared/Icons';
import { TDoctor } from '@/types/user';
import { cn } from '@/lib/utils';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';

interface DoctorCardProps {
  doctor: TDoctor;
  className?: string;
}

const DoctorCard = ({ doctor, className }: DoctorCardProps) => {
  // Safe specialty extraction
  const specialty = doctor.doctorSpecialties?.[0]?.title || "Specialist";

  // Calculate average rating dynamically
  const reviews = doctor.review || [];
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "4.9";

  return (
    <Card className={cn(
      "bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full ring-0",
      className
    )}>
      {/* Top Image Section - Compact Height */}
      <div className="relative h-[220px] w-full overflow-hidden">
        <Link href={`/doctors/${doctor.id}`} className="block h-full">
          <Image
            src={doctor.avatar || "/doc-placeholder.png"}
            alt={doctor.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        
        {/* Floating Badges - Slightly Smaller */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          <div className="flex items-center gap-1 bg-orange-500 text-white px-2 py-1 rounded-lg text-[10px] font-black shadow-lg shadow-orange-500/20">
            <Icons.star className="w-3 h-3 fill-current" />
            {averageRating}
          </div>
          <div className="bg-white/90 backdrop-blur-md text-slate-900 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-md">
            {doctor.experience}+ Yrs
          </div>
        </div>
        
        <button className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-md rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white transition-all shadow-xl active:scale-90 z-10">
          <Icons.heart className="w-4.5 h-4.5" />
        </button>

        {/* Bottom Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
           <div className="flex items-center gap-2 text-white/90 text-[9px] font-black uppercase tracking-widest italic">
             <Icons.activity className="w-2.5 h-2.5 text-teal-400" />
             Top Specialist
           </div>
        </div>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-teal-600 bg-teal-50 dark:bg-teal-500/10 dark:text-teal-400 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.15em] italic border border-teal-500/10">
            {specialty}
          </span>
          {!doctor.isDeleted && (
            <div className="flex items-center gap-1.5 text-emerald-500 text-[9px] font-black uppercase tracking-widest italic">
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              Active
            </div>
          )}
        </div>

        <Link href={`/doctors/${doctor.id}`} className="group/title">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1 group-hover/title:text-teal-500 transition-colors cursor-pointer line-clamp-1 italic tracking-tight">
            {doctor.name}
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
            {doctor.designation || "Medical Professional"}
          </p>
        </Link>

        <div className="space-y-2 mb-3 flex-1">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px] font-medium">
            <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
              <Icons.mapPin className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <span className="line-clamp-1">{doctor.currentWorkingPlace || "HealBridge Clinic"}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 p-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-slate-400 text-[8px] font-black uppercase tracking-widest mb-0.5 italic">Fee</span>
          <span className="text-xl font-black text-slate-900 dark:text-white italic tracking-tighter">
            ${doctor.appointmentFee}
          </span>
        </div>
        
        <Link href={`/doctors/${doctor.id}`}>
          <button className="h-9 px-4 bg-slate-900 dark:bg-teal-500 text-white rounded-xl flex items-center gap-2 hover:bg-teal-500 transition-all shadow-xl shadow-slate-900/10 dark:shadow-teal-500/20 active:scale-95 group/btn">
            <span className="text-[9px] font-black uppercase tracking-widest">Book</span>
            <Icons.calendar className="w-3 h-3 transition-transform group-hover/btn:rotate-12" />
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;