'use client';


import Link from "next/link";
import { usePathname } from "next/navigation";
import UserDropdown from "@/components/shared/UserDropdown";
import Image from "next/image";
import { Icons } from "@/components/shared/Icons";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { adminLinks, doctorLinks, patientLinks } from "./constants";
import { useMyProfilQuery } from "@/redux/features/user/userApi";
import { useEffect, useState } from "react";



const DashboardSidebar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const { data: profileData } = useMyProfilQuery({}, { skip: !mounted });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const displayUser = profileData?.data || user;

  let menuItems:any[] = [];


  if (user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') {
    menuItems = adminLinks;
  } else if (user?.role === 'DOCTOR') {
    menuItems = doctorLinks;
  } else if (user?.role === 'PATIENT') {
    menuItems = patientLinks;
  }


  return (
    <Sidebar collapsible="icon" className="border-slate-800">
      {/* Brand Logo */}
      <SidebarHeader className="p-6 bg-slate-900">
        <Link href="/" className="flex items-center gap-3 group">
             <Image 
               src="https://res.cloudinary.com/dkk9lvbtf/image/upload/v1778161565/1778077513978_solqyp.png"
               alt='HealBridge logo' 
               width={150} 
               height={120} 
               className="h-auto w-auto rounded-lg group-data-[collapsible=icon]:hidden"
             />
        </Link>
      </SidebarHeader>

      {/* Navigation Links */}
      <SidebarContent className="px-4 bg-slate-900">

        <SidebarMenu className="gap-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "h-14 px-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 group",
                    isActive
                      ? "bg-teal-500 text-white shadow-xl shadow-teal-500/10 hover:bg-teal-600 hover:text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className={cn(
                      "w-5 h-5 transition-transform group-hover:scale-110",
                      isActive ? "text-white" : "text-slate-500"
                    )} />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Bottom Profile / Logout */}
      <SidebarFooter className="p-6 border-t border-slate-800 bg-slate-900">
        <UserDropdown 
          customTrigger={
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:bg-transparent">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {displayUser?.avatar ? (
                  <Image src={displayUser.avatar} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" />
                ) : (
                  <Icons.userCheck className="w-5 h-5 text-teal-400" />
                )}
              </div>
              <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                <p className="text-sm font-black text-white truncate italic">{displayUser?.name || 'User'}</p>
                <p className="text-[10px] font-bold text-teal-500 uppercase tracking-widest">{displayUser?.role || 'Guest'}</p>
              </div>
            </div>
          }
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export { DashboardSidebar };
