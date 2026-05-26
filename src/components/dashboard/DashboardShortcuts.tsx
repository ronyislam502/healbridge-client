'use client';

import * as React from 'react';
import Link from 'next/link';
import { Icons } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';

interface ShortcutItem {
  title: string;
  description: string;
  link: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
  color: string;
  hoverBg: string;
}

const shortcuts: ShortcutItem[] = [
  {
    title: 'Verify Doctors',
    description: 'Verify certificates & manage specialty slots.',
    link: '/admin/doctors',
    icon: Icons.userCheck,
    color: 'from-blue-500 to-indigo-600',
    hoverBg: 'hover:border-blue-500/50 dark:hover:border-blue-500/40',
  },
  {
    title: 'Patient Directory',
    description: 'Access records, profiles, and health parameters.',
    link: '/admin/patients',
    icon: Icons.users,
    color: 'from-teal-400 to-emerald-600',
    hoverBg: 'hover:border-teal-500/50 dark:hover:border-teal-500/40',
  },
  {
    title: 'Admins & Staff',
    description: 'Add or modify administrative system access.',
    link: '/admin/admins',
    icon: Icons.shieldCheck,
    color: 'from-amber-500 to-orange-600',
    hoverBg: 'hover:border-amber-500/50 dark:hover:border-amber-500/40',
  },
  {
    title: 'Medical Specialties',
    description: 'Configure and add custom care categories.',
    link: '/admin/specialties',
    icon: Icons.hospital,
    color: 'from-purple-500 to-pink-600',
    hoverBg: 'hover:border-purple-500/50 dark:hover:border-purple-500/40',
  },
  {
    title: 'Time Schedules',
    description: 'Build weekly booking slots for doctor availability.',
    link: '/admin/schedules',
    icon: Icons.calendarClock,
    color: 'from-violet-500 to-fuchsia-600',
    hoverBg: 'hover:border-violet-500/50 dark:hover:border-violet-500/40',
  },
  {
    title: 'Financial Ledger',
    description: 'Audit patient payments and platform commission.',
    link: '/admin/payments',
    icon: Icons.dollarSign,
    color: 'from-emerald-400 to-teal-600',
    hoverBg: 'hover:border-emerald-500/50 dark:hover:border-emerald-500/40',
  },
  {
    title: 'Health Blogs',
    description: 'Publish research reviews and community advice.',
    link: '/admin/blogs',
    icon: Icons.scrollText,
    color: 'from-rose-500 to-red-600',
    hoverBg: 'hover:border-rose-500/50 dark:hover:border-rose-500/40',
  },
  {
    title: 'System Settings',
    description: 'Tune thresholds, integrations, and server properties.',
    link: '/admin/settings',
    icon: Icons.settings,
    color: 'from-slate-500 to-slate-700',
    hoverBg: 'hover:border-slate-500/50 dark:hover:border-slate-500/40',
  },
];

const DashboardShortcuts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
      {shortcuts.map((shortcut, idx) => {
        const Icon = shortcut.icon;
        return (
          <Link
            key={idx}
            href={shortcut.link}
            className={cn(
              "p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-[180px] group",
              shortcut.hoverBg
            )}
          >
            <div className="flex justify-between items-start">
              <div className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3", shortcut.color)}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-slate-300 dark:text-slate-700 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transform translate-x-0 translate-y-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-black text-slate-900 dark:text-white italic uppercase tracking-wider group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">
                {shortcut.title}
              </h4>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium leading-relaxed">
                {shortcut.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export { DashboardShortcuts };
