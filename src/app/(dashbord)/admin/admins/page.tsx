'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useAllAdminsQuery, useCreateAdminMutation, useUpdateAdminMutation } from '@/redux/features/user/userApi';
import { HBTable } from '@/components/shared/HBTable';
import { HBModal } from '@/components/shared/HBModal';
import { HBForm } from '@/components/form/HBForm';
import { HBInput } from '@/components/form/HBInput';
import { toast } from 'sonner';
import { FieldValues } from 'react-hook-form';

const AdminManagement = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const { data, isLoading } = useAllAdminsQuery({ limit: 10 });
  const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation();
  const [updateAdmin, { isLoading: isUpdatingAdmin }] = useUpdateAdminMutation();

  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedAdmin, setSelectedAdmin] = React.useState<any>(null);
  const [selectedEditImage, setSelectedEditImage] = React.useState<File | null>(null);
  const [editPreview, setEditPreview] = React.useState<string | null>(null);

  const admins = data?.data || [];

  const handleEditImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedEditImage(file);
      const url = URL.createObjectURL(file);
      setEditPreview(url);
    }
  };

  const handleEditOpenChange = (open: boolean) => {
    setIsEditModalOpen(open);
    if (!open) {
      setSelectedAdmin(null);
      setSelectedEditImage(null);
      setEditPreview(null);
    }
  };

  const onEditSubmit = async (values: FieldValues) => {
    try {
      const formData = new FormData();
      const payload = {
        admin: {
          name: values.name,
          phone: values.phone,
        }
      };

      formData.append('data', JSON.stringify(payload));

      if (selectedEditImage) {
        formData.append('avatar', selectedEditImage);
      }

      const res = await updateAdmin({ id: selectedAdmin.id, data: formData }).unwrap();
      if (res?.success) {
        toast.success('Administrator updated successfully!');
        handleEditOpenChange(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update administrator');
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setSelectedImage(null);
      setPreview(null);
    }
  };

  const onSubmit = async (values: FieldValues) => {
    try {
      const formData = new FormData();
      const { profilePhoto, password, ...adminData } = values;

      const payload = {
        password,
        admin: adminData
      };

      formData.append('data', JSON.stringify(payload));

      if (selectedImage) {
        formData.append('avatar', selectedImage);
      }

      const res = await createAdmin(formData).unwrap();
      if (res?.success) {
        toast.success('Administrator created successfully!');
        handleOpenChange(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to create administrator');
    }
  };

  const columns = [
    {
      header: 'Admin Name',
      key: 'name',
      render: (row: any) => (
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-white">
            {row.avatar ? (
              <Image src={row.avatar} alt={row.name || 'Admin'} fill className="object-cover" />
            ) : (
              <Icons.shieldCheck className="w-5 h-5" />
            )}
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white italic">{row.name || 'Admin User'}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Role',
      key: 'role',
      render: (row: any) => {
        const role = row.role || row.user?.role;
        return (
          <span className={cn(
            "px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest italic",
            role === 'SUPER_ADMIN' ? 'bg-purple-500/10 text-purple-500' : 'bg-slate-500/10 text-slate-500'
          )}>
            {role}
          </span>
        );
      }
    },
    {
      header: 'Status',
      key: 'status',
      render: (row: any) => {
        const status = row.status || row.user?.status;
        return (
          <span className="px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest italic bg-emerald-500/10 text-emerald-500">
            {status}
          </span>
        );
      }
    },
    {
      header: 'Created At',
      key: 'createdAt',
      render: (row: any) => (
        <span className="text-sm font-bold text-slate-500 italic">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      )
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'right' as const,
      render: (row: any) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedAdmin(row);
              setIsEditModalOpen(true);
            }}
            className="h-10 w-10 p-0 rounded-xl hover:bg-teal-500/10 hover:text-teal-500"
          >
            <Icons.edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-red-500/10 hover:text-red-500">
            <Icons.trash className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Admin <span className="text-teal-500">Management</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Control platform access and administrative roles.</p>
        </div>

        <HBModal
          title="Create New Administrator"
          description="Grant administrative privileges to a new user account."
          open={isModalOpen}
          onOpenChange={handleOpenChange}
          className="sm:max-w-[500px]"
          trigger={
            <Button className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-sm shadow-xl transition-all flex items-center gap-2 group">
              <Icons.userPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Add Administrator
            </Button>
          }
        >
          <HBForm onSubmit={onSubmit} className="space-y-6">
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden transition-all hover:border-teal-500 group cursor-pointer">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Icons.user className="w-8 h-8 text-slate-400 group-hover:text-teal-500" />
                )}
                <input type="file" accept="image/*" onChange={handleImage} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Profile Photo</span>
            </div>
            <div className="space-y-4">
              <HBInput name="name" label="Full Name" icon={<Icons.userCheck className="w-4 h-4" />} />
              <HBInput name="email" label="Email Address" type="email" icon={<Icons.mail className="w-4 h-4" />} />
              <HBInput name="password" label="Password" type="password" icon={<Icons.lock className="w-4 h-4" />} />
              <HBInput name="phone" label="Contact Number" icon={<Icons.phone className="w-4 h-4" />} />
            </div>
            <Button
              type="submit"
              disabled={isCreating}
              className="w-full h-14 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black uppercase tracking-widest transition-all"
            >
              {isCreating ? <Icons.loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Creation'}
            </Button>
          </HBForm>
        </HBModal>
      </div>

      <HBTable
        columns={columns}
        data={admins}
        isLoading={isLoading}
        emptyMessage="No administrators found in the system."
      />

      {selectedAdmin && (
        <HBModal
          title="Edit Administrator"
          description="Update details for this administrator account."
          open={isEditModalOpen}
          onOpenChange={handleEditOpenChange}
          className="sm:max-w-[500px]"
        >
          <HBForm
            onSubmit={onEditSubmit}
            className="space-y-6 pt-4"
            defaultValues={{
              name: selectedAdmin.name,
              phone: selectedAdmin.phone,
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden transition-all hover:border-teal-500 group cursor-pointer">
                {editPreview || selectedAdmin.avatar ? (
                  <img src={editPreview || selectedAdmin.avatar} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Icons.user className="w-8 h-8 text-slate-400 group-hover:text-teal-500" />
                )}
                <input type="file" accept="image/*" onChange={handleEditImage} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Profile Photo</span>
            </div>
            <div className="space-y-4">
              <HBInput name="name" label="Full Name" icon={<Icons.userCheck className="w-4 h-4" />} />
              <HBInput name="phone" label="Contact Number" icon={<Icons.phone className="w-4 h-4" />} />
            </div>
            <Button
              type="submit"
              disabled={isUpdatingAdmin}
              className="w-full h-14 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black uppercase tracking-widest transition-all"
            >
              {isUpdatingAdmin ? <Icons.loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
            </Button>
          </HBForm>
        </HBModal>
      )}
    </div>
  );
};

export default AdminManagement;
