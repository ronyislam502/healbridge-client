'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/Icons';
import { HBModal } from '@/components/shared/HBModal';
import { HBForm } from '@/components/shared/HBForm';
import { HBInput } from '@/components/shared/HBInput';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { useCreateMedicalReportMutation } from '@/redux/features/patient/patientApi';

interface CreateMedicalReportModalProps {
  profileData: any;
}

export const CreateMedicalReportModal = ({ profileData }: CreateMedicalReportModalProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [createMedicalReport, { isLoading: isCreatingReport }] = useCreateMedicalReportMutation();
  const [selectedReports, setSelectedReports] = React.useState<File[]>([]);
  const [reportPreviews, setReportPreviews] = React.useState<string[]>([]);

  const handleReports = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedReports((prev) => [...prev, ...files]);
      const urls = files.map((file) => URL.createObjectURL(file));
      setReportPreviews((prev) => [...prev, ...urls]);
    }
  };

  const removeReport = (index: number) => {
    setSelectedReports((prev) => prev.filter((_, i) => i !== index));
    setReportPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onReportSubmit = async (values: FieldValues) => {
    if (selectedReports.length === 0) {
      toast.error('Please select at least one report to upload');
      return;
    }

    try {
      const formData = new FormData();
      const reportData = {
        reportName: values?.reportName || 'Medical Report',
      };
      formData.append('data', JSON.stringify(reportData));
      
      selectedReports.forEach((file) => {
        formData.append('images', file);
      });
      
      const res = await createMedicalReport(formData).unwrap();
      if (res?.success) {
        toast.success('Medical reports uploaded successfully!');
        setSelectedReports([]);
        setReportPreviews([]);
        setIsOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to upload reports');
    }
  };

  return (
    <HBModal
      title="Upload Medical Reports"
      description="Upload new medical reports, lab results, or prescriptions."
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button className="h-14 px-8 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 transition-all flex items-center gap-2 group hover:bg-blue-650 cursor-pointer">
          <Icons.upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Medical Reports
        </Button>
      }
    >
      <HBForm onSubmit={onReportSubmit} className="space-y-6">
        <div className="space-y-4">
          <HBInput name="reportName" label="Report Label" placeholder="e.g. Blood Test - May 2024" icon={<Icons.fileText className="w-4 h-4" />} />
          <div 
            className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-teal-500 hover:bg-teal-50/30 transition-all cursor-pointer group relative"
          >
            <Icons.cloudUpload className="w-12 h-12 text-slate-300 group-hover:text-teal-500 mb-4 transition-colors" />
            <p className="text-sm font-bold text-slate-500 group-hover:text-teal-600">Click to upload medical reports</p>
            <input type="file" multiple accept="image/*" onChange={handleReports} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>

          {reportPreviews.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mt-4">
              {reportPreviews.map((url, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group">
                  <img src={url} alt="Report Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeReport(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icons.x className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={isCreatingReport || selectedReports.length === 0}
          className="w-full h-14 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black uppercase tracking-widest shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
        >
          {isCreatingReport ? <Icons.settings className="w-4 h-4 animate-spin" /> : <Icons.upload className="w-4 h-4" />}
          Upload Reports
        </Button>
      </HBForm>
    </HBModal>
  );
};
