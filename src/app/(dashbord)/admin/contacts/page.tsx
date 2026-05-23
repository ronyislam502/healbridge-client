'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { useGetAllContactsQuery } from '@/redux/features/contact/contactApi';
import { HBTable } from '@/components/shared/HBTable';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { HBModal } from '@/components/shared/HBModal';

const AdminContactsPage = () => {
  const { data, isLoading } = useGetAllContactsQuery({});
  const contacts = data?.data || [];
  
  const [selectedMessage, setSelectedMessage] = React.useState<any>(null);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Contact <span className="text-teal-500">Messages</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Review and respond to inquiries from users.</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Messages', value: data?.meta?.total || contacts.length || 0, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Unread / New', value: contacts.length || 0, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Received This Month', value: contacts.filter((c: any) => new Date(c.createdAt).getMonth() === new Date().getMonth()).length || 0, color: 'text-teal-500', bg: 'bg-teal-500/10' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-lg">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{stat.label}</p>
            <h3 className={`text-3xl font-black italic ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <HBTable
        isLoading={isLoading}
        loadingMessage="Loading messages..."
        data={contacts}
        columns={[
          {
            header: "Sender Details",
            key: "name",
            render: (row: any) => (
              <div>
                <span className="text-base font-black text-slate-900 dark:text-white block">{row.name}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Icons.mail className="w-3 h-3" /> {row.email}
                </span>
              </div>
            )
          },
          {
            header: "Subject",
            key: "subject",
            render: (row: any) => (
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {row.subject}
              </span>
            )
          },
          {
            header: "Date",
            key: "createdAt",
            render: (row: any) => (
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                {new Date(row.createdAt).toLocaleDateString()}
              </span>
            )
          },
          {
            header: "Actions",
            key: "actions",
            align: "right",
            render: (row: any) => (
              <div className="flex items-center justify-end gap-3">
                <button 
                  onClick={() => setSelectedMessage(row)}
                  className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-teal-500 transition-all shadow-sm"
                  title="View Message"
                >
                  <Icons.eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => window.location.href = `mailto:${row.email}?subject=Re: ${row.subject}`}
                  className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-blue-500 transition-all shadow-sm"
                  title="Reply via Email"
                >
                  <Icons.reply className="w-4 h-4" />
                </button>
              </div>
            )
          }
        ]}
      />

      <HBModal
        open={!!selectedMessage}
        onOpenChange={(isOpen) => !isOpen && setSelectedMessage(null)}
        title={selectedMessage?.subject || "Message"}
        description={`From: ${selectedMessage?.name} <${selectedMessage?.email}>`}
        trigger={<button className="hidden" type="button" />}
        className="sm:max-w-2xl"
      >
        {selectedMessage && (
          <div className="mt-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                {selectedMessage.message}
              </p>
            </div>
            
            <div className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
              Received: {new Date(selectedMessage.createdAt).toLocaleString()}
            </div>

            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <Button 
                variant="outline" 
                onClick={() => setSelectedMessage(null)}
                className="rounded-xl h-12 px-6"
              >
                Close
              </Button>
              <Button 
                onClick={() => window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                className="bg-teal-500 text-white hover:bg-teal-600 rounded-xl h-12 px-6 font-bold uppercase tracking-widest shadow-lg shadow-teal-500/20"
              >
                <Icons.reply className="w-4 h-4 mr-2" /> Reply
              </Button>
            </div>
          </div>
        )}
      </HBModal>
    </div>
  );
};

export default AdminContactsPage;
