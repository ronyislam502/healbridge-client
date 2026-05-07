'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Icons } from '@/components/shared/Icons';
import { HBSelect } from '@/components/shared/HBSelect';
import { HBInput } from '@/components/shared/HBInput';
import { HBForm } from '@/components/shared/HBForm';
import { Pagination } from '@/components/shared/Pagination';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const doctorsData = [
  { id: 1, name: "Dr. Charles Scott", specialty: "Neurologist", rating: "4.8", location: "Hamshire, TX", fees: "$600", image: "/specialties/pediatrics.png", available: true, experience: "15 Yrs" },
  { id: 2, name: "Dr. Michael Brown", specialty: "Psychiatrist", rating: "5.0", location: "Minneapolis, MN", fees: "$650", image: "/specialties/psychiatry.png", available: true, experience: "12 Yrs" },
  { id: 3, name: "Dr. Nicholas Tello", specialty: "Pediatrician", rating: "4.6", location: "Ogden, IA", fees: "$350", image: "/specialties/pediatrics.png", available: true, experience: "8 Yrs" },
  { id: 4, name: "Dr. Harold Bryant", specialty: "Neurologist", rating: "4.8", location: "Winona, MS", fees: "$500", image: "/specialties/neurology.png", available: true, experience: "10 Yrs" },
  { id: 5, name: "Dr. Sarah Johnson", specialty: "Cardiologist", rating: "4.9", location: "Austin, TX", fees: "$700", image: "/specialties/cardiology.png", available: true, experience: "14 Yrs" },
  { id: 6, name: "Dr. Emily Davis", specialty: "Dermatologist", rating: "4.7", location: "Portland, OR", fees: "$450", image: "/specialties/dermatology.png", available: false, experience: "6 Yrs" },
  { id: 7, name: "Dr. Robert Wilson", specialty: "Orthopedic", rating: "4.5", location: "Seattle, WA", fees: "$550", image: "/specialties/orthopedics.png", available: true, experience: "20 Yrs" },
  { id: 8, name: "Dr. Lisa White", specialty: "Ophthalmologist", rating: "4.9", location: "San Diego, CA", fees: "$400", image: "/specialties/ophthalmology.png", available: true, experience: "11 Yrs" },
];

const specialtiesOptions = [
  { key: 'all', label: 'All Specialties' },
  { key: 'neurologist', label: 'Neurologist' },
  { key: 'cardiologist', label: 'Cardiologist' },
  { key: 'pediatrician', label: 'Pediatrician' },
  { key: 'psychiatrist', label: 'Psychiatrist' },
];

const sortOptions = [
  { key: 'rating', label: 'Highest Rating' },
  { key: 'fee_low', label: 'Fee: Low to High' },
  { key: 'fee_high', label: 'Fee: High to Low' },
  { key: 'exp', label: 'Most Experience' },
];

const DoctorListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; // Mocking 3 pages

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-80 space-y-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
                <Icons.activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-wider italic">Filters</h3>
            </div>

            <HBForm onSubmit={() => {}}>
              <div className="space-y-6">
                <HBInput
                  label="Search Doctor"
                  name="search"
                  placeholder="Doctor name..."
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
                    {['Online Now', 'Available Today', 'Female Doctors', 'Male Doctors'].map((filter) => (
                      <label key={filter} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded-md border border-slate-700 flex items-center justify-center group-hover:border-teal-500 transition-colors">
                          <Icons.check className="w-3 h-3 text-teal-500 opacity-0 group-hover:opacity-100" />
                        </div>
                        <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">{filter}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full h-14 rounded-2xl bg-teal-500 text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-teal-500/20 hover:bg-teal-600 transition-all mt-6">
                  Apply Filters
                </button>
              </div>
            </HBForm>
          </div>

          {/* Promotion Card */}
          <div className="bg-teal-500 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-2xl font-black italic leading-tight mb-4">Get 20% Off Your First Consultation!</h4>
              <p className="text-teal-100 font-medium mb-6">Book an appointment with our top-rated specialists today.</p>
              <button className="px-6 py-3 bg-white text-teal-600 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform">
                Claim Now
              </button>
            </div>
            <Icons.activity className="absolute -bottom-8 -right-8 w-40 h-40 text-white/10 rotate-12 group-hover:scale-125 transition-transform duration-700" />
          </div>
        </aside>

        {/* Doctor List */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white italic">
              Available <span className="text-teal-500">Doctors</span>
              <span className="ml-4 text-sm font-bold text-slate-400 not-italic uppercase tracking-widest">(124 Results)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {doctorsData.map((doctor) => (
              <div key={doctor.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row p-6 gap-6">
                  {/* Doctor Image */}
                  <Link href={`/doctors/${doctor.id}`} className="relative w-full sm:w-48 h-64 sm:h-48 rounded-[2rem] overflow-hidden block">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-lg">
                      <Icons.star className="w-3 h-3 text-orange-500 fill-orange-500" />
                      <span className="text-xs font-black text-slate-900">{doctor.rating}</span>
                    </div>
                  </Link>

                  {/* Doctor Info */}
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black text-teal-500 uppercase tracking-widest italic">{doctor.specialty}</span>
                        {doctor.available && (
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-teal-500 uppercase">Available</span>
                          </div>
                        )}
                      </div>
                      <Link href={`/doctors/${doctor.id}`}>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white italic mb-3 group-hover:text-teal-500 transition-colors">
                          {doctor.name}
                        </h3>
                      </Link>
                      <div className="flex flex-col gap-2">
                         <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                           <Icons.mapPin className="w-4 h-4" />
                           {doctor.location}
                         </div>
                         <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                           <Icons.activity className="w-4 h-4" />
                           {doctor.experience} Experience
                         </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Consultation Fee</span>
                        <span className="text-2xl font-black text-slate-900 dark:text-white italic">{doctor.fees}</span>
                      </div>
                      <Link href={`/doctors/${doctor.id}`}>
                        <button className="w-14 h-14 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl flex items-center justify-center hover:bg-teal-500 transition-all shadow-lg shadow-slate-900/10">
                          <Icons.calendar className="w-6 h-6" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export { DoctorListing };
