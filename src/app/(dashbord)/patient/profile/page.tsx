'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import { HBForm } from '@/components/shared/HBForm';
import { HBInput } from '@/components/shared/HBInput';
import { HBSelect } from '@/components/shared/HBSelect';
import { HBTextarea } from '@/components/shared/HBTextarea';
import { Button } from '@/components/ui/button';
import { FieldValues } from 'react-hook-form';
import Image from 'next/image';

import { useMyProfilQuery, useUpdateMyProfileMutation } from '@/redux/features/user/userApi';
import { useUpdatePatientMutation } from '@/redux/features/patient/patientApi';
import { HBProfileSkeleton } from '@/components/shared/HBSkeletons';
import { toast } from 'sonner';
import { HBModal } from '@/components/shared/HBModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PatientProfile = () => {
  const { data, isLoading } = useMyProfilQuery({});
  const [updateProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();
  const [updatePatient, { isLoading: isUpdatingPatient }] = useUpdatePatientMutation();
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
  const [isHealthModalOpen, setIsHealthModalOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [selectedReports, setSelectedReports] = React.useState<File[]>([]);
  const [reportPreviews, setReportPreviews] = React.useState<string[]>([]);

  const profileData = data?.data;

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

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

  const onProfileSubmit = async (values: FieldValues) => {
    try {
      const formData = new FormData();
      const basicData = {
        name: values?.name,
        phone: values?.phone,
        gender: values?.gender,
        address: values?.address,
      };
      formData.append('data', JSON.stringify(basicData));
      if (selectedImage) {
        formData.append("avatar", selectedImage);
      }
      const res = await updateProfile(formData).unwrap();
      if (res?.success) {
        toast.success('Basic profile updated successfully!');
        setIsProfileModalOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update basic profile');
    }
  };

  const onHealthSubmit = async (values: FieldValues) => {
    try {
      const formData = new FormData();
      const healthData = {
        patientHealthData: {
          bloodGroup: values?.bloodGroup,
          dateOfBirth: values?.dateOfBirth,
          height: values?.height,
          weight: values?.weight,
          hasAllergies: values?.hasAllergies === 'true',
          hasDiabetes: values?.hasDiabetes === 'true',
          smokingStatus: values?.smokingStatus === 'true',
          maritalStatus: values?.maritalStatus,
          dietaryPreferences: values?.dietaryPreferences,
        },
        medicalReport: {
          reportName: values?.reportName || 'Medical Report',
        }
      };
      formData.append('data', JSON.stringify(healthData));
      if (selectedReports.length > 0) {
        selectedReports.forEach((file) => {
          formData.append('images', file);
        });
      }
      
      const res = await updatePatient({ id: profileData?.id, data: formData }).unwrap();
      if (res?.success) {
        toast.success('Health data and reports updated successfully!');
        setIsHealthModalOpen(false);
        setSelectedReports([]);
        setReportPreviews([]);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update health data');
    }
  };

  if (isLoading) {
    return <HBProfileSkeleton />;
  }

  const genderOptions = [
    { key: 'MALE', label: 'Male' },
    { key: 'FEMALE', label: 'Female' },
  ];

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
          <HBModal
            title="Edit Basic Info"
            description="Update your personal details and profile picture."
            open={isProfileModalOpen}
            onOpenChange={setIsProfileModalOpen}
            trigger={
              <Button className="h-14 px-8 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-700 font-black uppercase tracking-widest text-xs shadow-xl transition-all flex items-center gap-2 group hover:bg-slate-50">
                <Icons.user className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Edit Profile
              </Button>
            }
          >
            <HBForm 
              onSubmit={onProfileSubmit} 
              className="space-y-6"
              defaultValues={{
                name: profileData?.name,
                email: profileData?.email,
                phone: profileData?.phone,
                gender: profileData?.gender,
                address: profileData?.address,
              }}
            >
              <div className="flex justify-center mb-6">
                <div className="relative w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all hover:border-teal-500 group cursor-pointer">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : profileData?.avatar ? (
                    <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Icons.user className="w-10 h-10 text-slate-400 group-hover:text-teal-500" />
                  )}
                  <input type="file" accept="image/*" onChange={handleImage} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <HBInput name="name" label="Full Name" icon={<Icons.userCheck className="w-4 h-4" />} />
                <HBInput name="email" label="Email" disabled icon={<Icons.mail className="w-4 h-4" />} />
                <HBInput name="phone" label="Phone" icon={<Icons.phone className="w-4 h-4" />} />
                <HBSelect name="gender" label="Gender" options={genderOptions} />
              </div>
              <HBTextarea name="address" label="Address" icon={<Icons.mapPin className="w-4 h-4" />} />
              <Button 
                type="submit" 
                disabled={isUpdating}
                className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest transition-all"
              >
                {isUpdating ? <Icons.loader2 className="w-4 h-4 animate-spin" /> : <Icons.check className="w-4 h-4" />}
                Save Profile
              </Button>
            </HBForm>
          </HBModal>

          <HBModal
            title="Update Medical Info"
            description="Manage your health data and medical report uploads."
            open={isHealthModalOpen}
            onOpenChange={setIsHealthModalOpen}
            trigger={
              <Button className="h-14 px-8 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-teal-500/20 transition-all flex items-center gap-2 group">
                <Icons.activity className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Health Profile
              </Button>
            }
          >
            <HBForm 
              onSubmit={onHealthSubmit} 
              className="space-y-6"
              defaultValues={{
                bloodGroup: profileData?.patientHealthData?.bloodGroup,
                dateOfBirth: profileData?.patientHealthData?.dateOfBirth,
                height: profileData?.patientHealthData?.height,
                weight: profileData?.patientHealthData?.weight,
                hasAllergies: String(profileData?.patientHealthData?.hasAllergies || false),
                hasDiabetes: String(profileData?.patientHealthData?.hasDiabetes || false),
                smokingStatus: String(profileData?.patientHealthData?.smokingStatus || false),
                maritalStatus: profileData?.patientHealthData?.maritalStatus,
                dietaryPreferences: profileData?.patientHealthData?.dietaryPreferences,
              }}
            >
              <Tabs defaultValue="vitals" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 p-1 rounded-xl">
                  <TabsTrigger value="vitals" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Vitals & History</TabsTrigger>
                  <TabsTrigger value="reports" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Upload Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="vitals" className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <HBSelect 
                      name="bloodGroup" 
                      label="Blood Group" 
                      options={[
                        { key: 'A_POSITIVE', label: 'A+' },
                        { key: 'A_NEGATIVE', label: 'A-' },
                        { key: 'B_POSITIVE', label: 'B+' },
                        { key: 'B_NEGATIVE', label: 'B-' },
                        { key: 'AB_POSITIVE', label: 'AB+' },
                        { key: 'AB_NEGATIVE', label: 'AB-' },
                        { key: 'O_POSITIVE', label: 'O+' },
                        { key: 'O_NEGATIVE', label: 'O-' },
                      ]} 
                    />
                    <HBInput name="dateOfBirth" label="Date of Birth" type="date" />
                    <HBInput name="height" label='Height (e.g. 5"10)' />
                    <HBInput name="weight" label="Weight (e.g. 70kg)" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <HBSelect 
                      name="hasAllergies" 
                      label="Allergies?" 
                      options={[{ key: 'true', label: 'Yes' }, { key: 'false', label: 'No' }]} 
                    />
                    <HBSelect 
                      name="hasDiabetes" 
                      label="Diabetes?" 
                      options={[{ key: 'true', label: 'Yes' }, { key: 'false', label: 'No' }]} 
                    />
                    <HBSelect 
                      name="smokingStatus" 
                      label="Smoker?" 
                      options={[{ key: 'true', label: 'Yes' }, { key: 'false', label: 'No' }]} 
                    />
                  </div>
                  <HBTextarea name="dietaryPreferences" label="Dietary Preferences" placeholder="e.g. Vegetarian, Keto..." />
                </TabsContent>

                <TabsContent value="reports" className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
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
                </TabsContent>
              </Tabs>
              <Button 
                type="submit" 
                disabled={isUpdatingPatient}
                className="w-full h-14 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black uppercase tracking-widest shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isUpdatingPatient ? <Icons.loader2 className="w-4 h-4 animate-spin" /> : <Icons.save className="w-4 h-4" />}
                Save Medical Records
              </Button>
            </HBForm>
          </HBModal>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Avatar & Quick Stats */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              <div className="relative w-40 h-40 rounded-full border-8 border-slate-50 dark:border-slate-800 shadow-2xl overflow-hidden">
                <Image 
                  src={profileData?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop'} 
                  alt="Avatar" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight">{profileData?.name}</h3>
                <p className="text-teal-500 font-black uppercase tracking-widest text-xs italic mt-1">Patient ID: {profileData?.id?.slice(0, 8)}</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase italic tracking-widest border border-emerald-500/20">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {profileData?.status} Member
              </div>
            </div>
            <Icons.heartPulse className="absolute -bottom-10 -right-10 w-40 h-40 text-teal-500/5 rotate-12" />
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
             <div className="relative z-10 flex items-center gap-6">
                <div className="w-16 h-16 rounded-[2rem] bg-teal-500/20 flex items-center justify-center text-teal-400 border border-teal-500/20">
                  <Icons.shieldCheck className="w-8 h-8" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-teal-400/70 uppercase tracking-widest italic mb-1">Account Role</p>
                   <p className="text-xl font-black italic uppercase tracking-wider">{profileData?.role}</p>
                </div>
             </div>
             <Icons.userCircle className="absolute -bottom-10 -right-10 w-40 h-40 text-white/5 rotate-12" />
          </div>
        </div>

        {/* Right Column: Detailed Info & Health Stats */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-10 lg:p-14 relative overflow-hidden">
            <div className="relative z-10 space-y-12">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-500">
                    <Icons.activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Profile Information</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                  {infoItems.map((item, index) => (
                    <div key={index} className="space-y-3 group">
                      <div className="flex items-center gap-3">
                         <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-500 transition-colors duration-300">
                           {item.icon}
                         </div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{item.label}</p>
                      </div>
                      <p className="text-lg font-black text-slate-900 dark:text-white italic pl-11">
                        {item.value}
                      </p>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Vitals & Health Data Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Blood Group', value: profileData?.patientHealthData?.bloodGroup?.replace('_POSITIVE', '+')?.replace('_NEGATIVE', '-'), icon: <Icons.droplets className="w-6 h-6" />, color: 'bg-rose-500' },
              { label: 'Height', value: profileData?.patientHealthData?.height || 'N/A', icon: <Icons.ruler className="w-6 h-6" />, color: 'bg-indigo-500' },
              { label: 'Weight', value: profileData?.patientHealthData?.weight || 'N/A', icon: <Icons.weight className="w-6 h-6" />, color: 'bg-amber-500' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl group hover:-translate-y-2 transition-all duration-500">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg", stat.color)}>
                  {stat.icon}
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white italic">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Medical Reports Gallery */}
          <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-10 lg:p-14 relative overflow-hidden">
             <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Icons.fileText className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Medical Reports</h3>
                   </div>
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">{profileData?.medicalReport?.length || 0} Reports Found</p>
                </div>

                {profileData?.medicalReport?.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {profileData.medicalReport.map((report: any, idx: number) => (
                      <div key={idx} className="group relative aspect-[3/4] rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-2xl transition-all duration-500">
                        <img 
                          src={report.reportLink} 
                          alt={report.reportName} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                           <p className="text-white font-black italic text-xs truncate mb-2">{report.reportName}</p>
                           <a 
                             href={report.reportLink} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="w-full py-2 rounded-xl bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest text-center hover:bg-teal-500 hover:text-white transition-colors"
                           >
                             View Report
                           </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
                    <Icons.folderOpen className="w-16 h-16 text-slate-300" />
                    <div>
                      <p className="text-lg font-black text-slate-900 dark:text-white italic">No reports uploaded yet</p>
                      <p className="text-sm text-slate-500 font-medium max-w-xs mx-auto">Upload your medical documents to keep them organized and accessible.</p>
                    </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
