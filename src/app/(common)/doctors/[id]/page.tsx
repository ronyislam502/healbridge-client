import * as React from 'react';
import { DoctorDetails } from '@/components/sections/DoctorDetails';
import { DoctorTabs } from '@/components/sections/DoctorTabs';
import { Icons } from '@/components/shared/Icons';
import { doctorsData } from '@/data/doctors';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Doctor Profile | HealBridge',
  description: 'View detailed professional profile and book an appointment with our specialists.',
};

const SingleDoctorPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const doctor = doctorsData.find((doc) => doc.id === id);

  if (!doctor) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      {/* Page Header / Hero Background */}
      <section className="relative h-64 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Info Area */}
          <div className="flex-1">
            <DoctorDetails doctor={doctor} />
            <DoctorTabs doctor={doctor} />
          </div>

          {/* Sidebar - Booking Widget */}
          <aside className="w-full lg:w-96 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 dark:border-slate-800 sticky top-24">
               <div className="flex items-center justify-between mb-8">
                 <div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Consultation Fee</span>
                   <span className="text-3xl font-black text-slate-900 dark:text-white italic">{doctor.fees}</span>
                 </div>
                 <div className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                   <Icons.calendar className="w-6 h-6" />
                 </div>
               </div>

               <div className="space-y-6">
                 <div>
                   <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest italic mb-4">Availability Schedule</h4>
                   <div className="space-y-3">
                     {[
                       { day: 'Mon - Fri', hours: '09:00 AM - 05:00 PM' },
                       { day: 'Saturday', hours: '10:00 AM - 02:00 PM' },
                       { day: 'Sunday', hours: 'Closed', closed: true },
                     ].map((schedule, idx) => (
                       <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                         <span className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase">{schedule.day}</span>
                         <span className={cn(
                           "text-xs font-black uppercase",
                           schedule.closed ? "text-red-500" : "text-teal-500"
                         )}>
                           {schedule.hours}
                         </span>
                       </div>
                     ))}
                   </div>
                 </div>

                 <button className="w-full h-16 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white font-black text-sm uppercase tracking-widest hover:bg-teal-500 transition-all shadow-xl active:scale-95">
                   Request Booking
                 </button>
                 
                 <div className="text-center">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">
                     <Icons.activity className="w-4 h-4 inline-block mr-2 text-teal-500" />
                     Instant Confirmation
                   </p>
                 </div>
               </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-500 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
               <div className="relative z-10">
                 <h4 className="text-xl font-black italic uppercase tracking-widest mb-2">Emergency?</h4>
                 <p className="text-red-100 font-medium text-sm mb-4">Call the clinic directly for immediate assistance.</p>
                 <p className="text-2xl font-black tracking-tighter">+1 (315) 369-5943</p>
               </div>
               <Icons.phone className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 rotate-12 group-hover:scale-125 transition-transform duration-700" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default SingleDoctorPage;
