'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAllAdminsQuery, useCreateAdminMutation } from '@/redux/features/user/userApi';
import { HBTable } from '@/components/shared/HBTable';
import { HBModal } from '@/components/shared/HBModal';
import { HBForm } from '@/components/form/HBForm';
import { HBInput } from '@/components/form/HBInput';
import { toast } from 'sonner';
import { FieldValues } from 'react-hook-form';

const AdminManagement = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { data, isLoading } = useAllAdminsQuery({ limit: 10 });
  const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation();

  const admins = data?.data || [];

  const onSubmit = async (values: FieldValues) => {
    try {
      const formData = new FormData();
      const { profilePhoto, password, ...adminData } = values;

      formData.append('data', JSON.stringify(adminData));
      formData.append('password', password);

      if (profilePhoto && profilePhoto[0]) {
        formData.append('image', profilePhoto[0]);
      }

      const res = await createAdmin(formData).unwrap();
      if (res?.success) {
        toast.success('Administrator created successfully!');
        setIsModalOpen(false);
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
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
            <Icons.shieldCheck className="w-5 h-5" />
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
      render: () => (
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-teal-500/10 hover:text-teal-500">
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
          onOpenChange={setIsModalOpen}
          className="sm:max-w-[500px]"
          trigger={
            <Button className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-sm shadow-xl transition-all flex items-center gap-2 group">
              <Icons.userPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Add Administrator
            </Button>
          }
        >
          <HBForm onSubmit={onSubmit} className="space-y-6">
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
    </div>
  );
};

export default AdminManagement;
