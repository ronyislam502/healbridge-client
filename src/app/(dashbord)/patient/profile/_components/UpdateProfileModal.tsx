'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { HBForm } from '@/components/form/HBForm';
import { HBInput } from '@/components/form/HBInput';
import { HBSelect } from '@/components/form/HBSelect';
import { HBTextarea } from '@/components/form/HBTextarea';
import { Button } from '@/components/ui/button';
import { HBModal } from '@/components/shared/HBModal';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { useUpdateMyProfileMutation } from '@/redux/features/user/userApi';

interface UpdateProfileModalProps {
  profileData: any;
}

export const UpdateProfileModal = ({ profileData }: UpdateProfileModalProps) => {
  const [updateProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
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

  const genderOptions = [
    { key: 'MALE', label: 'Male' },
    { key: 'FEMALE', label: 'Female' },
  ];

  return (
    <HBModal
      title="Edit Basic Info"
      description="Update your personal details and profile picture."
      open={isProfileModalOpen}
      onOpenChange={setIsProfileModalOpen}
      trigger={
        <Button className="h-14 px-8 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-700 font-black uppercase tracking-widest text-xs shadow-xl transition-all flex items-center gap-2 group hover:bg-slate-50 cursor-pointer">
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
  );
};
