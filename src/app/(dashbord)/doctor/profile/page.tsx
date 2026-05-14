'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { HBForm } from '@/components/shared/HBForm';
import { HBInput } from '@/components/shared/HBInput';
import { HBSelect } from '@/components/shared/HBSelect';
import { HBTextarea } from '@/components/shared/HBTextarea';
import { HBFileUpload } from '@/components/shared/HBFileUpload';
import { Button } from '@/components/ui/button';
import { FieldValues } from 'react-hook-form';
import Image from 'next/image';
import { useMyProfilQuery, useUpdateMyProfileMutation } from '@/redux/features/user/userApi';
import { useGetAllSpecialtiesQuery } from '@/redux/features/specialties/specialtiesApi';
import { useUpdateDoctorSpecialtiesMutation } from '@/redux/features/doctor/doctorApi';
import { HBProfileSkeleton } from '@/components/shared/HBSkeletons';
import { toast } from 'sonner';
import { HBModal } from '@/components/shared/HBModal';

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

  const profileData = data?.data;

  //  console.log("avtr", profileData)

  const onSubmit = async (values: FieldValues) => {
    try {
      const formData = new FormData();
      const { avatar, experience, appointmentFee, specialty, ...dataValues } = values;

      console.log("avatar", avatar)
      
      const payload = {
        ...dataValues,
        experience: Number(experience),
        appointmentFee: Number(appointmentFee),
      };
      
      formData.append('data', JSON.stringify(payload));
      
      if (avatar && avatar[0]) {
        formData.append('avatar', avatar[0]);
        console.log("Selected File:", avatar[0]);
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
              avatar:profileData.avatar,
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
              <HBFileUpload 
                name="avatar" 
                label="Profile Photo" 
                defaultValue={profileData?.avatar}
              />
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Professional Card */}
        <div className="space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden text-center group">
              <div className="relative z-10 space-y-6 flex flex-col items-center">
                 <div className="relative w-40 h-40 rounded-full border-8 border-teal-500/10 shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <Image 
                      src={profileData?.avatar} 
                      alt="Avatar" 
                      width={150}
                      height={150}
                      className="object-cover"
                    />
                 </div>
                 <div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white italic leading-tight">{profileData?.name}</h3>
                    <p className="text-teal-500 font-black uppercase tracking-widest text-xs italic mt-2">{profileData?.designation}</p>
                 </div>
                 <div className="flex flex-wrap justify-center gap-2">
                    {profileData?.doctorSpecialties?.map((s: any, idx: number) => (
                      <span key={idx} className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-[10px] font-black uppercase italic text-slate-500 border border-slate-100 dark:border-slate-700">
                        {s.specialties?.title}
                      </span>
                    ))}
                    <span className="px-4 py-2 rounded-xl bg-teal-500/10 text-[10px] font-black uppercase italic text-teal-500 border border-teal-500/20">
                       {profileData?.experience} Years Exp.
                    </span>
                 </div>
              </div>
              <Icons.stethoscope className="absolute -bottom-10 -right-10 w-40 h-40 text-teal-500/5 rotate-12" />
           </div>

           <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                 <h4 className="text-xl font-black italic uppercase tracking-widest border-b border-white/10 pb-4">Verification</h4>
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                       <Icons.shieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                       <p className="text-sm font-black uppercase italic tracking-widest">Certified Provider</p>
                       <p className="text-[10px] text-emerald-400/60 font-bold uppercase tracking-tighter italic">Verified by HealBridge</p>
                    </div>
                 </div>
              </div>
              <Icons.award className="absolute -bottom-10 -right-10 w-40 h-40 text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
           </div>
        </div>

        {/* Right: Info Tabs/Grid */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-10 lg:p-14 relative overflow-hidden">
              <div className="relative z-10 space-y-12">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic mb-10 flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500">
                          <Icons.userCircle className="w-6 h-6" />
                       </div>
                       Personal & Professional Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                       {[...personalInfo, ...professionalInfo].map((item, index) => (
                          <div key={index} className="space-y-3 group">
                             <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-500 transition-colors duration-300">
                                   {item.icon}
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{item.label}</p>
                             </div>
                             <p className="text-lg font-black text-slate-900 dark:text-white italic pl-11">
                                {item.value || 'N/A'}
                             </p>
                          </div>
                       ))}
                    </div>
                 </div>

                 {profileData?.bio && (
                   <div className="pt-10 border-t border-slate-100 dark:border-slate-800">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-4">Professional Biography</h4>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                         {profileData.bio}
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
