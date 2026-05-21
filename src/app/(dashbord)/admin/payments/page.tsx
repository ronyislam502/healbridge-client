'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useGetAllPaymentsQuery } from '@/redux/features/payment/paymentApi';
import { HBTable } from '@/components/shared/HBTable';
import Link from 'next/link';

const PaymentManagement = () => {
  const [activeTab, setActiveTab] = React.useState('ALL');
  const queryParams: Record<string, any> = { limit: 10 };
  if (activeTab !== 'ALL') {
    queryParams.status = activeTab;
  }
  const { data: paymentsRes, isLoading } = useGetAllPaymentsQuery(queryParams);

  const payments = paymentsRes?.data || [];

  const tabs = [
    { label: 'All Payments', value: 'ALL' },
    { label: 'Paid', value: 'PAID' },
    { label: 'Unpaid', value: 'UNPAID' },
    { label: 'Failed', value: 'FAILED' },
    { label: 'Refunded', value: 'REFUNDED' },
  ];

  const columns = [
    {
      header: 'Transaction ID',
      key: 'transactionId',
      render: (row: any) => (
        <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">{row.transactionId}</span>
      ),
    },
    {
      header: 'Doctor',
      key: 'doctor',
      render: (row: any) => (
        <span className="font-medium text-slate-900 dark:text-white">{row.appointment?.doctor?.name || 'N/A'}</span>
      ),
    },
    {
      header: 'Patient',
      key: 'patient',
      render: (row: any) => (
        <span className="font-medium text-slate-500 dark:text-slate-400">{row.appointment?.patient?.name || 'N/A'}</span>
      ),
    },
    {
      header: 'Amount',
      key: 'amount',
      align: 'right' as const,
      render: (row: any) => (
        <span className="font-black text-slate-900 dark:text-white italic">
          ${row.amount || 0}
        </span>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      align: 'center' as const,
      render: (row: any) => (
        <span className={cn(
          "inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic",
          row.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-500' :
          row.status === 'UNPAID' ? 'bg-orange-500/10 text-orange-500' :
          row.status === 'FAILED' ? 'bg-red-500/10 text-red-500' :
          row.status === 'REFUNDED' ? 'bg-blue-500/10 text-blue-500' :
          'bg-slate-500/10 text-slate-500'
        )}>
          {row.status}
        </span>
      ),
    },
    {
      header: 'Receipt',
      key: 'receipt',
      align: 'center' as const,
      render: (row: any) => (
        row.receiptUrl ? (
          <Link href={row.receiptUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-teal-500 hover:bg-teal-500/10">
              <Icons.download className="h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <span className="text-slate-400 text-xs italic">-</span>
        )
      ),
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Payment <span className="text-teal-500">Management</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Monitor all transactions and payment statuses globally.</p>
        </div>
        <div className="flex gap-4">
           <Button className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center gap-3 hover:bg-teal-500">
             <Icons.fileText className="w-5 h-5" />
             Export Report
           </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 p-2 bg-slate-100 dark:bg-slate-900 rounded-[1.5rem] w-fit overflow-x-auto max-w-full">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic transition-all whitespace-nowrap",
              activeTab === tab.value
                ? "bg-white dark:bg-slate-800 text-teal-500 shadow-sm"
                : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Payments Table */}
      <HBTable
        columns={columns}
        data={payments}
        isLoading={isLoading}
        emptyMessage="No payments found."
        skeletonCount={5}
      />
    </div>
  );
};

export default PaymentManagement;
