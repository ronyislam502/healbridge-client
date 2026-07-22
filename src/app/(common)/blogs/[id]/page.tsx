'use client';


import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useGetBlogByIdQuery } from '@/redux/features/blog/blogApi';
import { Icons } from '@/components/shared/Icons';
import { HBProfileSkeleton } from '@/components/shared/HBSkeletons';

const SingleBlogPage = () => {
  const { id } = useParams() as { id: string };
  const { data: response, isLoading } = useGetBlogByIdQuery(id, { skip: !id });
  const blog = response?.data;

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50/30 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <HBProfileSkeleton />
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="min-h-screen bg-gray-50/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Blog not found</h2>
          <Link href="/blogs" className="text-primary hover:underline">
            ← Back to all articles
          </Link>
        </div>
      </main>
    );
  }

  const date = new Date(blog.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-gray-50/30 pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] lg:h-[600px] mb-12">
        <Image
          src={blog.coverImage || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop'}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end pb-16">
          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <Link href="/blogs" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <Icons.chevronLeft className="w-5 h-5 mr-1" />
              Back to articles
            </Link>
            
            <div className="mb-4">
              <span className="inline-block rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white tracking-wider uppercase">
                {blog.category || 'General'}
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex items-center gap-4 border-t border-white/20 pt-6">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/30">
                <Image
                  src={blog.author?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop'}
                  alt={blog.author?.name || 'Author'}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white text-lg">{blog.author?.name || 'Admin'}</p>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <span className="flex items-center gap-1.5">
                    <Icons.calendar className="h-4 w-4" /> {date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icons.clock className="h-4 w-4" /> 5 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-16 shadow-xl shadow-gray-200/50 -mt-24 relative z-20 border border-gray-100">
          {Array.isArray(blog.features) && blog.features.length > 0 ? (
            <div className="space-y-6">
              {blog.features.map((paragraph: string, idx: number) => (
                <p key={idx} className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed font-normal bg-gray-50/60 dark:bg-slate-800/40 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: blog.content || '' }}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default SingleBlogPage;
