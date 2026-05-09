"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { isSameDay } from "date-fns";

interface DoctorSchedulesProps {
  doctorSchedules: any[];
  appointmentFee: number;
}

const DoctorSchedules = ({ doctorSchedules, appointmentFee }: DoctorSchedulesProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  // Filter schedules for the selected date
  const availableSchedules = doctorSchedules?.filter((docSchedule: any) => {
    if (!date) return false;
    const scheduleDate = new Date(docSchedule.schedule.startDateTime);
    return isSameDay(scheduleDate, date);
  }) || [];

  return (
    <div className="space-y-6">
      <Card className="sticky top-24 overflow-hidden border-none shadow-2xl rounded-[2.5rem] bg-slate-900 text-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-black uppercase tracking-wider italic">
              Book Visit
            </CardTitle>
            <div className="bg-teal-500 p-2 rounded-xl">
              <CalendarDays className="w-6 h-6 text-white" />
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
                  const startTime = new Date(docSchedule.schedule.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
                      {startTime}
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
      <div className=" from-teal-500 to-blue-600 rounded-[2rem] p-6 text-white shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
            <Clock className="w-6 h-6" />
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
    </div>
  );
};

export default DoctorSchedules;
