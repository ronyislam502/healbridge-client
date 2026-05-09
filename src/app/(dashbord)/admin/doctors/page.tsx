'use client';

import { Icons } from '@/components/shared/Icons';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useGetAllDoctorsQuery } from '@/redux/features/doctor/doctorApi';
import { HBTable } from '@/components/shared/HBTable';



const DoctorManagement = () => {
  const { data, isLoading } = useGetAllDoctorsQuery({});
  const doctors = data?.data || [];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Doctor <span className="text-teal-500">Management</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Review and manage professional medical profiles on the platform.</p>
        </div>
        <Button className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white font-black text-sm uppercase tracking-widest shadow-xl hover:bg-teal-500 transition-all flex items-center gap-3">
          <Icons.userPlus className="w-5 h-5" />
          Add New Doctor
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Doctors', value: '1,240', color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Pending Verifications', value: '42', color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Active This Month', value: '+128', color: 'text-teal-500', bg: 'bg-teal-500/10' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-lg">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{stat.label}</p>
            <h3 className={cn("text-3xl font-black italic", stat.color)}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Doctors Table */}
      <HBTable 
        isLoading={isLoading}
        loadingMessage="Synchronizing Medical Experts..."
        data={doctors}
        columns={[
          {
            header: "Doctor Profile",
            key: "name",
            render: (row) => (
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-teal-500/20 group-hover:border-teal-500 transition-colors">
                  <Image
                    src={row.avatar || "/specialties/neurology.png"}
                    alt={row.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-base font-black text-slate-900 dark:text-white italic block">{row.name}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{row.email}</span>
                </div>
              </div>
            )
          },
          {
            header: "Specialties",
            key: "doctorSpecialties",
            render: (row) => (
              <div className="flex flex-wrap gap-1">
                {row.doctorSpecialties?.map((ds: any) => (
                  <span key={ds.specialtiesId} className="text-[9px] font-black text-teal-500 uppercase tracking-tighter italic bg-teal-500/5 px-2 py-0.5 rounded-md border border-teal-500/10">
                    {ds.specialties?.title}
                  </span>
                ))}
              </div>
            )
          },
          {
            header: "Reg Number",
            key: "registrationNumber",
            render: (row) => <span className="text-sm font-bold text-slate-900 dark:text-white italic">{row.registrationNumber}</span>
          },
          {
            header: "Fee",
            key: "appointmentFee",
            align: "center",
            render: (row) => <span className="text-sm font-black text-slate-900 dark:text-white italic">${row.appointmentFee}</span>
          },
          {
            header: "Status",
            key: "status",
            align: "center",
            render: (row) => (
              <span className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic bg-emerald-500/10 text-emerald-500`}>
                Active
              </span>
            )
          },
          {
            header: "Actions",
            key: "actions",
            align: "right",
            render: () => (
              <div className="flex items-center justify-end gap-3">
                <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-teal-500 transition-all">
                  <Icons.eye className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-red-500 transition-all">
                  <Icons.share2 className="w-4 h-4" />
                </button>
              </div>
            )
          }
        ]}
      />

    </div>
  );
};

export default DoctorManagement;
