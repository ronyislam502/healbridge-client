'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { useGetAllBlogsQuery, useDeleteBlogMutation } from '@/redux/features/blog/blogApi';
import { HBTable } from '@/components/shared/HBTable';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CreateBlogModal } from '@/components/dashboard/CreateBlogModal';

const AdminBlogsPage = () => {
  const router = useRouter();
  const { data, isLoading } = useGetAllBlogsQuery({});
  const [deleteBlog] = useDeleteBlogMutation();
  const blogs = data?.data || [];

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteBlog(id).unwrap();
      if (res?.success) {
        toast.success("Blog deleted successfully!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete blog");
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Blog <span className="text-teal-500">Management</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Review and manage articles published on the platform.</p>
        </div>
        <CreateBlogModal />
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Blogs', value: data?.meta?.total || blogs.length || 0, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Total Authors', value: new Set(blogs.map((b: any) => b.authorId)).size || 0, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Published This Month', value: blogs.filter((b: any) => new Date(b.createdAt).getMonth() === new Date().getMonth()).length || 0, color: 'text-teal-500', bg: 'bg-teal-500/10' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-lg">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{stat.label}</p>
            <h3 className={`text-3xl font-black italic ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <HBTable
        isLoading={isLoading}
        loadingMessage="Loading articles..."
        data={blogs}
        columns={[
          {
            header: "Article Details",
            key: "title",
            render: (row: any) => (
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shrink-0">
                  <Image
                    src={row.coverImage || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop'}
                    alt={row.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-base font-black text-slate-900 dark:text-white block line-clamp-1">{row.title}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    By {row.author?.name || 'Unknown Author'}
                  </span>
                </div>
              </div>
            )
          },
          {
            header: "Category",
            key: "category",
            render: (row: any) => (
              <span className="px-3 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-full text-xs font-bold uppercase tracking-wider">
                {row.category}
              </span>
            )
          },
          {
            header: "Published At",
            key: "createdAt",
            render: (row: any) => (
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
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
                  onClick={() => window.open(`/blog/${row.id}`, '_blank')}
                  className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-teal-500 transition-all"
                  title="View"
                >
                  <Icons.eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(row.id)}
                  className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-red-500 transition-all"
                  title="Delete"
                >
                  <Icons.trash className="w-4 h-4" />
                </button>
              </div>
            )
          }
        ]}
      />
    </div>
  );
};

export default AdminBlogsPage;
