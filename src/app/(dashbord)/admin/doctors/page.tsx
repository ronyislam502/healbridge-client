'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useGetAllDoctorsQuery, useCreateDoctorMutation } from '@/redux/features/doctor/doctorApi';
import { useGetAllSpecialtiesQuery } from '@/redux/features/specialties/specialtiesApi';
import { DoctorDetailsModal } from './_components/DoctorDetailsModal';
import { HBTable } from '@/components/shared/HBTable';
import { HBModal } from '@/components/shared/HBModal';
import { HBForm } from '@/components/form/HBForm';
import { HBInput } from '@/components/form/HBInput';
import { HBSelect } from '@/components/form/HBSelect';
import { toast } from 'sonner';
import { FieldValues } from 'react-hook-form';



const DoctorManagement = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const { data, isLoading } = useGetAllDoctorsQuery({});
  const { data: specialtiesData } = useGetAllSpecialtiesQuery({});
  const [createDoctor, { isLoading: isCreating }] = useCreateDoctorMutation();
  const doctors = data?.data || [];

  const [selectedDoctorId, setSelectedDoctorId] = React.useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);

  const handleViewDoctor = (doctor: any) => {
    setSelectedDoctorId(doctor.id);
    setIsViewModalOpen(true);
  };

  const handleViewModalChange = (open: boolean) => {
    setIsViewModalOpen(open);
    if (!open) {
      setSelectedDoctorId(null);
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('file', file)
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const onSubmit = async (values: FieldValues) => {
    try {
      const formData = new FormData();
      const { profilePhoto, password, ...doctorData } = values;

      const payload = {
        password,
        doctor: {
          ...doctorData,
          experience: Number(doctorData.experience),
          appointmentFee: Number(doctorData.appointmentFee),
        }
      };

      formData.append('data', JSON.stringify(payload));
      if (selectedImage) {
        formData.append("avatar", selectedImage);
      }

      const res = await createDoctor(formData).unwrap();
      if (res?.success) {
        toast.success('Doctor registered successfully!');
        setIsModalOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to register doctor');
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Doctor <span className="text-teal-500">Management</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Review and manage professional medical profiles on the platform.</p>
        </div>
        <HBModal
          title="Register New Doctor"
          description="Enter the professional credentials to onboard a new medical specialist."
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          className="sm:max-w-[800px]"
          trigger={
            <Button className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white font-black text-sm uppercase tracking-widest shadow-xl hover:bg-teal-500 transition-all flex items-center gap-3">
              <Icons.userPlus className="w-5 h-5" />
              Add New Doctor
            </Button>
          }
        >
          <HBForm onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <HBInput name="name" label="Full Name" icon={<Icons.userCheck className="w-4 h-4" />} />
              <HBInput name="email" label="Email Address" type="email" icon={<Icons.mail className="w-4 h-4" />} />
              <HBInput name="password" label="Password" type="password" icon={<Icons.lock className="w-4 h-4" />} />
              <HBInput name="phone" label="Contact Number" icon={<Icons.phone className="w-4 h-4" />} />
              <HBInput name="registrationNumber" label="Registration ID" icon={<Icons.shieldCheck className="w-4 h-4" />} />
              <HBInput name="designation" label="Designation" icon={<Icons.award className="w-4 h-4" />} />
              <HBInput name="qualification" label="Qualification" icon={<Icons.graduationCap className="w-4 h-4" />} />
              <HBInput name="currentWorkingPlace" label="Current Workplace" icon={<Icons.mapPin className="w-4 h-4" />} />
              <HBInput name="address" label="Address" icon={<Icons.home className="w-4 h-4" />} />
              <HBInput name="experience" label="Experience (Years)" type="number" icon={<Icons.activity className="w-4 h-4" />} />
              <HBInput name="appointmentFee" label="Consultation Fee ($)" type="number" icon={<Icons.creditCard className="w-4 h-4" />} />
              <HBSelect name="gender" label="Gender" options={[{ key: 'MALE', label: 'Male' }, { key: 'FEMALE', label: 'Female' }]} />
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-20 h-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all hover:border-blue-500 group cursor-pointer">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Icons.user className="w-8 h-8 text-slate-400 group-hover:text-blue-500" />
                  )}
                  <input type="file" accept="image/*" onChange={handleImage} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Profile Photo</span>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isCreating}
              className="w-full h-14 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black uppercase tracking-widest transition-all"
            >
              {isCreating ? <Icons.loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Registration'}
            </Button>
          </HBForm>
        </HBModal>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Doctors', value: data?.meta?.total || 0, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Total Specialties', value: specialtiesData?.data?.length || 0, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Active Doctors', value: doctors.filter((d: any) => !d.isDeleted).length || 0, color: 'text-teal-500', bg: 'bg-teal-500/10' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-lg">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{stat.label}</p>
            <h3 className={cn("text-3xl font-black italic", stat.color)}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Doctors Table */}
      <HBTable
        isLoading={isLoading}
        loadingMessage="Synchronizing Medical Experts..."
        data={doctors}
        onRowClick={handleViewDoctor}
        columns={[
          {
            header: "Doctor Profile",
            key: "name",
            render: (row) => (
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-teal-500/20 group-hover:border-teal-500 transition-colors">
                  <Image
                    src={row.avatar}
                    alt={row.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-base font-black text-slate-900 dark:text-white italic block">{row.name}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{row.email}</span>
                </div>
              </div>
            )
          },
          {
            header: "Specialties",
            key: "doctorSpecialties",
            render: (row) => (
              <div className="flex flex-wrap gap-1">
                {row.doctorSpecialties?.map((ds: any) => (
                  <span key={ds.specialtiesId} className="text-[9px] font-black text-teal-500 uppercase tracking-tighter italic bg-teal-500/5 px-2 py-0.5 rounded-md border border-teal-500/10">
                    {ds.specialties?.title}
                  </span>
                ))}
              </div>
            )
          },
          {
            header: "Reg Number",
            key: "registrationNumber",
            render: (row) => <span className="text-sm font-bold text-slate-900 dark:text-white italic">{row.registrationNumber}</span>
          },
          {
            header: "Fee",
            key: "appointmentFee",
            align: "center",
            render: (row) => <span className="text-sm font-black text-slate-900 dark:text-white italic">${row.appointmentFee}</span>
          },
          {
            header: "Status",
            key: "status",
            align: "center",
            render: (row) => (
              <span className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic bg-emerald-500/10 text-emerald-500`}>
                Active
              </span>
            )
          },
          {
            header: "Actions",
            key: "actions",
            align: "right",
            render: (row) => (
              <div className="flex items-center justify-end gap-3">
                <Button
                  onClick={() => handleViewDoctor(row)}
                  className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-teal-500 transition-all"
                >
                  <Icons.eye className="w-4 h-4" />
                </Button>
                <Button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-red-500 transition-all">
                  <Icons.share2 className="w-4 h-4" />
                </Button>
              </div>
            )
          }
        ]}
      />

      {/* Doctor Details Modal */}
      {selectedDoctorId && (
        <HBModal
          title="Doctor Details"
          description="View comprehensive statistics, reviews, appointments, and earnings for this medical specialist."
          open={isViewModalOpen}
          onOpenChange={handleViewModalChange}
          className="sm:max-w-[700px]"
        >
          <DoctorDetailsModal
            doctorId={selectedDoctorId}
            open={isViewModalOpen}
            onOpenChange={handleViewModalChange}
          />
        </HBModal>
      )}
    </div>
  );
};

export default DoctorManagement;
