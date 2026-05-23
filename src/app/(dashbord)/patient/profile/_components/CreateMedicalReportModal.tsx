'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/Icons';
import { HBModal } from '@/components/shared/HBModal';
import { HBForm } from '@/components/form/HBForm';
import { HBInput } from '@/components/form/HBInput';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { useCreateMedicalReportMutation } from '@/redux/features/patient/patientApi';

interface CreateMedicalReportModalProps {
  profileData: any;
}

export const CreateMedicalReportModal = ({ profileData }: CreateMedicalReportModalProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [createMedicalReport, { isLoading: isUploading }] = useCreateMedicalReportMutation();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreview(url);
      } else {
        setPreview(null);
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const onSubmit = async (values: FieldValues) => {
    if (!selectedFile) {
      toast.error('Please select a report file to upload');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify({ reportName: values?.reportName || 'Medical Report' }));
      formData.append('image', selectedFile);

      const res = await createMedicalReport(formData).unwrap();
      if (res?.success) {
        toast.success('Medical report uploaded successfully!');
        setSelectedFile(null);
        setPreview(null);
        setIsOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to upload report');
    }
  };

  return (
    <HBModal
      title="Upload Medical Report"
      description="Upload a new medical report, lab result, or doctor prescription."
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button className="h-14 px-8 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 transition-all flex items-center gap-2 group cursor-pointer">
          <Icons.upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Medical Reports
        </Button>
      }
    >
      <HBForm onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">
          <HBInput
            name="reportName"
            label="Report Label / Name"
            placeholder="e.g. Blood Test - May 2026"
            icon={<Icons.fileText className="w-4 h-4" />}
          />

          <div
            className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-teal-500 hover:bg-teal-50/30 dark:hover:bg-slate-800/30 transition-all cursor-pointer relative group"
          >
            {preview ? (
              <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden border border-slate-200">
                <img src={preview} alt="Report Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={removeFile}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                >
                  <Icons.x className="w-4 h-4" />
                </button>
              </div>
            ) : selectedFile ? (
              <div className="flex flex-col items-center text-center space-y-2">
                <Icons.fileText className="w-12 h-12 text-teal-500 animate-bounce" />
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedFile.name}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                <button
                  type="button"
                  onClick={removeFile}
                  className="mt-2 text-xs font-black text-red-500 uppercase tracking-widest hover:underline"
                >
                  Remove File
                </button>
              </div>
            ) : (
              <>
                <Icons.cloudUpload className="w-12 h-12 text-slate-300 group-hover:text-teal-500 mb-4 transition-colors" />
                <p className="text-sm font-bold text-slate-500 group-hover:text-teal-600">Click to upload medical report</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Accepts images & PDFs</p>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isUploading || !selectedFile}
          className="w-full h-14 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black uppercase tracking-widest shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isUploading ? <Icons.loader2 className="w-4 h-4 animate-spin" /> : <Icons.upload className="w-4 h-4" />}
          Upload Report
        </Button>
      </HBForm>
    </HBModal>
  );
};
