'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { HBInput } from '@/components/shared/HBInput';
import { HBForm } from '@/components/shared/HBForm';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChangePasswordModal } from '@/components/shared/ChangePasswordModal';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = React.useState('profile');

  const tabs = [
    { id: 'profile', label: 'Admin Profile', icon: Icons.userCheck },
    { id: 'general', label: 'General Config', icon: Icons.activity },
    { id: 'notifications', label: 'Notifications', icon: Icons.mail },
    { id: 'security', label: 'Security', icon: Icons.shieldCheck },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            System <span className="text-teal-500">Settings</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Configure platform preferences and manage your administrative account.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <ChangePasswordModal />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300",
              activeTab === tab.id
                ? "bg-slate-900 text-white shadow-2xl scale-105"
                : "bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-100 dark:border-slate-800"
            )}
          >
            <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-teal-400" : "text-slate-400")} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-800">
        {activeTab === 'profile' && (
          <div className="max-w-3xl space-y-10">
            <div className="flex items-center gap-8">
              <div className="relative w-32 h-32 rounded-[2rem] bg-teal-500 flex items-center justify-center text-white text-4xl font-black italic shadow-2xl shadow-teal-500/20">
                AU
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-teal-600 transition-colors border-4 border-white dark:border-slate-900">
                  <Icons.share2 className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white italic">Admin User</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Last active: 10 minutes ago</p>
                <p className="text-[10px] font-black text-teal-500 uppercase tracking-widest mt-2 bg-teal-500/10 px-3 py-1 rounded-lg inline-block">Full Access</p>
              </div>
            </div>

            <HBForm onSubmit={() => {}}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <HBInput
                  label="Full Name"
                  name="name"
                  defaultValue="Admin User"
                  icon={<Icons.userCheck className="w-4 h-4" />}
                />
                <HBInput
                  label="Email Address"
                  name="email"
                  defaultValue="admin@healbridge.com"
                  icon={<Icons.mail className="w-4 h-4" />}
                />
                <HBInput
                  label="Phone Number"
                  name="phone"
                  defaultValue="+1 (315) 369-5943"
                  icon={<Icons.phone className="w-4 h-4" />}
                />
                <HBInput
                  label="Location"
                  name="location"
                  defaultValue="New York, USA"
                  icon={<Icons.mapPin className="w-4 h-4" />}
                />
              </div>

              <div className="pt-10 flex gap-4">
                <Button className="h-14 px-10 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all">
                  Save Changes
                </Button>
                <Button variant="outline" className="h-14 px-10 rounded-2xl border-slate-200 dark:border-slate-800 font-black text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  Discard
                </Button>
              </div>
            </HBForm>
          </div>
        )}

        {activeTab !== 'profile' && (
          <div className="py-20 text-center space-y-6">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-[1.5rem] flex items-center justify-center mx-auto border border-slate-100 dark:border-slate-800">
               <Icons.shieldCheck className="w-10 h-10 text-slate-400 animate-pulse" />
            </div>
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic">Module Loading</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium">The {activeTab} settings are currently being synchronized with the master server.</p>
            </div>
          </div>
        )}
      </div>

      {/* Secondary Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl group overflow-hidden relative">
           <div className="relative z-10">
             <h4 className="text-xl font-black italic uppercase tracking-widest mb-4">Account Security</h4>
             <p className="text-slate-400 font-medium mb-8">Two-factor authentication is currently <span className="text-teal-400">Enabled</span>. Your account is protected.</p>
             <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white hover:text-teal-400 transition-colors">
               <Icons.lock className="w-4 h-4" />
               Manage 2FA Settings
             </button>
           </div>
           <Icons.shieldCheck className="absolute -bottom-8 -right-8 w-40 h-40 text-white/5 rotate-12 group-hover:scale-110 transition-transform duration-700" />
        </div>

        <div className="bg-teal-500 rounded-[2.5rem] p-10 text-white shadow-2xl group overflow-hidden relative">
           <div className="relative z-10">
             <h4 className="text-xl font-black italic uppercase tracking-widest mb-4">System Updates</h4>
             <p className="text-teal-100 font-medium mb-8">V1.4.2 is now available. Review the new features and security patches.</p>
             <button className="px-8 py-3 bg-white text-teal-600 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
               Update Now
             </button>
           </div>
           <Icons.activity className="absolute -bottom-8 -right-8 w-40 h-40 text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
