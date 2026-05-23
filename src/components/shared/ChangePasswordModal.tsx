'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { HBForm } from '@/components/form/HBForm';
import { HBInput } from '@/components/form/HBInput';
import { Button } from '@/components/ui/button';
import { HBModal } from '@/components/shared/HBModal';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { useChangePasswordMutation } from '@/redux/features/auth/authApi';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'Old password is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

export const ChangePasswordModal = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [isOpen, setIsOpen] = React.useState(false);

  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }).unwrap();

      if (res?.success) {
        toast.success('Password changed successfully!');
        setIsOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to change password');
    }
  };

  return (
    <HBModal
      title="Change Password"
      description="Update your account password for enhanced security."
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm shadow-sm transition-all flex items-center gap-2 group">
          <Icons.lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Change Password
        </Button>
      }
    >
      <HBForm
        onSubmit={onSubmit}
        resolver={zodResolver(changePasswordSchema)}
        className="space-y-6"
      >
        <div className="space-y-4">
          <HBInput
            name="oldPassword"
            label="Old Password"
            type="password"
            icon={<Icons.lock className="w-4 h-4" />}
          />
          <HBInput
            name="newPassword"
            label="New Password"
            type="password"
            icon={<Icons.lock className="w-4 h-4" />}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? <Icons.loader2 className="w-4 h-4 animate-spin" /> : <Icons.check className="w-4 h-4" />}
          Update Password
        </Button>
      </HBForm>
    </HBModal>
  );
};
