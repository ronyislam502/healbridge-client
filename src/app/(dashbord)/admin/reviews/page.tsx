import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Review Management | HealBridge',
  description: 'Monitor and manage patient reviews for doctors across the platform.',
};

const reviewsData = [
  { id: 1, doctor: "Dr. Charles Scott", patient: "John Doe", rating: 5, comment: "Excellent service and very knowledgeable.", date: "24 Oct 2023", status: "Published" },
  { id: 2, doctor: "Dr. Michael Brown", patient: "Sarah Jenkins", rating: 4, comment: "Very helpful, but wait time was a bit long.", date: "22 Oct 2023", status: "Published" },
  { id: 3, doctor: "Dr. Sarah Johnson", patient: "James Williams", rating: 2, comment: "Not satisfied with the consultation.", date: "21 Oct 2023", status: "Hidden" },
  { id: 4, doctor: "Dr. Emily Davis", patient: "Emily Davis", rating: 5, comment: "Wonderful experience, highly recommend!", date: "20 Oct 2023", status: "Published" },
  { id: 5, doctor: "Dr. Robert Wilson", patient: "Robert Miller", rating: 3, comment: "Average experience.", date: "18 Oct 2023", status: "Published" },
];

const ReviewManagement = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Review <span className="text-teal-500">Management</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Monitor patient feedback and manage the visibility of doctor reviews.</p>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Doctor / Patient</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Rating</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800">Comment</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-center">Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 dark:border-slate-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviewsData.map((rev) => (
                <tr key={rev.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800">
                    <p className="text-sm font-black text-slate-900 dark:text-white italic">{rev.doctor}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">By {rev.patient}</p>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Icons.star key={i} className={cn("w-3.5 h-3.5", i < rev.rating ? "text-orange-500 fill-orange-500" : "text-slate-200 dark:text-slate-700")} />
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 max-w-xs truncate">{rev.comment}</p>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-center">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{rev.date}</span>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-center">
                    <span className={cn(
                      "inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic",
                      rev.status === 'Published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                    )}>
                      {rev.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-teal-500 transition-all">
                        <Icons.eye className="w-4 h-4" />
                      </button>
                      <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-red-500 transition-all">
                        <Icons.eyeOff className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReviewManagement;
