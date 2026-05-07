'use client';

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/shared/Icons";
import { cn } from "@/lib/utils";
import Image from "next/image";

const menuItems = [
  { label: 'Dashboard', href: '/admin', icon: Icons.activity },
  { label: 'Appointments', href: '/admin/appointments', icon: Icons.calendar },
  { label: 'Doctors', href: '/admin/doctors', icon: Icons.userCheck },
  { label: 'Patients', href: '/admin/patients', icon: Icons.users },
  { label: 'Specialties', href: '/admin/specialties', icon: Icons.microscope },
  { label: 'Reviews', href: '/admin/reviews', icon: Icons.star },
  { label: 'Settings', href: '/admin/settings', icon: Icons.shieldCheck },
];

const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-80 h-screen bg-slate-900 border-r border-slate-800 flex flex-col sticky top-0">
      {/* Brand Logo */}
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 group">
          <Image 
            src="https://res.cloudinary.com/dkk9lvbtf/image/upload/v1778161565/1778077513978_solqyp.png"
            alt='HealBridge logo' 
            width={150} 
            height={120} 
            className="h-auto w-auto rounded-lg"
            />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all duration-300 group",
                isActive
                  ? "bg-teal-500 text-white shadow-xl shadow-teal-500/10"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform group-hover:scale-110",
                isActive ? "text-white" : "text-slate-500"
              )} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile / Logout */}
      <div className="p-6 border-t border-slate-800">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50">
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
            <Icons.userCheck className="w-6 h-6 text-teal-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-black text-white truncate italic">Admin User</p>
            <p className="text-[10px] font-bold text-teal-500 uppercase tracking-widest">System Admin</p>
          </div>
          <button className="text-slate-500 hover:text-red-400 transition-colors">
             <Icons.share2 className="w-5 h-5 rotate-90" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export { DashboardSidebar };
