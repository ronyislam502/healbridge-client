'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAllUsersQuery, useUpdateUserStatusMutation } from '@/redux/features/user/userApi';
import { HBTable } from '@/components/shared/HBTable';
import { HBPagination } from '@/components/shared/HBPagination';
import { toast } from 'sonner';

const UserManagement = () => {
  const [page, setPage] = React.useState(1);
  const limit = 10;

  const { data, isLoading } = useAllUsersQuery({ page, limit });
  const [updateStatus, { isLoading: isUpdating }] = useUpdateUserStatusMutation();
  const users = data?.data || [];
  console.log("users", users)
  const meta = data?.meta;

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
      const res = await updateStatus({ id, status: newStatus }).unwrap();
      if (res?.success) {
        toast.success(`Account ${newStatus.toLowerCase()} successfully!`);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update account status');
    }
  };

  const columns = [
    {
      header: 'User Account',
      key: 'email',
      render: (row: any) => (
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center text-white",
            row.role === 'ADMIN' || row.role === 'SUPER_ADMIN' ? 'bg-slate-900' :
              row.role === 'DOCTOR' ? 'bg-teal-500' : 'bg-blue-500'
          )}>
            <Icons.users className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white italic">{row.name || 'HealBridge User'}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Role',
      key: 'role',
      render: (row: any) => (
        <span className={cn(
          "px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest italic",
          row.role === 'SUPER_ADMIN' ? 'bg-purple-500/10 text-purple-500' :
            row.role === 'ADMIN' ? 'bg-slate-500/10 text-slate-500' :
              row.role === 'DOCTOR' ? 'bg-teal-500/10 text-teal-500' : 'bg-blue-500/10 text-blue-500'
        )}>
          {row.role}
        </span>
      )
    },
    {
      header: 'Account Status',
      key: 'status',
      align: 'center' as const,
      render: (row: any) => (
        <span className={cn(
          "px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest italic",
          row.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
        )}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Registered',
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
            variant="outline"
            size="sm"
            className={cn(
              "h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest italic transition-all",
              row.status === 'ACTIVE' ? "hover:bg-red-500 hover:text-white border-red-500/20" : "hover:bg-emerald-500 hover:text-white border-emerald-500/20"
            )}
            onClick={() => handleToggleStatus(row.id, row.status)}
            disabled={isUpdating}
          >
            {row.status === 'ACTIVE' ? 'Block Account' : 'Activate Account'}
          </Button>
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-slate-900 hover:text-white">
            <Icons.edit className="w-4 h-4" />
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
            System <span className="text-teal-500">Users</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Monitor and manage all user accounts registered on the HealBridge platform.</p>
        </div>
      </div>

      <div className="space-y-8">
        <HBTable
          columns={columns}
          data={users}
          isLoading={isLoading}
          emptyMessage="No users found in the system record."
        />

        {meta && meta.totalPages > 1 && (
          <div className="flex justify-center pt-4">
            <HBPagination
              totalPages={meta.totalPages}
              page={page}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
