'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { toast } from 'sonner';
import { useDeleteMedicalReportMutation } from '@/redux/features/patient/patientApi';

interface MedicalReportsGalleryProps {
  profileData: any;
}

export const MedicalReportsGallery = ({ profileData }: MedicalReportsGalleryProps) => {
  const [deleteMedicalReport] = useDeleteMedicalReportMutation();
  const [deletingReportId, setDeletingReportId] = React.useState<string | null>(null);

  const handleDeleteReport = async (reportId: string) => {
    try {
      setDeletingReportId(reportId);
      const res = await deleteMedicalReport(reportId).unwrap();
      if (res?.success) {
        toast.success('Medical report deleted successfully');
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to delete report');
    } finally {
      setDeletingReportId(null);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-white dark:border-slate-800 shadow-2xl p-10 lg:p-14 relative overflow-hidden">
       <div className="relative z-10 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
             <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner">
                  <Icons.fileText className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Medical Repository</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{profileData?.medicalReport?.length || 0} Documents Archived</p>
                </div>
             </div>
          </div>

          {profileData?.medicalReport?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
              {profileData.medicalReport.map((report: any, idx: number) => (
                <div key={idx} className="group relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-700 bg-slate-50">
                  <img 
                    src={report.reportLink} 
                    alt={report.reportName} 
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-1000"
                  />
                  <button
                    onClick={() => handleDeleteReport(report.id)}
                    disabled={deletingReportId === report.id}
                    className="absolute top-4 right-4 w-10 h-10 bg-red-500/90 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all z-20 shadow-lg cursor-pointer"
                  >
                    {deletingReportId === report.id ? (
                      <Icons.settings className="w-4 h-4 animate-spin" />
                    ) : (
                      <Icons.trash className="w-4 h-4" />
                    )}
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500 flex flex-col justify-end p-6 z-10 pointer-events-none">
                     <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 pointer-events-auto">
                       <p className="text-white font-black italic text-xs truncate mb-4 drop-shadow-lg">{report.reportName}</p>
                       <a 
                         href={report.reportLink} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="w-full py-3 rounded-xl bg-white text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] text-center hover:bg-teal-500 hover:text-white transition-all duration-300 inline-block shadow-xl"
                       >
                         View File
                       </a>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center space-y-6 bg-slate-50/50 dark:bg-slate-800/20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
              <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-xl">
                <Icons.folderOpen className="w-10 h-10 text-slate-300" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 dark:text-white italic">Archive is Empty</p>
                <p className="text-sm text-slate-500 font-medium max-w-xs mx-auto mt-2">No medical records found. Use the Health Profile button to upload your first document.</p>
              </div>
            </div>
          )}
       </div>
    </div>
  );
};
