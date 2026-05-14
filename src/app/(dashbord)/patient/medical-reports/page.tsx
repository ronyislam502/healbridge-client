'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HBModal } from '@/components/shared/HBModal';
import { HBForm } from '@/components/shared/HBForm';
import { HBInput } from '@/components/shared/HBInput';
import { HBSelect } from '@/components/shared/HBSelect';
import { useMyProfilQuery } from '@/redux/features/user/userApi';
import { useUpdatePatientMutation } from '@/redux/features/patient/patientApi';
import { toast } from 'sonner';
import { HBSuspense } from '@/components/shared/HBSuspense';
import { FieldValues, useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';

const FilePreview = ({ file, onRemove }: { file: File; onRemove: () => void }) => {
  const [url, setUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (file.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(file);
      setUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  return (
    <div className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-sm animate-in zoom-in-95 duration-300">
      {url ? (
        <img 
          src={url} 
          alt={file.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4 text-center">
          <Icons.fileText className="w-8 h-8 text-teal-500" />
          <p className="text-[10px] font-black text-slate-900 dark:text-white truncate w-full italic">{file.name}</p>
        </div>
      )}
      
      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button
          type="button"
          onClick={onRemove}
          className="w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
        >
          <Icons.trash className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const ReportFileUpload = ({ name, label }: { name: string; label: string }) => {
  const { setValue, watch } = useFormContext();
  const [dragActive, setDragActive] = React.useState(false);
  const files = watch(name) as File[] | undefined;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setValue(name, [...(files || []), ...newFiles], { shouldValidate: true });
  };

  const removeFile = (index: number) => {
    const newFiles = [...(files || [])];
    newFiles.splice(index, 1);
    setValue(name, newFiles, { shouldValidate: true });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setValue(name, [...(files || []), ...newFiles], { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest italic flex items-center gap-2">
        <Icons.upload className="w-4 h-4 text-teal-500" />
        {label}
      </Label>
      
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative group cursor-pointer",
          "border-2 border-dashed rounded-[2.5rem] p-10 transition-all duration-500",
          "flex flex-col items-center justify-center gap-4 text-center",
          dragActive 
            ? "border-teal-500 bg-teal-500/5 scale-[0.98] shadow-inner shadow-teal-500/10" 
            : "border-slate-200 dark:border-slate-800 hover:border-teal-500/50 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:shadow-xl hover:shadow-teal-500/5"
        )}
        onClick={() => document.getElementById(name)?.click()}
      >
        <input
          id={name}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
          accept="image/*,application/pdf"
        />
        
        <div className="w-20 h-20 bg-teal-500/10 rounded-3xl flex items-center justify-center text-teal-500 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
          <Icons.upload className="w-10 h-10" />
        </div>
        
        <div className="space-y-1">
          <p className="text-lg font-black text-slate-900 dark:text-white italic tracking-tight">
            Drop reports here or click to browse
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Supports High-Res Images & PDFs (Max 10MB)
          </p>
        </div>
      </div>

      {files && files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
          {files.map((file, idx) => (
            <FilePreview key={`${file.name}-${idx}`} file={file} onRemove={() => removeFile(idx)} />
          ))}
        </div>
      )}
    </div>
  );
};

const MedicalReports = () => {
  const { data: profileData, isLoading: profileLoading } = useMyProfilQuery({});
  const [updatePatient, { isLoading: isUpdating }] = useUpdatePatientMutation();
  const [isReportModalOpen, setIsReportModalOpen] = React.useState(false);
  const [isHealthModalOpen, setIsHealthModalOpen] = React.useState(false);

  const medicalReports = profileData?.medicalReport || [];
  const healthData = profileData?.patientHealthData;

  const onReportSubmit = async (values: FieldValues) => {
    try {
      const formData = new FormData();
      if (values.images) {
        const fileList = Array.from(values.images as FileList);
        fileList.forEach((file) => {
          formData.append('images', file);
        });
      }
      const metadata = {
        medicalReport: {
          reportName: values.reportName || 'Medical Report',
        }
      };
      formData.append('data', JSON.stringify(metadata));
      await updatePatient({ id: profileData?.id, data: formData }).unwrap();
      toast.success("Medical report uploaded successfully!");
      setIsReportModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to upload report.");
    }
  };

  const onHealthSubmit = async (values: FieldValues) => {
    try {
      const payload = {
        patientHealthData: {
          ...values,
          hasAllergies: values.hasAllergies === 'true',
          hasDiabetes: values.hasDiabetes === 'true',
          smokingStatus: values.smokingStatus === 'true',
          pregnancyStatus: values.pregnancyStatus === 'true',
          hasPastSurgeries: values.hasPastSurgeries === 'true',
          recentAnxiety: values.recentAnxiety === 'true',
          recentDepression: values.recentDepression === 'true',
        }
      };
      
      const formData = new FormData();
      formData.append('data', JSON.stringify(payload));

      await updatePatient({ id: profileData?.id, data: formData }).unwrap();
      toast.success("Health data updated successfully!");
      setIsHealthModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update health data.");
    }
  };

  const bloodGroupOptions = [
    { label: 'A+', value: 'A_POSITIVE' },
    { label: 'B+', value: 'B_POSITIVE' },
    { label: 'O+', value: 'O_POSITIVE' },
    { label: 'AB+', value: 'AB_POSITIVE' },
    { label: 'A-', value: 'A_NEGATIVE' },
    { label: 'B-', value: 'B_NEGATIVE' },
    { label: 'O-', value: 'O_NEGATIVE' },
    { label: 'AB-', value: 'AB_NEGATIVE' },
  ];

  const maritalStatusOptions = [
    { label: 'Married', value: 'MARRIED' },
    { label: 'Unmarried', value: 'UNMARRIED' },
  ];

  const booleanOptions = [
    { label: 'Yes', value: 'true' },
    { label: 'No', value: 'false' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Medical <span className="text-teal-500">Center</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your medical records and track health vital signs.</p>
        </div>

        <div className="flex items-center gap-4">
            <HBModal
                open={isHealthModalOpen}
                onOpenChange={setIsHealthModalOpen}
                title="Update Health Profile"
                description="Keep your vital information up to date for better care."
                trigger={
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest transition-all flex items-center gap-3">
                        <Icons.activity className="w-5 h-5 text-teal-500" />
                        Update Vitals
                    </Button>
                }
            >
                <div className="max-h-[70vh] overflow-y-auto px-2">
                    <HBForm 
                        onSubmit={onHealthSubmit} 
                        defaultValues={{
                            ...healthData,
                            hasAllergies: healthData?.hasAllergies?.toString(),
                            hasDiabetes: healthData?.hasDiabetes?.toString(),
                            smokingStatus: healthData?.smokingStatus?.toString(),
                            pregnancyStatus: healthData?.pregnancyStatus?.toString(),
                            hasPastSurgeries: healthData?.hasPastSurgeries?.toString(),
                            recentAnxiety: healthData?.recentAnxiety?.toString(),
                            recentDepression: healthData?.recentDepression?.toString(),
                        }}
                    >
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <HBInput name="dateOfBirth" label="Date of Birth" placeholder="YYYY-MM-DD" icon={<Icons.calendar className="w-4 h-4" />} />
                                <HBSelect name="bloodGroup" label="Blood Group" options={bloodGroupOptions} />
                                <HBInput name="height" label="Height" placeholder="e.g. 5'10" icon={<Icons.ruler className="w-4 h-4" />} />
                                <HBInput name="weight" label="Weight" placeholder="e.g. 75kg" icon={<Icons.weight className="w-4 h-4" />} />
                                <HBSelect name="maritalStatus" label="Marital Status" options={maritalStatusOptions} />
                                <HBSelect name="smokingStatus" label="Smoking Status" options={booleanOptions} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <HBSelect name="hasAllergies" label="Has Allergies?" options={booleanOptions} />
                                <HBSelect name="hasDiabetes" label="Has Diabetes?" options={booleanOptions} />
                                <HBSelect name="pregnancyStatus" label="Pregnancy Status" options={booleanOptions} />
                                <HBSelect name="hasPastSurgeries" label="Past Surgeries?" options={booleanOptions} />
                                <HBSelect name="recentAnxiety" label="Recent Anxiety?" options={booleanOptions} />
                                <HBSelect name="recentDepression" label="Recent Depression?" options={booleanOptions} />
                            </div>

                            <div className="space-y-6">
                                <HBInput name="dietaryPreferences" label="Dietary Preferences" placeholder="e.g. Vegetarian, Keto" />
                                <HBInput name="mentalHealthHistory" label="Mental Health History" placeholder="Any previous conditions" />
                                <HBInput name="immunizationStatus" label="Immunization Status" placeholder="Current vaccinations" />
                            </div>

                            <div className="pt-4">
                                <Button 
                                    type="submit" 
                                    disabled={isUpdating}
                                    className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest"
                                >
                                    {isUpdating ? <Icons.loader2 className="w-5 h-5 animate-spin" /> : "Save Vitals"}
                                </Button>
                            </div>
                        </div>
                    </HBForm>
                </div>
            </HBModal>

            <HBModal
                open={isReportModalOpen}
                onOpenChange={setIsReportModalOpen}
                title="Upload Medical Report"
                description="Upload your diagnostic reports or prescriptions securely."
                trigger={
                    <Button className="h-14 px-8 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all flex items-center gap-3 group">
                        <Icons.upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                        Add Report
                    </Button>
                }
            >
                <HBForm onSubmit={onReportSubmit}>
                    <div className="space-y-6">
                    <HBInput 
                        name="reportName" 
                        label="Report Name" 
                        placeholder="e.g., Blood Test, X-Ray" 
                        icon={<Icons.fileText className="w-4 h-4" />}
                    />
                    
                    <ReportFileUpload 
                        name="images" 
                        label="Medical Documents" 
                    />

                    <Button 
                        type="submit" 
                        disabled={isUpdating}
                        className="w-full h-14 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
                    >
                        {isUpdating ? <Icons.loader2 className="w-5 h-5 animate-spin" /> : <Icons.check className="w-5 h-5" />}
                        Confirm Upload
                    </Button>
                    </div>
                </HBForm>
            </HBModal>
        </div>
      </div>

      {/* Health Vitals Summary */}
      <HBSuspense isLoading={profileLoading} variant="card" count={1}>
        <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] -mr-48 -mt-48" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div>
                    <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest italic mb-2">Blood Group</p>
                    <h3 className="text-3xl font-black italic">{healthData?.bloodGroup || 'N/A'}</h3>
                    <p className="text-xs text-slate-400 mt-2 font-medium">Verified Blood Type</p>
                </div>
                <div>
                    <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest italic mb-2">Physical Stats</p>
                    <h3 className="text-3xl font-black italic">{healthData?.height || '--'} / {healthData?.weight || '--'}</h3>
                    <p className="text-xs text-slate-400 mt-2 font-medium">Height & Weight</p>
                </div>
                <div>
                    <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest italic mb-2">Birth Date</p>
                    <h3 className="text-3xl font-black italic">{healthData?.dateOfBirth || 'Not Set'}</h3>
                    <p className="text-xs text-slate-400 mt-2 font-medium">Age Verification</p>
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                            <Icons.activity className="w-8 h-8 text-teal-500" />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-teal-400">Health Score: Optimal</span>
                    </div>
                </div>
            </div>
        </div>
      </HBSuspense>

      {/* Reports Grid Section */}
      <div className="space-y-8">
        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Document History</h3>
        <HBSuspense isLoading={profileLoading} variant="card" count={6}>
            {medicalReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {medicalReports.map((report: any) => (
              <div 
                key={report.id}
                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/10 transition-colors" />
                
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-500 border border-teal-500/20 group-hover:scale-110 transition-transform duration-500">
                    <Icons.fileText className="w-8 h-8" />
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 italic bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white italic mb-2 line-clamp-1">{report.reportName}</h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-8">Patient Identity Verified Diagnostic Record</p>

                <div className="flex gap-4">
                  <a 
                    href={report.reportLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 h-12 rounded-xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest italic hover:bg-teal-500 transition-colors group/btn"
                  >
                    View Report
                    <Icons.eye className="w-4 h-4 group-hover/btn:scale-125 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-white dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800 animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-8 relative">
               <div className="absolute inset-0 bg-teal-500/5 rounded-full animate-ping" />
              <Icons.fileText className="w-12 h-12 text-slate-300 relative z-10" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white italic">No reports yet</h3>
            <p className="text-slate-500 mt-2 max-w-xs mx-auto">Your medical history is currently empty. Upload your first report to get started.</p>
            <Button 
              onClick={() => setIsReportModalOpen(true)}
              className="mt-8 h-14 px-10 rounded-2xl bg-teal-500 text-white font-black"
            >
              Upload Now
            </Button>
          </div>
        )}
      </HBSuspense>
      </div>
    </div>
  );
};

export default MedicalReports;
