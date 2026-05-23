'use client';

import * as React from "react";
import { HBModal } from "@/components/shared/HBModal";
import { HBForm } from "@/components/form/HBForm";
import { HBInput } from "@/components/form/HBInput";
import { Icons } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreateScheduleMutation } from "@/redux/features/schedule/scheduleApi";

interface ScheduleModalProps {
  trigger: React.ReactNode;
}

const ScheduleModal = ({ trigger }: ScheduleModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [createSchedule, { isLoading }] = useCreateScheduleMutation();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const onSubmit = async (data: any) => {

    try {
      const res = await createSchedule(data).unwrap();
      if (res?.success) {
        toast.success("Bulk schedules created successfully!");
        setOpen(false);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create schedules. Please try again.");
    }
  };

  return (
    <HBModal
      open={open}
      onOpenChange={setOpen}
      title="Generate Global Schedules"
      description="Define a date range and daily time window to automatically generate medical slots."
      trigger={trigger}
    >
      <HBForm onSubmit={onSubmit}>
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HBInput
              label="Start Date"
              name="startDate"
              type="date"
              icon={<Icons.calendar className="w-4 h-4 text-teal-500" />}
              required
            />
            <HBInput
              label="End Date"
              name="endDate"
              type="date"
              icon={<Icons.calendar className="w-4 h-4 text-teal-500" />}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HBInput
              label="Daily Start Time"
              name="startTime"
              type="time"
              icon={<Icons.activity className="w-4 h-4 text-blue-500" />}
              required
            />
            <HBInput
              label="Daily End Time"
              name="endTime"
              type="time"
              icon={<Icons.activity className="w-4 h-4 text-blue-500" />}
              required
            />
          </div>

          <div className="p-4 rounded-[1.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Icons.calendarClock className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-400 italic">Bulk Generation Logic</p>
                <p className="text-xs font-medium text-slate-300 mt-1">This will create <span className="text-white font-black">30-minute slots</span> for every day in the selected range.</p>
              </div>
            </div>
            <Icons.activity className="absolute -bottom-6 -right-6 w-24 h-24 text-white/5 rotate-12" />
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="h-14 px-10 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all flex-1 group"
          >
            {isLoading ? (
              <Icons.loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span className="flex items-center gap-3">
                Generate Schedules
                <Icons.plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              </span>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="h-14 px-10 rounded-2xl border-slate-200 dark:border-slate-800 font-black text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex-1"
          >
            Discard
          </Button>
        </div>
      </HBForm>

    </HBModal>
  );
};

export { ScheduleModal };

