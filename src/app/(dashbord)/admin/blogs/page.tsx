'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { useGetAllBlogsQuery, useDeleteBlogMutation, useCreateBlogMutation } from '@/redux/features/blog/blogApi';
import { HBTable } from '@/components/shared/HBTable';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { HBModal } from '@/components/shared/HBModal';
import { HBForm } from '@/components/form/HBForm';
import { HBInput } from '@/components/form/HBInput';
import { HBRichText } from '@/components/shared/HBRichText';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


// Healthcare
// Wellness
// Medical Advice
// Nutrition
// Technology
// Mental Health
// Dental Care

const blogSchema = z.object({
  title: z.string().min(1, "Title is required").max(150, "Title must be less than 150 characters"),
  category: z.string().min(1, "Category is required"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
});
type BlogFormValues = z.infer<typeof blogSchema>;

const AdminBlogsPage = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const { data, isLoading } = useGetAllBlogsQuery({});
  const [deleteBlog] = useDeleteBlogMutation();
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const blogs = data?.data || [];

  const methods = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: { title: "", category: "", content: "" },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const onSubmit = async (data: BlogFormValues) => {
    try {
      const res = await createBlog({
        title: data.title,
        category: data.category,
        content: data.content,
        ...(file && { image: file })
      }).unwrap();

      if (res?.success) {
        toast.success("Blog created successfully!");
        methods.reset();
        setFile(null);
        setPreview(null);
        setIsModalOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create blog.");
    }
  };

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
        <HBModal
          title="Create Blog"
          description="Write and publish a new article."
          className="sm:max-w-5xl"
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          trigger={
            <Button 
              className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white font-black text-sm uppercase tracking-widest shadow-xl hover:bg-teal-500 transition-all flex items-center gap-3"
            >
              <Icons.edit className="w-5 h-5" />
              Write New Blog
            </Button>
          }
        >
          <HBForm methods={methods} onSubmit={onSubmit}>
            <div className="grid gap-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="md:col-span-1">
                  <HBInput name="title" label="Article Title" placeholder="e.g. Modern Healthcare" />
                </div>
                <div className="md:col-span-1">
                  <HBInput name="category" label="Category" placeholder="e.g. Technology" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1 block mb-2">Cover Image</label>
                  <label className="relative cursor-pointer group block">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-800 group-hover:border-teal-500/50 transition-all flex flex-col items-center justify-center text-center">
                      {preview ? (
                        <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-900 group-hover:scale-[1.02] transition-transform">
                          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Icons.image className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-teal-500 shadow-md mb-4 transition-colors">
                            <Icons.image className="w-6 h-6" />
                          </div>
                          <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest italic">Upload Cover Image</p>
                          <p className="text-[10px] font-medium text-slate-500 mt-1">Recommended: 1200x630px</p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              </div>
              <div>
                <HBRichText name="content" label="Article Content" />
              </div>
              <div className="flex justify-end pt-6 border-t border-slate-100 dark:border-slate-800 mt-4">
                <Button type="submit" disabled={isCreating} className="bg-teal-500 text-white hover:bg-teal-600 rounded-xl px-8 h-12 font-bold uppercase tracking-widest transition-all">
                  {isCreating ? "Publishing..." : "Publish Article"}
                </Button>
              </div>
            </div>
          </HBForm>
        </HBModal>
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
                {row.coverImage && (
                  <div className="relative w-16 h-12 rounded-xl overflow-hidden border border-slate-200">
                    <Image src={row.coverImage} alt={row.title} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <span className="text-base font-black text-slate-900 dark:text-white block">{row.title}</span>
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
