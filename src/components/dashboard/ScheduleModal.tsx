'use client';

import * as React from "react";
import { HBModal } from "@/components/shared/HBModal";
import { HBForm } from "@/components/shared/HBForm";
import { HBInput } from "@/components/shared/HBInput";
import { Icons } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ScheduleModalProps {
  trigger: React.ReactNode;
}

const ScheduleModal = ({ trigger }: ScheduleModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Creating Schedule Slot:", data);
      toast.success("Time slot created successfully!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to create time slot. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HBModal
      open={open}
      onOpenChange={setOpen}
      title="Create Global Time Slot"
      description="Define a new availability period that can be assigned to medical experts."
      trigger={trigger}
    >
      <HBForm onSubmit={onSubmit}>
        <div className="space-y-6">
          <HBInput
            label="Start Date & Time"
            name="startDateTime"
            type="datetime-local"
            icon={<Icons.calendarClock className="w-4 h-4" />}
            required
          />
          
          <HBInput
            label="End Date & Time"
            name="endDateTime"
            type="datetime-local"
            icon={<Icons.calendarClock className="w-4 h-4" />}
            required
          />

          <div className="p-6 rounded-2xl bg-teal-500/5 border border-dashed border-teal-500/20 flex items-center gap-4">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-teal-500 shadow-md">
              <Icons.activity className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest italic">Slot Preview</p>
              <p className="text-[10px] font-medium text-slate-500 mt-1">This slot will be available for assignment to all doctors globally.</p>
            </div>
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
              "Create Time Slot"
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

export { ScheduleModal };
