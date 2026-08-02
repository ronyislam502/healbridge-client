"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Icons } from "@/components/shared/Icons";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { isSameDay } from "date-fns";
import { toast } from "sonner";
import { useCreateAppointmentMutation } from "@/redux/features/appointment/appointmentApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface DoctorSchedulesProps {
  doctorSchedules: any[];
  appointmentFee: number;
  doctorId: string;
  doctorName: string;
}

const DoctorSchedules = ({ doctorSchedules, appointmentFee, doctorId, doctorName }: DoctorSchedulesProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [createAppointment, { isLoading: isBooking }] = useCreateAppointmentMutation();

  // Filter schedules for the selected date
  const availableSchedules = doctorSchedules?.filter((docSchedule: any) => {
    if (!date) return false;
    const scheduleDate = new Date(docSchedule.schedule.startDateTime);
    return isSameDay(scheduleDate, date);
  }) || [];

  const selectedSchedule = availableSchedules.find((s: any) => s.scheduleId === selectedSlotId);

  const startTime = selectedSchedule
    ? new Date(selectedSchedule.schedule.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    : "";
  const endTime = selectedSchedule
    ? new Date(selectedSchedule.schedule.endDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    : "";
  const scheduleDateFormatted = date
    ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : "";

  const handleBookAppointment = async () => {
    if (!selectedSlotId || !doctorId) return;

    try {
      const res = await createAppointment({
        doctorId,
        scheduleId: selectedSlotId,
      }).unwrap();

      if (res?.success && res?.data?.paymentUrl) {
        toast.success("Appointment created successfully! Redirecting to secure payment page...", {
          duration: 3000,
        });
        setIsConfirmOpen(false);
        // Redirect to Stripe checkout URL
        window.location.href = res.data.paymentUrl;
      } else {
        toast.error("Failed to generate payment session. Please try again.");
      }
    } catch (err: any) {
      toast.error(
        err?.data?.message ||
        "Failed to book appointment. Please verify you are logged in as a patient."
      );
    } 
  };

  return (
    <div className="space-y-6">
      <Card className="sticky top-24 overflow-hidden border-none shadow-2xl rounded-[2.5rem] bg-slate-900 text-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-black uppercase tracking-wider italic">
              Book Visit
            </CardTitle>
            <div className="bg-teal-500 p-2 rounded-xl">
              <Icons.calendar className="w-5 h-5 text-white" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Calendar Section */}
          <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                if (newDate) {
                  setDate(newDate);
                  setSelectedSlotId(null);
                }
              }}
              month={month}
              onMonthChange={setMonth}
              className="w-full"
            />
          </div>

          {/* Time Slots Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 px-1">
              Available Slots
            </h4>
            {availableSchedules.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {availableSchedules.map((docSchedule: any) => {
                  const time = new Date(docSchedule.schedule.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                  const isBooked = docSchedule.isBooked;
                  const isSelected = selectedSlotId === docSchedule.scheduleId;

                  return (
                    <button
                      key={docSchedule.scheduleId}
                      disabled={isBooked}
                      onClick={() => setSelectedSlotId(docSchedule.scheduleId)}
                      className={cn(
                        "py-3 px-2 rounded-xl text-sm font-bold transition-all border",
                        isBooked
                          ? "bg-slate-800/30 border-slate-800 text-slate-600 cursor-not-allowed line-through"
                          : isSelected
                            ? "bg-teal-500 border-teal-500 text-slate-900 shadow-lg shadow-teal-500/20 scale-95"
                            : "bg-slate-800 border-slate-700 text-slate-300 hover:border-teal-500/50 hover:bg-slate-700"
                      )}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 px-4 rounded-2xl bg-slate-800/30 border border-dashed border-slate-700 text-center">
                <p className="text-slate-500 text-sm font-medium italic">
                  No slots available for this date.
                </p>
              </div>
            )}
          </div>

          {/* Pricing & Confirmation */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Consultation Fee</span>
              <span className="text-2xl font-black text-teal-400">${appointmentFee}</span>
            </div>

            <Button
              disabled={!selectedSlotId}
              onClick={() => setIsConfirmOpen(true)}
              className="w-full h-14 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-900 font-black text-lg rounded-2xl shadow-lg shadow-teal-500/20 transition-all active:scale-95"
            >
              {selectedSlotId ? "Confirm Appointment" : "Select a Time Slot"}
            </Button>

            <p className="text-center text-xs text-slate-500 font-medium">
              Instant confirmation upon selection.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Info Card */}
      <div className="bg-linear-to-r from-teal-500 to-blue-600 rounded-[2rem] p-6 text-white shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
            <Icons.clock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-lg">Quick Note</h4>
            <p className="text-teal-50/80 text-sm">Arrive 10 mins early</p>
          </div>
        </div>
        <div className="h-px bg-white/20 my-4" />
        <p className="text-sm text-teal-50/90 italic">
          "We prioritize patient comfort and efficient scheduling."
        </p>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="max-w-112.5 bg-slate-950 border-slate-800 text-white rounded-[2rem] overflow-hidden p-6 shadow-2xl">
          <DialogHeader className="space-y-3">
            <div className="mx-auto w-12 h-12 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-400">
              <Icons.userCheck className="w-6 h-6" />
            </div>
            <DialogTitle className="text-center text-2xl font-black italic tracking-wide uppercase">
              Confirm <span className="text-teal-400">Appointment</span>
            </DialogTitle>
            <DialogDescription className="text-center text-slate-400 text-sm font-medium">
              Review your appointment details carefully before proceeding to payment.
            </DialogDescription>
          </DialogHeader>

          {/* Details Summary Card */}
          <div className="my-6 p-5 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Doctor</span>
              <span className="text-sm font-extrabold text-white text-right italic">{doctorName}</span>
            </div>

            <div className="h-px bg-slate-800/50" />

            <div className="flex justify-between items-start">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Date</span>
              <span className="text-sm font-bold text-teal-400 text-right">{scheduleDateFormatted}</span>
            </div>

            <div className="h-px bg-slate-800/50" />

            <div className="flex justify-between items-start">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Time Slot</span>
              <span className="flex items-center text-sm font-bold text-white text-right"><Icons.clock className="w-4 h-4 mr-1.5 text-teal-500" />{startTime} - {endTime}</span>
            </div>

            <div className="h-px bg-slate-800/50" />

            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Consultation Fee</span>
              <span className="text-xl font-black text-teal-400">${appointmentFee}</span>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button
              variant="ghost"
              disabled={isBooking}
              onClick={() => setIsConfirmOpen(false)}
              className="flex-1 h-12 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border-none font-bold"
            >
              Cancel
            </Button>
            <Button
              disabled={isBooking}
              onClick={handleBookAppointment}
              className="flex-1 h-12 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black tracking-wide uppercase transition-all shadow-lg shadow-teal-500/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isBooking ? (
                <>
                  <Icons.loader2 className="h-8 w-8 animate-spin text-teal-500" />
                  Booking...
                </>
              ) : (
                <>
                  <Icons.creditCard className="w-4 h-4" />
                  Pay & Confirm
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorSchedules;
