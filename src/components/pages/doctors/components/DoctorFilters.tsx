'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { HBSelect } from '@/components/form/HBSelect';
import { HBInput } from '@/components/form/HBInput';
import { HBForm } from '@/components/form/HBForm';
import { sortOptions, availabilityFilters } from '../constants';

interface DoctorFiltersProps {
  specialtiesOptions: { key: string; label: string }[];
  onFilterSubmit: (data: any) => void;
  onReset: () => void;
}

const DoctorFilters = ({ specialtiesOptions, onFilterSubmit, onReset }: DoctorFiltersProps) => {
  return (
    <aside className="w-full lg:w-80 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl border border-slate-800">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Icons.activity className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-wider italic">Refine Search</h3>
        </div>

        <HBForm onSubmit={onFilterSubmit}>
          <div className="space-y-6">
            <HBInput
              label="Search Doctor"
              name="search"
              placeholder="Doctor name or keywords..."
              icon={<Icons.search className="w-4 h-4" />}
            />

            <HBSelect
              label="Specialty"
              name="specialty"
              options={specialtiesOptions}
            />

            <HBSelect
              label="Sort By"
              name="sort"
              options={sortOptions}
            />

            <div className="pt-4">
              <h4 className="text-[10px] font-black text-teal-400 uppercase tracking-widest italic mb-4">Availability</h4>
              <div className="space-y-3">
                {availabilityFilters.map((filter) => (
                  <label key={filter} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded-md border border-slate-700 flex items-center justify-center group-hover:border-teal-500 transition-all duration-300">
                      <Icons.check className="w-3 h-3 text-teal-500 opacity-0 group-hover:opacity-100" />
                    </div>
                    <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">{filter}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                type="button"
                onClick={onReset}
                className="h-14 rounded-2xl border border-slate-700 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Icons.activity className="w-3.5 h-3.5 rotate-180" />
                Reset
              </button>
              <button
                type="submit"
                className="h-14 rounded-2xl bg-teal-500 text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-teal-500/20 hover:bg-teal-600 transition-all active:scale-95"
              >
                Apply
              </button>
            </div>
          </div>
        </HBForm>
      </div>

      {/* Promotion Card */}
      <div className="bg-teal-500 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl">
        <div className="relative z-10">
          <h4 className="text-2xl font-black italic leading-tight mb-4 tracking-tighter">Get 20% Off Your First Consult!</h4>
          <p className="text-teal-100 font-medium mb-6 text-sm">Book an appointment with our elite specialists today.</p>
          <button className="px-6 py-3 bg-white text-teal-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
            Claim Reward
          </button>
        </div>
        <Icons.activity className="absolute -bottom-8 -right-8 w-40 h-40 text-white/10 rotate-12 group-hover:scale-125 transition-transform duration-700" />
      </div>
    </aside>
  );
};

export default DoctorFilters;
