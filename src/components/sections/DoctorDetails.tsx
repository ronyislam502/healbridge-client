'use client';

import * as React from "react";
import Image from "next/image";
import { Icons } from "@/components/shared/Icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DoctorDetailsProps {
  doctor: {
    name: string;
    specialty: string;
    rating: string;
    location: string;
    image: string;
    fees: string;
    experience: string;
    available: boolean;
  };
}

const DoctorDetails = ({ doctor }: DoctorDetailsProps) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-800">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Doctor Image & Status */}
        <div className="relative w-full lg:w-80 h-[400px] rounded-[2rem] overflow-hidden group">
          <Image
            src={doctor.image}
            alt={doctor.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {doctor.available && (
            <div className="absolute top-4 left-4 bg-teal-500 text-white px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg">
              Available
            </div>
          )}
        </div>

        {/* Doctor Primary Info */}
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-teal-500 font-black text-sm uppercase tracking-widest italic">
              <Icons.award className="w-4 h-4" />
              Verified Specialist
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight italic">
              {doctor.name.split(' ').slice(0, -1).join(' ')} <span className="text-teal-500">{doctor.name.split(' ').pop()}</span>
            </h1>
            <p className="text-xl font-bold text-slate-500 dark:text-slate-400">
              MBBS, MD - {doctor.specialty}, {doctor.experience} Experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Icons.star, label: "Rating", value: `${doctor.rating} (1.2k)`, color: "text-orange-500" },
              { icon: Icons.mapPin, label: "Location", value: doctor.location, color: "text-blue-500" },
              { icon: Icons.activity, label: "Consults", value: "5k+ Success", color: "text-teal-500" },
              { icon: Icons.phone, label: "Response", value: "Within 1hr", color: "text-purple-500" },
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <stat.icon className={cn("w-5 h-5 mb-2", stat.color)} />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-sm font-black text-slate-900 dark:text-white uppercase line-clamp-1">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            {[doctor.specialty, "Healthcare", "Surgery", "Specialist"].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-xl bg-teal-500/5 text-teal-600 dark:text-teal-400 text-xs font-black uppercase tracking-widest border border-teal-500/10">
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-4">
             <Button className="h-16 px-8 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-lg uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all">
               Book Appointment
             </Button>
             <Button variant="outline" className="h-16 px-8 rounded-2xl border-slate-200 dark:border-slate-800 font-black text-lg uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
               View Profile
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DoctorDetails };
