'use client';

import * as React from "react";
import { Icons } from "@/components/shared/Icons";
import { cn } from "@/lib/utils";

interface DoctorTabsProps {
  doctor: {
    about: string;
    education: { year: string; school: string; degree: string }[];
    specializations: string[];
  };
}

const DoctorTabs = ({ doctor }: DoctorTabsProps) => {
  const [activeTab, setActiveTab] = React.useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Icons.activity },
    { id: 'locations', label: 'Locations', icon: Icons.mapPin },
    { id: 'reviews', label: 'Reviews', icon: Icons.star },
    { id: 'hours', label: 'Business Hours', icon: Icons.clock },
  ];

  return (
    <div className="mt-12">
      {/* Tab Headers */}
      <div className="flex flex-wrap gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all duration-300",
              activeTab === tab.id
                ? "bg-slate-900 text-white shadow-2xl scale-105"
                : "bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-100 dark:border-slate-800"
            )}
          >
            <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-teal-400" : "text-slate-400")} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'overview' && (
          <div className="space-y-10">
            <section>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic mb-4">About Me</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg font-medium">
                {doctor.about}
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic mb-6">Education</h3>
                <div className="space-y-6">
                  {doctor.education.map((edu, idx) => (
                    <div key={idx} className="relative pl-8 border-l-2 border-teal-500/20 py-1">
                      <div className="absolute left-[-9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-teal-500 shadow-lg shadow-teal-500/50" />
                      <p className="text-xs font-black text-teal-500 uppercase tracking-widest mb-1">{edu.year}</p>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">{edu.school}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{edu.degree}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic mb-6">Specializations</h3>
                <div className="space-y-4">
                  {doctor.specializations.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group hover:border-teal-500 transition-colors">
                      <div className="w-8 h-8 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                        <Icons.check className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{spec}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* Other tabs placeholder */}
        {activeTab !== 'overview' && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
               <Icons.activity className="w-10 h-10 text-slate-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic mb-2">Content Loading</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">This section is being updated with the latest information.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { DoctorTabs };
