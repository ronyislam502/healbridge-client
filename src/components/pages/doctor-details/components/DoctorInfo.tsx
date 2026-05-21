"use client"

import { TDoctor } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/shared/Icons";
import { cn } from "@/lib/utils";

interface DoctorInfoProps {
  doctor: TDoctor;
}

const DoctorInfo = ({ doctor }: DoctorInfoProps) => {
  return (
    <div className="lg:col-span-2 space-y-8">
      {/* Main Profile Card */}
      <div className="overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800">
        <div className="relative h-40 bg-teal-600/10 dark:bg-teal-900/20">
          <div className="absolute inset-0 from-teal-500/20 to-blue-500/20 animate-pulse" />
        </div>
        <div className="px-8 pb-8">
          <div className="relative flex flex-col md:flex-row gap-6 -mt-16">
            <Avatar className="h-32 w-32 border-4 border-white dark:border-slate-800 shadow-xl rounded-2xl overflow-hidden">
              <AvatarImage src={doctor.avatar} alt={doctor.name} className="object-cover" />
              <AvatarFallback className="text-3xl font-bold bg-teal-100 text-teal-700">
                {doctor.name?.[0] || "D"}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 mt-16 md:mt-20">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {doctor.name}
                </h1>
                <div className="flex items-center bg-yellow-400/10 text-yellow-600 px-3 py-1 rounded-full text-sm font-bold border border-yellow-400/20">
                  <Icons.star className="w-4 h-4 mr-1 fill-yellow-400" />
                  4.9 (120+ Reviews)
                </div>
              </div>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium mt-1">
                {doctor.designation} • {doctor.qualification}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center text-slate-500 dark:text-slate-500 text-sm font-medium">
                  <Icons.mapPin className="w-4 h-4 mr-1.5 text-teal-500" />
                  {doctor.address}
                </div>
                <div className="flex items-center text-slate-500 dark:text-slate-500 text-sm font-medium">
                  <Icons.hospital className="w-4 h-4 mr-1.5 text-teal-500" />
                  {doctor.currentWorkingPlace}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <HighlightCard 
          icon={<Icons.award className="w-5 h-5 text-teal-600" />}
          label="Experience"
          value={`${doctor.experience} Years`}
          color="bg-teal-50 dark:bg-teal-900/10"
        />
        <HighlightCard 
          icon={<Icons.creditCard className="w-5 h-5 text-emerald-600" />}
          label="Consultation"
          value={`$${doctor.appointmentFee}`}
          color="bg-emerald-50 dark:bg-emerald-900/10"
        />
        <HighlightCard 
          icon={<Icons.shieldCheck className="w-5 h-5 text-blue-600" />}
          label="Registration"
          value={doctor.registrationNumber}
          color="bg-blue-50 dark:bg-blue-900/10"
        />
        <HighlightCard 
          icon={<Icons.stethoscope className="w-5 h-5 text-purple-600" />}
          label="Gender"
          value={doctor.gender}
          color="bg-purple-50 dark:bg-purple-900/10"
        />
      </div>

      {/* Specialties & About */}
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Icons.graduationCap className="w-6 h-6 text-teal-500" />
            Specialties
          </h3>
          <div className="flex flex-wrap gap-2">
            {doctor.doctorSpecialties?.map((docSpecialty: any) => (
              <span 
                key={docSpecialty.specialtiesId}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-teal-500 transition-colors"
              >
                {docSpecialty.specialties?.title}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About Doctor</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Dr. {doctor.name} is a highly skilled {doctor.designation} with over {doctor.experience} years of experience in {doctor.qualification}. 
            Currently working at {doctor.currentWorkingPlace}, they are dedicated to providing the highest quality of care to patients.
            Their expertise covers a wide range of medical conditions, ensuring comprehensive treatment and personalized health plans.
          </p>
        </section>
      </div>
    </div>
  );
};

const HighlightCard = ({ icon, label, value, color }: { icon: any, label: string, value: string | number, color: string }) => (
  <div className={cn("p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm", color)}>
    <div className="mb-2">{icon}</div>
    <p className="text-xs text-slate-500 dark:text-slate-500 font-bold uppercase tracking-wider">{label}</p>
    <p className="text-lg font-black text-slate-900 dark:text-white leading-tight mt-0.5">{value}</p>
  </div>
);

export default DoctorInfo;
