'use client';

import * as React from "react";
import { HBModal } from "@/components/shared/HBModal";
import { HBForm } from "@/components/form/HBForm";
import { HBSelect } from "@/components/form/HBSelect";
import { Icons } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AssignScheduleModalProps {
  trigger: React.ReactNode;
  scheduleId?: string;
}

const AssignScheduleModal = ({ trigger, scheduleId }: AssignScheduleModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Mock doctors data
  const doctors = [
    { key: '1', label: "Dr. Charles Scott (Neurology)" },
    { key: '2', label: "Dr. Michael Brown (Psychiatry)" },
    { key: '3', label: "Dr. Sarah Johnson (Cardiology)" },
    { key: '4', label: "Dr. Emily Davis (Dermatology)" },
  ];

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Assigning Schedule:", { ...data, scheduleId });
      toast.success("Doctor assigned to schedule successfully!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to assign doctor. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HBModal
      open={open}
      onOpenChange={setOpen}
      title="Assign Doctor to Schedule"
      description="Select a medical expert to assign to this specific time slot."
      trigger={trigger}
    >
      <HBForm onSubmit={onSubmit} defaultValues={{ scheduleId }}>
        <div className="space-y-6">
          <HBSelect
            label="Select Doctor"
            name="doctorId"
            placeholder="Choose a doctor..."
            options={doctors}
            required
          />

          <div className="p-6 rounded-2xl bg-teal-500/5 border border-dashed border-teal-500/20 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-teal-500 mb-3 shadow-md">
              <Icons.userCheck className="w-6 h-6" />
            </div>
            <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest italic">
              Assignment Confirmation
            </p>
            <p className="text-[10px] font-medium text-slate-500 mt-1">Once assigned, the doctor will be able to manage this slot in their dashboard.</p>
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="h-14 px-10 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all flex-1"
          >
            {isLoading ? (
              <Icons.loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Confirm Assignment"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="h-14 px-10 rounded-2xl border-slate-200 dark:border-slate-800 font-black text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex-1"
          >
            Cancel
          </Button>
        </div>
      </HBForm>
    </HBModal>
  );
};

export { AssignScheduleModal };
