import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Specialty Management | HealBridge',
  description: 'Add, edit, or remove medical specialties from the platform.',
};

const specialtiesData = [
  { id: 1, title: "Cardiology", doctors: 254, icon: Icons.heart, image: "/specialties/cardiology.png", status: "Active" },
  { id: 2, title: "Neurology", doctors: 176, icon: Icons.brain, image: "/specialties/neurology.png", status: "Active" },
  { id: 3, title: "Pediatrics", doctors: 124, icon: Icons.baby, image: "/specialties/pediatrics.png", status: "Active" },
  { id: 4, title: "Dentistry", doctors: 135, icon: Icons.tooth, image: "/specialties/dentistry.png", status: "Active" },
  { id: 5, title: "Orthopedics", doctors: 151, icon: Icons.bone, image: "/specialties/orthopedics.png", status: "Active" },
  { id: 6, title: "Dermatology", doctors: 98, icon: Icons.award, image: "/specialties/dermatology.png", status: "Inactive" },
];

const SpecialtyManagement = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Specialty <span className="text-teal-500">Management</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage medical categories and their associated doctor counts.</p>
        </div>
        <Button className="h-14 px-8 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all flex items-center gap-3">
          <Icons.userPlus className="w-5 h-5" />
          Add New Specialty
        </Button>
      </div>

      {/* Specialties Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 px-6 py-2 rounded-xl border border-slate-100 dark:border-slate-800">
            <Icons.search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter specialties..." 
              className="bg-transparent border-none outline-none text-xs font-bold text-slate-700 dark:text-slate-300 w-48"
            />
          </div>
          <div className="flex items-center gap-2">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort by:</span>
             <select className="bg-transparent border-none outline-none text-[10px] font-black text-teal-500 uppercase tracking-widest cursor-pointer">
               <option>Doctor Count</option>
               <option>Alphabetical</option>
               <option>Recent</option>
             </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Specialty</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Visual Asset</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-center">Doctors</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {specialtiesData.map((spec) => (
                <tr key={spec.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-500 group-hover:scale-110 transition-transform">
                        <spec.icon className="w-6 h-6" />
                      </div>
                      <span className="text-lg font-black text-slate-900 dark:text-white italic">{spec.title}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800">
                    <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800">
                      <Image
                        src={spec.image}
                        alt={spec.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-center">
                    <span className="text-xl font-black text-slate-900 dark:text-white italic">{spec.doctors}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Professionals</span>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-center">
                    <span className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic ${
                      spec.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'
                    }`}>
                      {spec.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-teal-500 hover:bg-teal-500/10 transition-all">
                        <Icons.activity className="w-4 h-4" />
                      </button>
                      <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-all">
                        <Icons.share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Specialty Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
           <div className="relative z-10">
             <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-2 italic">Global Reach</p>
             <h4 className="text-2xl font-black italic mb-1">Most Requested</h4>
             <p className="text-slate-400 font-medium text-sm mb-6">Cardiology remains the top specialty.</p>
             <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
               <div className="w-3/4 h-full bg-teal-500" />
             </div>
           </div>
           <Icons.heart className="absolute -bottom-8 -right-8 w-32 h-32 text-white/5 rotate-12" />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Resource Count</p>
           <h4 className="text-2xl font-black italic text-slate-900 dark:text-white mb-1">18 Unique Categories</h4>
           <p className="text-slate-500 font-medium text-sm">Covering all major medical fields.</p>
           <div className="flex gap-2 mt-6">
             {[1, 2, 3, 4, 5].map((i) => (
               <div key={i} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
             ))}
           </div>
        </div>

        <div className="bg-teal-500 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
           <div className="relative z-10">
             <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-2 italic">Action Required</p>
             <h4 className="text-2xl font-black italic mb-4">Verification Pending</h4>
             <button className="px-6 py-2.5 bg-white text-teal-600 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
               Review Submissions
             </button>
           </div>
           <Icons.shieldCheck className="absolute -bottom-8 -right-8 w-32 h-32 text-white/10 -rotate-12" />
        </div>
      </div>
    </div>
  );
};

export default SpecialtyManagement;
