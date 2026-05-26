'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { HBForm } from '@/components/form/HBForm';
import { HBInput } from '@/components/form/HBInput';
import { Button } from '@/components/ui/button';
import { FieldValues } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { useMyProfilQuery, useUpdateMyProfileMutation } from '@/redux/features/user/userApi';
import { HBProfileSkeleton } from '@/components/shared/HBSkeletons';
import { toast } from 'sonner';
import { HBModal } from '@/components/shared/HBModal';

const AdminProfile = () => {
  const { data, isLoading } = useMyProfilQuery({});
  const [updateProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  const profileData = data?.data;

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const onSubmit = async (values: FieldValues) => {
    try {
      const formData = new FormData();
      const { profilePhoto, ...dataValues } = values;
      formData.append('data', JSON.stringify(dataValues));

      if (selectedImage) {
        formData.append("avatar", selectedImage);
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

  const infoItems = [
    { label: 'Full Name', value: profileData?.name, icon: <Icons.userCheck className="w-5 h-5" /> },
    { label: 'Email Address', value: profileData?.email, icon: <Icons.mail className="w-5 h-5" /> },
    { label: 'Phone Number', value: profileData?.phone, icon: <Icons.phone className="w-5 h-5" /> },
    { label: 'Access Level', value: 'Full Administrative Access', icon: <Icons.shieldCheck className="w-5 h-5" /> },
  ];

  const administrativeActions = [
    { label: 'Manage Admins', href: '/admin/admins', desc: 'Add/remove admin credentials.', icon: <Icons.users className="w-5 h-5" />, color: 'hover:text-purple-500 hover:border-purple-500/30 hover:bg-purple-50/30 dark:hover:bg-purple-950/10' },
    { label: 'Manage Doctors', href: '/admin/doctors', desc: 'Verify doctors & manage schedules.', icon: <Icons.userCheck className="w-5 h-5" />, color: 'hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-50/30 dark:hover:bg-blue-950/10' },
    { label: 'Manage Specialties', href: '/admin/specialties', desc: 'Create medical departments.', icon: <Icons.hospital className="w-5 h-5" />, color: 'hover:text-teal-500 hover:border-teal-500/30 hover:bg-teal-50/30 dark:hover:bg-teal-950/10' },
    { label: 'Create Blog Post', href: '/admin/blogs', desc: 'Publish healthy lifestyle tips.', icon: <Icons.edit className="w-5 h-5" />, color: 'hover:text-emerald-500 hover:border-emerald-500/30 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/10' },
  ];

  const joinedDate = profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Administrator <span className="text-teal-500">Profile</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your administrative account settings.</p>
        </div>

        <HBModal
          title="Edit Admin Profile"
          description="Update your administrative details and account security."
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          className="sm:max-w-[550px]"
          trigger={
            <Button className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-sm shadow-xl transition-all flex items-center gap-2 group">
              <Icons.settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
              Edit Profile
            </Button>
          }
        >
          <HBForm
            onSubmit={onSubmit}
            className="space-y-8 pt-4"
            defaultValues={{
              name: profileData?.name,
              email: profileData?.email,
              phone: profileData?.phone,
            }}
          >
            {/* Avatar upload */}
            <div className="flex flex-col items-center">
              <label className="relative group cursor-pointer block">
                <div className="relative w-28 h-28 rounded-[2rem] bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden transition-all hover:border-teal-500 shadow-inner group">
                  {preview || profileData?.avatar ? (
                    <img src={preview || profileData?.avatar} alt="Preview" className="w-full h-full object-cover group-hover:opacity-60 transition-opacity duration-300" />
                  ) : (
                    <Icons.user className="w-10 h-10 text-slate-400 dark:text-slate-600 group-hover:text-teal-500 transition-colors" />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icons.camera className="w-6 h-6 text-white" />
                  </div>
                  <input type="file" accept="image/*" onChange={handleImage} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </label>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-3">Click photo to update</p>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <HBInput name="name" label="Full Name" icon={<Icons.userCheck className="w-4 h-4" />} />
              <HBInput name="email" label="Email Address" disabled icon={<Icons.mail className="w-4 h-4" />} />
              <HBInput name="phone" label="Phone Number" icon={<Icons.phone className="w-4 h-4" />} />
            </div>

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
        {/* Left Column: Admin Identity & Status */}
        <div className="space-y-8 lg:col-span-1">
          {/* Main Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden relative group">
            {/* Gradient cover banner */}
            <div className="h-32 bg-gradient-to-tr from-teal-500 to-emerald-400 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            </div>
            
            <div className="px-8 pb-10 text-center relative z-10 flex flex-col items-center">
              {/* Profile Image overlapping cover */}
              <div className="relative w-36 h-36 rounded-[2.5rem] border-4 border-white dark:border-slate-900 shadow-2xl overflow-hidden -mt-18 bg-white dark:bg-slate-800 hover:scale-105 transition-transform duration-300">
                <Image
                  src={profileData?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop'}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-6 space-y-3">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight">{profileData?.name}</h3>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-teal-600 dark:text-teal-400 font-black uppercase tracking-widest text-[9px] italic bg-teal-500/10 dark:bg-teal-500/20 px-4 py-1.5 rounded-full border border-teal-500/20">
                    System {profileData?.role || 'ADMIN'}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Joined: {joinedDate}
                  </span>
                </div>
              </div>
            </div>
            <Icons.shieldCheck className="absolute -bottom-10 -right-10 w-40 h-40 text-teal-500/5 rotate-12" />
          </div>

          {/* Security Status Box */}
          <div className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-inner">
                <Icons.lock className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <p className="text-[9px] font-black text-emerald-400/80 uppercase tracking-widest italic mb-1">Security Shield</p>
                <p className="text-lg font-black italic uppercase tracking-wider">Active & Secure</p>
              </div>
            </div>
            {/* Background design */}
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
            <Icons.shieldCheck className="absolute -bottom-10 -right-10 w-36 h-36 text-white/5 rotate-12" />
          </div>
        </div>

        {/* Right Column: Account Details & Actions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Information Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl p-8 lg:p-12 relative overflow-hidden">
            <div className="relative z-10 space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 dark:bg-teal-500/20 flex items-center justify-center text-teal-500 dark:text-teal-400">
                  <Icons.userCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Account Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                {infoItems.map((item, index) => (
                  <div key={index} className="space-y-2.5 group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-500 dark:group-hover:bg-teal-950/20 dark:group-hover:text-teal-400 transition-colors duration-300">
                        {item.icon}
                      </div>
                      <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">{item.label}</p>
                    </div>
                    <p className="text-base font-black text-slate-900 dark:text-white italic pl-11">
                      {item.value || 'N/A'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Icons.settings className="absolute -bottom-20 -right-20 w-80 h-80 text-slate-500/5 dark:text-slate-800/10 rotate-12" />
          </div>

          {/* Administrative Shortcuts */}
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl p-8 lg:p-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400">
                  <Icons.layoutDashboard className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic">System Shortcuts</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {administrativeActions.map((action, idx) => (
                  <Link
                    key={idx}
                    href={action.href}
                    className={`flex items-start gap-4 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 transition-all duration-300 group ${action.color}`}
                  >
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-white dark:group-hover:bg-slate-900 shadow-sm border border-transparent dark:border-slate-700/50">
                      {action.icon}
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-slate-900 dark:text-white group-hover:text-inherit text-sm italic">{action.label}</p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{action.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
