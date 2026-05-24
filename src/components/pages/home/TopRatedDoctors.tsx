"use client";

import React from "react";
import Link from "next/link";
import { Icons } from "@/components/shared/Icons";
import { useGetTopRatedDoctorsQuery } from "@/redux/features/doctor/doctorApi";
import { TDoctor } from "@/types/user";
import DoctorCard from "../doctors/DoctorCard";

const TopRatedDoctors = () => {
  const { data: doctorsData, isLoading } = useGetTopRatedDoctorsQuery(4);
  const doctors = doctorsData || [];

  if (isLoading) {
    return (
      <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-teal-50 dark:bg-teal-950/30 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Icons.loader2 className="w-8 h-8 text-teal-500 animate-spin" />
          </div>
          <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic animate-pulse">
            Curating Top Rated Specialists...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-black tracking-widest text-teal-600 dark:text-teal-400 uppercase bg-teal-50 dark:bg-teal-500/10 rounded-full border border-teal-500/10">
              <Icons.star className="w-3.5 h-3.5 fill-current animate-pulse text-teal-500" />
              Highest Rated
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight italic uppercase">
              Top Rated <span className="text-teal-500 underline decoration-teal-500/20 underline-offset-8">Specialists</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
              Consult with our elite, patient-approved medical practitioners recognized for excellence in clinical care and outstanding patient satisfaction.
            </p>
          </div>

          <Link href="/doctors" className="shrink-0 group">
            <button className="h-14 px-8 border-2 border-slate-900 dark:border-teal-500 text-slate-900 dark:text-teal-400 rounded-2xl flex items-center gap-3 hover:bg-slate-900 dark:hover:bg-teal-500 hover:text-white dark:hover:text-white transition-all duration-300 active:scale-95 shadow-lg shadow-slate-900/5">
              <span className="text-xs font-black uppercase tracking-widest">Meet All Doctors</span>
              <Icons.chevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 duration-300" />
            </button>
          </Link>
        </div>

        {!doctors || doctors.length === 0 ? (
          <div className="py-20 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
            <Icons.activity className="w-16 h-16 text-slate-300 mx-auto mb-6 animate-pulse" />
            <p className="text-slate-500 font-black uppercase tracking-[0.2em] italic">
              No top rated doctors found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doctor: TDoctor) => (
              <div
                key={doctor.id}
                className="transform hover:-translate-y-2 transition-all duration-500"
              >
                <DoctorCard doctor={doctor} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopRatedDoctors;
