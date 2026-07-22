'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useGetAllPatientsQuery } from '@/redux/features/patient/patientApi';
import { PatientDetailsModal } from './_components/PatientDetailsModal';
import { HBTable } from '@/components/shared/HBTable';
import { HBModal } from '@/components/shared/HBModal';
import { TPatient } from '@/types/user';

const PatientManagement = () => {
  const { data, isLoading } = useGetAllPatientsQuery({});
  const patients = data?.data || [];

  const [selectedPatientId, setSelectedPatientId] = React.useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);

  const handleViewPatient = (patient: any) => {
    setSelectedPatientId(patient.id);
    setIsViewModalOpen(true);
  };

  const handleViewModalChange = (open: boolean) => {
    setIsViewModalOpen(open);
    if (!open) {
      setSelectedPatientId(null);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Patient <span className="text-teal-500">Management</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage user accounts and monitor patient activity across the platform.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 dark:border-slate-800 font-black text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-3">
            <Icons.share2 className="w-5 h-5" />
            Export Data
          </Button>
          <Button className="h-14 px-8 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all flex items-center gap-3">
            <Icons.userPlus className="w-5 h-5" />
            Register Patient
          </Button>
        </div>
      </div>

      <HBTable<TPatient>
        isLoading={isLoading}
        loadingMessage="Synchronizing Patient Records..."
        data={patients}
        onRowClick={handleViewPatient}
        columns={[
          {
            header: "Patient",
            key: "name",
            render: (row) => (
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-center shrink-0">
                  {row.avatar ? (
                    <Image
                      src={row.avatar}
                      alt={row.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-teal-500/10 flex items-center justify-center text-teal-500 font-black italic border border-teal-500/20">
                      {row.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-base font-black text-slate-900 dark:text-white italic block">{row.name}</span>
                  <span className="text-[10px] font-bold text-slate-400 lowercase">{row.email}</span>
                </div>
              </div>
            )
          },
          {
            header: "Contact Number",
            key: "phone",
            render: (row) => <span className="text-sm font-bold text-slate-900 dark:text-white italic">{row.phone || 'No Contact'}</span>
          },
          {
            header: "Gender",
            key: "gender",
            render: (row) => <span className="text-[10px] font-black text-slate-400 uppercase italic">{row.gender || 'Not specified'}</span>
          },
          {
            header: "Address",
            key: "address",
            render: (row) => <span className="text-sm font-bold text-slate-600 dark:text-slate-400 italic">{row.address || 'N/A'}</span>
          },
          {
            header: "Actions",
            key: "actions",
            align: "right",
            render: (row) => (
              <div className="flex items-center justify-end gap-3">
                <Button
                  onClick={() => handleViewPatient(row)}
                  className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-teal-500 transition-all"
                >
                  <Icons.eye className="w-4 h-4" />
                </Button>
                <Button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-red-500 transition-all">
                  <Icons.share2 className="w-4 h-4" />
                </Button>
              </div>
            )
          }
        ]}
      />

      {/* Patient Details Modal */}
      {selectedPatientId && (
        <HBModal
          title="Patient Details"
          description="View comprehensive medical details, appointment history, patient reviews, and total spend."
          open={isViewModalOpen}
          onOpenChange={handleViewModalChange}
          className="sm:max-w-[700px]"
        >
          <PatientDetailsModal
            patientId={selectedPatientId}
            open={isViewModalOpen}
            onOpenChange={handleViewModalChange}
          />
        </HBModal>
      )}
    </div>
  );
};

export default PatientManagement;
