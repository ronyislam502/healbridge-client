'use client';

import { Icons } from '@/components/shared/Icons';

const steps = [
  {
    title: 'Find Expert Doctor',
    description: 'Browse through our extensive list of verified specialists and choose the one that fits your needs.',
    icon: Icons.search,
    color: 'bg-blue-600',
  },
  {
    title: 'Book Appointment',
    description: 'Select a convenient time slot from the doctor\'s live schedule and confirm your booking instantly.',
    icon: Icons.calendar,
    color: 'bg-teal-600',
  },
  {
    title: 'Get Consultation',
    description: 'Connect with your doctor via secure video call or visit their clinic for professional care.',
    icon: Icons.activity,
    color: 'bg-rose-600',
  },
];

const Process = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
            How It Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            HealBridge simplifies your healthcare journey in three easy steps. No more waiting on hold or complicated paperwork.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />

          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center relative z-10 group">
              <div className="w-24 h-24 rounded-3xl bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-300 border border-slate-100 dark:border-slate-800">
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center shadow-lg`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {step.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                {step.description}
              </p>

              <div className="mt-6 w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                {idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
