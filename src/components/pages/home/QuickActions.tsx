import React from 'react';
import { Icons } from '@/components/shared/Icons';

const actions = [
  {
    title: 'Book Appointment',
    icon: Icons.calendar,
    bgColor: 'bg-[#7c3aed]', // violet-600
    href: '#'
  },
  {
    title: 'Talk to Doctors',
    icon: Icons.users,
    bgColor: 'bg-[#1877f2]', // blue
    href: '#'
  },
  {
    title: 'Hospitals & Clinics',
    icon: Icons.hospital,
    bgColor: 'bg-[#e11d48]', // rose-600 / pink
    href: '#'
  },
  {
    title: 'Healthcare',
    icon: Icons.heartPulse,
    bgColor: 'bg-[#0ea5e9]', // sky-500
    href: '#'
  },
  {
    title: 'Medicine & Supplies',
    icon: Icons.pill,
    bgColor: 'bg-[#6366f1]', // indigo-500
    href: '#'
  },
  {
    title: 'Lab Testing',
    icon: Icons.microscope,
    bgColor: 'bg-[#ea580c]', // orange-600
    href: '#'
  },
  {
    title: 'Home Care',
    icon: Icons.home,
    bgColor: 'bg-[#0d9488]', // teal-600
    href: '#'
  }
];

const QuickActions = () => {
  return (
    <section className="w-full bg-white py-10 border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-6 md:gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <a 
                key={index} 
                href={action.href}
                className="flex flex-col items-center gap-3 min-w-[100px] group transition-transform hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white ${action.bgColor} shadow-md group-hover:shadow-lg transition-all`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs sm:text-[13px] font-medium text-slate-700 text-center whitespace-nowrap">
                  {action.title}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
