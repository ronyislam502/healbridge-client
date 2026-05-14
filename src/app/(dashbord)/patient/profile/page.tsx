'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';
import { HBForm } from '@/components/shared/HBForm';
import { HBInput } from '@/components/shared/HBInput';
import { HBSelect } from '@/components/shared/HBSelect';
import { HBFileUpload } from '@/components/shared/HBFileUpload';
import { HBTextarea } from '@/components/shared/HBTextarea';
import { Button } from '@/components/ui/button';
import { FieldValues } from 'react-hook-form';
import Image from 'next/image';

import { useMyProfilQuery, useUpdateMyProfileMutation } from '@/redux/features/user/userApi';
import { HBProfileSkeleton } from '@/components/shared/HBSkeletons';
import { toast } from 'sonner';
import { HBModal } from '@/components/shared/HBModal';

const PatientProfile = () => {
  const { data, isLoading } = useMyProfilQuery({});
  const [updateProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const profileData = data?.data;

  console.log("profile", profileData)

  const onSubmit = async (values: FieldValues) => {
    try {
      const formData = new FormData();
      const { profilePhoto, ...dataValues } = values;
      formData.append('data', JSON.stringify(dataValues));
      
      if (profilePhoto && profilePhoto[0]) {
        formData.append('avatar', profilePhoto[0]);
      }

      const res = await updateProfile(formData).unwrap();
      if (res?.success) {
        toast.success('Profile updated successfully!');
        setIsModalOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update profile');
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

        <HBModal
          title="Edit Profile"
          description="Update your personal details and profile picture."
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          trigger={
            <Button className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-sm shadow-xl transition-all flex items-center gap-2 group">
              <Icons.userCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Edit Profile
            </Button>
          }
        >
          <HBForm 
            onSubmit={onSubmit} 
            className="space-y-6"
            defaultValues={{
              name: profileData?.name,
              email: profileData?.email,
              phone: profileData?.phone,
              gender: profileData?.gender,
              address: profileData?.address,
            }}
          >
            <HBFileUpload 
              name="profilePhoto" 
              label="Profile Image" 
              defaultValue={profileData?.avatar}
            />
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
              className="w-full h-14 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              {isUpdating ? <Icons.loader2 className="w-4 h-4 animate-spin" /> : null}
              Save Changes
            </Button>
          </HBForm>
        </HBModal>
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

        {/* Right Column: Detailed Info */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-10 lg:p-14 h-full relative overflow-hidden">
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
            <Icons.activity className="absolute -bottom-12 -right-12 w-64 h-64 text-slate-500/5 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
