'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { HBForm } from '@/components/form/HBForm';
import { HBInput } from '@/components/form/HBInput';
import { HBSelect } from '@/components/form/HBSelect';
import { HBTextarea } from '@/components/form/HBTextarea';
import { Button } from '@/components/ui/button';
import { FieldValues } from 'react-hook-form';
import Image from 'next/image';
import { useMyProfilQuery, useUpdateMyProfileMutation } from '@/redux/features/user/userApi';
import { useGetAllSpecialtiesQuery } from '@/redux/features/specialties/specialtiesApi';
import { useUpdateDoctorSpecialtiesMutation } from '@/redux/features/doctor/doctorApi';
import { HBProfileSkeleton } from '@/components/shared/HBSkeletons';
import { toast } from 'sonner';
import { HBModal } from '@/components/shared/HBModal';
import { ChangePasswordModal } from '@/components/shared/ChangePasswordModal';

import { useFormContext } from 'react-hook-form';

const SpecialtyCheckbox = ({ specialty, isChecked }: { specialty: any, isChecked: boolean }) => {
  const { register } = useFormContext();
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-teal-500/50 transition-all group">
      <input
        type="checkbox"
        id={specialty.id}
        {...register(specialty.id)}
        className="w-5 h-5 rounded-lg border-2 border-slate-300 text-teal-500 focus:ring-teal-500 cursor-pointer"
        defaultChecked={isChecked}
      />
      <label htmlFor={specialty.id} className="flex-1 text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer italic">
        {specialty.title}
      </label>
    </div>
  );
};

