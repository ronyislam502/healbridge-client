'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SpecialtyModal } from '@/components/dashboard/SpecialtyModal';
import { useGetAllSpecialtiesQuery } from '@/redux/features/specialties/specialtiesApi';
import { HBTable } from '@/components/shared/HBTable';


const SpecialtyManagement = () => {
  const { data, isLoading } = useGetAllSpecialtiesQuery({});
  const specialties = data?.data || [];

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
        <SpecialtyModal 
          mode="add"
          trigger={
            <Button className="h-14 px-8 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all flex items-center gap-3">
              <Icons.userPlus className="w-5 h-5" />
              Add New Specialty
            </Button>
          }
        />
      </div>

      <HBTable 
        isLoading={isLoading}
        loadingMessage="Synchronizing Specialized Fields..."
        data={specialties}
        columns={[
          {
            header: "Specialty",
            key: "title",
            render: (row) => (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-500 group-hover:scale-110 transition-transform">
                  <Icons.activity className="w-6 h-6" />
                </div>
                <span className="text-lg font-black text-slate-900 dark:text-white italic">{row.title}</span>
              </div>
            )
          },
          {
            header: "Visual Asset",
            key: "icon",
            render: (row) => (
              <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800">
                <Image
                  src={row.icon || "/specialties/cardiology.png"}
                  alt={row.title}
                  fill
                  className="object-cover"
                />
              </div>
            )
          },
          {
            header: "Status",
            key: "status",
            align: "center",
            render: () => (
              <span className="inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic bg-emerald-500/10 text-emerald-500">
                Active
              </span>
            )
          },
          {
            header: "Actions",
            key: "actions",
            align: "right",
            render: (row) => (
              <div className="flex items-center justify-end gap-3">
                <SpecialtyModal 
                  mode="update"
                  defaultValues={{ title: row.title, image: row.icon }}
                  trigger={
                    <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-teal-500 hover:bg-teal-500/10 transition-all">
                      <Icons.activity className="w-4 h-4" />
                    </button>
                  }
                />
                <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-all">
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

export default SpecialtyManagement;
