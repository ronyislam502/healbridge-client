'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useMyProfilQuery } from '@/redux/features/user/userApi';
import { HBProfileSkeleton } from '@/components/shared/HBSkeletons';
import { CreateMedicalReportModal } from './_components/CreateMedicalReportModal';
import { UpdateProfileModal } from './_components/UpdateProfileModal';


const PatientProfile = () => {
  const { data, isLoading } = useMyProfilQuery({});
  
  const profileData = data?.data;

  console.log("data", profileData)

  if (isLoading) {
    return <HBProfileSkeleton />;
  }

  const infoItems = [
    { label: 'Full Name', value: profileData?.name, icon: <Icons.userCheck className="w-5 h-5" /> },
    { label: 'Email Address', value: profileData?.email, icon: <Icons.mail className="w-5 h-5" /> },
    { label: 'Phone Number', value: profileData?.phone, icon: <Icons.phone className="w-5 h-5" /> },
    { label: 'Gender', value: profileData?.gender, icon: <Icons.userCircle className="w-5 h-5" /> },
    { label: 'Residential Address', value: profileData?.address || 'Not Provided', icon: <Icons.mapPin className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Patient <span className="text-teal-500">Profile</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">View and manage your personal healthcare information.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <UpdateProfileModal profileData={profileData} />
          {/* Create Medical Report Modal */}
          <CreateMedicalReportModal profileData={profileData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Avatar & Quick Stats */}
        <div className="space-y-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-white/20 dark:border-slate-800 shadow-2xl overflow-hidden text-center backdrop-blur-xl">
              <div className="relative z-10 flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="absolute -inset-4 bg-teal-500/10 rounded-full blur-2xl animate-pulse"></div>
                  <div className="relative w-44 h-44 rounded-full border-8 border-white dark:border-slate-800 shadow-inner overflow-hidden ring-4 ring-teal-500/20">
                    <Image 
                      src={profileData?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop'} 
                      alt="Avatar" 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight">{profileData?.name}</h3>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                    <p className="text-teal-500 font-black uppercase tracking-[0.2em] text-[10px] italic">Patient Profile</p>
                  </div>
                </div>
                
                <div className="w-full pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-6">
                   <div className="text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-1">Status</p>
                      <p className="text-xs font-black text-emerald-500 uppercase italic tracking-wider">{profileData?.status}</p>
                   </div>
                   <div className="w-px h-8 bg-slate-100 dark:bg-slate-800"></div>
                   <div className="text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-1">ID</p>
                      <p className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase italic tracking-wider">#{profileData?.id?.slice(0, 5)}</p>
                   </div>
                </div>
              </div>
              <Icons.heartPulse className="absolute -bottom-10 -right-10 w-40 h-40 text-teal-500/5 rotate-12" />
            </div>
          </div>

          <div className="bg-slate-900 dark:bg-slate-950 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
             <div className="relative z-10 flex items-center gap-6">
                <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Icons.shieldCheck className="w-8 h-8" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-teal-400 uppercase tracking-[0.2em] italic mb-1">Account Role</p>
                   <p className="text-xl font-black italic uppercase tracking-widest">{profileData?.role}</p>
                </div>
             </div>
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
               <Icons.userCircle className="w-32 h-32 rotate-12" />
             </div>
          </div>
        </div>

        {/* Right Column: Detailed Info & Health Stats */}
        <div className="lg:col-span-2 space-y-12">
          <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-white/20 dark:border-slate-800 shadow-2xl p-10 lg:p-14 relative overflow-hidden backdrop-blur-xl">
            <div className="relative z-10 space-y-14">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-500 shadow-inner">
                      <Icons.userCircle className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Identity Details</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Personal verification info</p>
                    </div>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
                  {infoItems.map((item, index) => (
                    <div key={index} className="space-y-4 group">
                      <div className="flex items-center gap-4">
                         <div className="w-11 h-11 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-teal-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-teal-500/20 transition-all duration-500 flex items-center justify-center">
                           {item.icon}
                         </div>
                         <div className="flex-1">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-1">{item.label}</p>
                           <p className="text-lg font-black text-slate-900 dark:text-white italic leading-tight">
                            {item.value || '---'}
                           </p>
                         </div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
            <Icons.activity className="absolute -bottom-12 -right-12 w-64 h-64 text-slate-500/5 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