const DoctorProfile = () => {
  const { data, isLoading } = useMyProfilQuery({});
  const [updateProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();
  const [updateSpecialties, { isLoading: isUpdatingSpecialties }] = useUpdateDoctorSpecialtiesMutation();
  const { data: allSpecialties } = useGetAllSpecialtiesQuery({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSpecialtyModalOpen, setIsSpecialtyModalOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  const profileData = data?.data;

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('file', file)
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  //  console.log("avtr", profileData)

  const onSubmit = async (data: FieldValues) => {
    try {
      const formData = new FormData();

      const doctorData = {
        name: data?.name,
        phone: data?.phone,
        avatar: data.avatar,
        gender: data?.gender,
        address: data?.address,
        designation: data?.designation,
        qualification: data?.qualification,
        experience: Number(data?.experience),
        appointmentFee: Number(data?.appointmentFee),
      };

      formData.append('data', JSON.stringify(doctorData));

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

  const onSpecialtySubmit = async (values: FieldValues) => {
    try {
      const selectedSpecialties = Object.entries(values)
        .filter(([_, value]) => value === true)
        .map(([key]) => ({
          specialtiesId: key,
          isDeleted: false,
        }));

      // Find specialties to remove
      const currentSpecialtyIds = profileData?.doctorSpecialties?.map((s: any) => s.specialtiesId) || [];
      const removedSpecialties = currentSpecialtyIds
        .filter((id: string) => !values[id])
        .map((id: string) => ({
          specialtiesId: id,
          isDeleted: true,
        }));

      const res = await updateSpecialties({
        id: profileData?.id,
        data: {
          specialties: [...selectedSpecialties, ...removedSpecialties],
        },
      }).unwrap();

      if (res?.success) {
        toast.success('Specialties updated successfully!');
        setIsSpecialtyModalOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update specialties');
    }
  };

  if (isLoading) {
    return <HBProfileSkeleton />;
  }

  const genderOptions = [
    { key: 'MALE', label: 'Male' },
    { key: 'FEMALE', label: 'Female' },
  ];

  const personalInfo = [
    { label: 'Full Name', value: profileData?.name, icon: <Icons.userCheck className="w-5 h-5" /> },
    { label: 'Email Address', value: profileData?.email, icon: <Icons.mail className="w-5 h-5" /> },
    { label: 'Phone Number', value: profileData?.phone, icon: <Icons.phone className="w-5 h-5" /> },
    { label: 'Gender', value: profileData?.gender, icon: <Icons.userCircle className="w-5 h-5" /> },
  ];

  const professionalInfo = [
    { label: 'Designation', value: profileData?.designation, icon: <Icons.award className="w-5 h-5" /> },
    { label: 'Qualification', value: profileData?.qualification, icon: <Icons.graduationCap className="w-5 h-5" /> },
    { label: 'Experience', value: `${profileData?.experience} Years`, icon: <Icons.activity className="w-5 h-5" /> },
    { label: 'Specialty', value: profileData?.doctorSpecialties?.map((s: any) => s.specialties?.title).join(', '), icon: <Icons.stethoscope className="w-5 h-5" /> },
    { label: 'Consultation Fee', value: `$${profileData?.appointmentFee}`, icon: <Icons.creditCard className="w-5 h-5" /> },
    { label: 'Location', value: profileData?.address, icon: <Icons.mapPin className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Doctor <span className="text-teal-500">Profile</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">View and manage your professional medical presence.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <ChangePasswordModal />
          <HBModal
            title="Update Profile"
            description="Update your professional credentials and availability settings."
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            className="sm:max-w-[800px]"
            trigger={
              <Button className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-sm shadow-xl transition-all flex items-center gap-2 group">
                <Icons.stethoscope className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Update Information
              </Button>
            }
          >
            <HBForm
              onSubmit={onSubmit}
              className="space-y-8"
              defaultValues={{
                name: profileData?.name,
                email: profileData?.email,
                phone: profileData?.phone,
                avatar: profileData.avatar,
                gender: profileData?.gender,
                address: profileData?.address,
                specialty: profileData?.doctorSpecialties?.[0]?.specialties?.title,
                designation: profileData?.designation,
                qualification: profileData?.qualification,
                experience: Number(profileData?.experience),
                appointmentFee: Number(profileData?.appointmentFee),
                bio: profileData?.bio,
              }}
            >
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-20 h-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all hover:border-blue-500 group cursor-pointer">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Icons.user className="w-8 h-8 text-slate-400 group-hover:text-blue-500" />
                  )}
                  <input type="file" accept="image/*" onChange={handleImage} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <HBInput name="name" label="Full Name" icon={<Icons.userCheck className="w-4 h-4" />} />
                  <HBInput name="phone" label="Phone Number" icon={<Icons.phone className="w-4 h-4" />} />
                  <HBInput name="designation" label="Designation" icon={<Icons.award className="w-4 h-4" />} />
                  <HBInput name="qualification" label="Qualification" icon={<Icons.graduationCap className="w-4 h-4" />} />
                  <HBInput name="experience" label="Experience (Years)" type="number" icon={<Icons.activity className="w-4 h-4" />} />
                  <HBInput name="appointmentFee" label="Consultation Fee ($)" type="number" icon={<Icons.creditCard className="w-4 h-4" />} />
                  <HBSelect name="gender" label="Gender" options={genderOptions} />
                  <HBInput name="specialty" label="Specialty" icon={<Icons.stethoscope className="w-4 h-4" />} />
                </div>
                <HBInput name="address" label="Clinic Address" icon={<Icons.mapPin className="w-4 h-4" />} />
                <HBTextarea name="bio" label="Professional Biography" icon={<Icons.fileText className="w-4 h-4" />} />
              </div>

              <Button
                type="submit"
                disabled={isUpdating}
                className="w-full h-14 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                {isUpdating ? <Icons.loader2 className="w-4 h-4 animate-spin" /> : null}
                Save Professional Details
              </Button>
            </HBForm>
          </HBModal>

          <HBModal
            title="Manage Specialties"
            description="Select your areas of medical expertise to help patients find you."
            open={isSpecialtyModalOpen}
            onOpenChange={setIsSpecialtyModalOpen}
            className="sm:max-w-[600px]"
            trigger={
              <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm shadow-sm transition-all flex items-center gap-2 group">
                <Icons.award className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Manage Specialties
              </Button>
            }
          >
            <HBForm
              onSubmit={onSpecialtySubmit}
              className="space-y-8"
              defaultValues={
                allSpecialties?.data?.reduce((acc: any, s: any) => {
                  acc[s.id] = profileData?.doctorSpecialties?.some((ds: any) => ds.specialtiesId === s.id);
                  return acc;
                }, {})
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {allSpecialties?.data?.map((specialty: any) => (
                  <SpecialtyCheckbox
                    key={specialty.id}
                    specialty={specialty}
                    isChecked={profileData?.doctorSpecialties?.some((ds: any) => ds.specialtiesId === specialty.id)}
                  />
                ))}
              </div>

              <Button
                type="submit"
                disabled={isUpdatingSpecialties}
                className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                {isUpdatingSpecialties ? <Icons.loader2 className="w-4 h-4 animate-spin" /> : null}
                Update Expertise
              </Button>
            </HBForm>
          </HBModal>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Professional Card */}
        <div className="space-y-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-white/20 dark:border-slate-800 shadow-2xl overflow-hidden text-center backdrop-blur-xl">
              <div className="relative z-10 space-y-6 flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-teal-500/10 rounded-full blur-2xl animate-pulse"></div>
                  <div className="relative w-44 h-44 rounded-full border-8 border-white dark:border-slate-800 shadow-inner overflow-hidden ring-4 ring-teal-500/20 group-hover:scale-105 transition-transform duration-700">
                    <Image
                      src={profileData?.avatar || "/specialties/neurology.png"}
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-white shadow-lg border-4 border-white dark:border-slate-900 animate-bounce-subtle">
                    <Icons.award className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight leading-tight">{profileData?.name}</h3>
                  <p className="text-teal-500 font-black uppercase tracking-[0.2em] text-[10px] italic mt-2">{profileData?.designation}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {profileData?.doctorSpecialties?.map((s: any, idx: number) => (
                    <span key={idx} className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-[10px] font-black uppercase italic text-slate-500 border border-slate-100 dark:border-slate-700 transition-all hover:bg-teal-500 hover:text-white hover:border-teal-500">
                      {s.specialties?.title}
                    </span>
                  ))}
                  <span className="px-4 py-2 rounded-xl bg-teal-500/10 text-[10px] font-black uppercase italic text-teal-500 border border-teal-500/20">
                    {profileData?.experience} Years Experience
                  </span>
                </div>
              </div>
              <Icons.stethoscope className="absolute -bottom-10 -right-10 w-40 h-40 text-teal-500/5 rotate-12" />
            </div>
          </div>

          <div className="bg-slate-900 dark:bg-slate-950 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group border border-white/5">
            <div className="relative z-10 space-y-6">
              <h4 className="text-[10px] font-black italic uppercase tracking-[0.2em] text-teal-400 border-b border-white/10 pb-4">Medical Verification</h4>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-[2rem] bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                  <Icons.shieldCheck className="w-9 h-9" />
                </div>
                <div>
                  <p className="text-lg font-black uppercase italic tracking-widest leading-none">Certified Expert</p>
                  <p className="text-[10px] text-emerald-400/60 font-black uppercase tracking-tighter italic mt-1">Verified healbridge provider</p>
                </div>
              </div>
            </div>
            <Icons.award className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 rotate-12 group-hover:rotate-45 transition-all duration-1000" />
          </div>
        </div>

        {/* Right: Info Grid */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-white/20 dark:border-slate-800 shadow-2xl p-10 lg:p-14 relative overflow-hidden backdrop-blur-xl">
            <div className="relative z-10 space-y-12">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-500 shadow-inner">
                    <Icons.userCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Professional Matrix</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Clinical & academic credentials</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
                {[...personalInfo, ...professionalInfo].map((item, index) => (
                  <div key={index} className="space-y-4 group">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-teal-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-teal-500/20 transition-all duration-500 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-1">{item.label}</p>
                        <p className="text-lg font-black text-slate-900 dark:text-white italic leading-tight truncate">
                          {item.value || '---'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {profileData?.bio && (
                <div className="pt-10 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 mb-4">
                    <Icons.fileText className="w-4 h-4 text-teal-500" />
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Professional Narrative</h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic text-sm border-l-4 border-teal-500/20 pl-6 py-2">
                    "{profileData.bio}"
                  </p>
                </div>
              )}
            </div>
            <Icons.activity className="absolute -bottom-20 -right-20 w-80 h-80 text-slate-500/5 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
