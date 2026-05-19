'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useGetAIDoctorSuggestionMutation } from '@/redux/features/doctor/doctorApi';
import { HBForm } from '@/components/shared/HBForm';
import { HBTextarea } from '@/components/shared/HBTextarea';
import { FieldValues } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';

export const AIDoctorSuggestion = () => {
  const [getAIDoctorSuggestion, { isLoading }] = useGetAIDoctorSuggestionMutation();
  const [suggestedDoctors, setSuggestedDoctors] = React.useState<any[] | null>(null);
  const [hasSearched, setHasSearched] = React.useState(false);

  const onSubmit = async (values: FieldValues) => {
    const symptomText = values.symptoms;
    if (!symptomText || !symptomText.trim()) {
      toast.error('Please describe your symptoms first.');
      return;
    }

    try {
      setHasSearched(true);
      const res = await getAIDoctorSuggestion({ symptoms: symptomText }).unwrap();
      if (res?.success) {
        setSuggestedDoctors(res.data || []);
        if (!res.data || res.data.length === 0) {
          toast.info('AI matched a specialty but couldn\'t find active doctors for that specialty online right now.');
        } else {
          toast.success('AI Diagnostics complete! Suggestions loaded.');
        }
      } else {
        toast.error('AI failed to compile diagnostics.');
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Error occurred during AI diagnostic request.');
    }
  };

  const handleClear = () => {
    setSuggestedDoctors(null);
    setHasSearched(false);
  };

  return (
    <Card className="rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-6 lg:p-10 relative overflow-hidden group bg-white dark:bg-slate-900">
      {/* Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-500/20 transition-all duration-700"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-teal-500/20 transition-all duration-700"></div>

      <CardHeader className="relative z-10 flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6 px-0">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/25">
            <Icons.brain className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic font-sans">
              AI Health <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">Consultant</span>
            </CardTitle>
            <CardDescription className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mt-1">
              Next-gen symptom analysis & doctor matching
            </CardDescription>
          </div>
        </div>
        {hasSearched && (
          <button
            onClick={handleClear}
            className="text-xs font-black text-slate-400 dark:text-slate-500 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Icons.close className="w-4 h-4" /> Reset AI
          </button>
        )}
      </CardHeader>

      <CardContent className="relative z-10 px-0 pt-8 pb-0">
        {/* Diagnostic Form using HBForm & HBTextarea */}
        {!hasSearched && (
          <HBForm onSubmit={onSubmit} className="space-y-6">
            <HBTextarea
              name="symptoms"
              label="Describe Your Symptoms & Medical State"
              placeholder="e.g. I have been suffering from a mild dry cough, persistent headache behind the eyes, and slight fever for the past 3 days..."
              icon={<Icons.activity className="w-5 h-5 mt-1" />}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 rounded-[2rem] bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 text-white font-black uppercase tracking-widest shadow-xl shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group text-xs"
            >
              <Icons.heartPulse className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
              Analyze Symptoms with AI
            </Button>
          </HBForm>
        )}

        {/* AI Loading State with Shadcn Skeletons */}
        {isLoading && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-xl animate-ping duration-1000"></div>
              <Skeleton className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-2xl">
                <Icons.loader2 className="w-10 h-10 animate-spin" />
              </Skeleton>
            </div>
            <div className="space-y-4 w-full max-w-md mx-auto">
              <p className="text-lg font-black text-slate-900 dark:text-white italic animate-pulse">
                AI is compiling diagnostics...
              </p>
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4 mx-auto rounded-full" />
                <Skeleton className="h-4 w-1/2 mx-auto rounded-full" />
              </div>
            </div>
          </div>
        )}

        {/* Diagnostic Results */}
        {hasSearched && !isLoading && suggestedDoctors && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div>
              <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest italic mb-2">
                AI Recommendation Report
              </p>
              <h4 className="text-xl font-black text-slate-900 dark:text-white italic tracking-tight uppercase">
                Matching Specialty Found:{' '}
                <span className="text-teal-500">
                  {suggestedDoctors[0]?.doctorSpecialties?.[0]?.specialties?.title || 'General Medicine'}
                </span>
              </h4>
            </div>

            {suggestedDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {suggestedDoctors.map((doctor, idx) => (
                  <Card
                    key={idx}
                    className="group/card relative p-6 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-purple-500/30 hover:bg-white dark:hover:bg-slate-900 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="flex gap-4">
                      {/* Avatar */}
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-inner flex-shrink-0 border border-slate-200 bg-white">
                        {doctor.avatar ? (
                          <Image
                            src={doctor.avatar}
                            alt={doctor.name}
                            fill
                            className="object-cover group-hover/card:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                            <Icons.user className="w-8 h-8" />
                          </div>
                        )}
                      </div>

                      {/* Professional Info */}
                      <div className="space-y-1">
                        <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight group-hover/card:text-purple-600 transition-colors">
                          {doctor.name}
                        </p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                          {doctor.designation}
                        </p>
                        <p className="text-[10px] font-bold text-slate-500 line-clamp-1">
                          {doctor.qualification} • {doctor.currentWorkingPlace}
                        </p>
                      </div>
                    </div>

                    {/* Stats & Booking */}
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase">Consult Fee</p>
                        <p className="text-base font-black text-teal-500 italic">${doctor.appointmentFee}</p>
                      </div>
                      <Link
                        href={`/doctors/${doctor.id}`}
                        className="h-10 px-6 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest shadow-md hover:shadow-xl transition-all flex items-center gap-2 group/btn cursor-pointer"
                      >
                        Book Appointment
                        <Icons.chevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 bg-slate-50 dark:bg-slate-800/20 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800">
                <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-lg">
                  <Icons.folderOpen className="w-6 h-6 text-slate-300" />
                </div>
                <div>
                  <p className="text-base font-black text-slate-900 dark:text-white italic">No Direct Matches</p>
                  <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto mt-1">
                    AI matched symptoms, but no registered doctors of that specialty are active. Try listing all specialists.
                  </p>
                </div>
                <Link
                  href="/doctors"
                  className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest hover:bg-teal-500 transition-colors inline-block"
                >
                  View All Doctors
                </Link>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
