'use client';


import BlogHero from '@/components/pages/blog/BlogHero';
import BlogCard from '@/components/pages/blog/BlogCard';
import CategoryFilter from '@/components/pages/blog/CategoryFilter';
import Newsletter from '@/components/pages/blog/Newsletter';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '@/components/shared/Icons';
import { useGetAllBlogsQuery } from '@/redux/features/blog/blogApi';
import { HBCardSkeleton } from '@/components/shared/HBSkeletons';
import { useMemo, useState } from 'react';

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState('All Articles');
  const { data: blogData, isLoading } = useGetAllBlogsQuery({});

  const blogs = blogData?.data || [];

  const formattedPosts = useMemo(() => {
    return blogs.map((blog: any) => ({
      id: blog.id,
      title: blog.title,
      excerpt: blog.content ? blog.content.replace(/<[^>]+>/g, '').substring(0, 150) + '...' : '',
      category: blog.category || 'General',
      author: {
        name: blog.author?.name || 'Admin',
        role: 'Author',
        avatar: blog.author?.avatar,
      },
      date: new Date(blog.createdAt).toLocaleDateString(),
      image: blog.coverImage,
      readTime: '5 min read',
    }));
  }, [blogs]);

  const filteredPosts = activeCategory === 'All Articles'
    ? formattedPosts
    : formattedPosts.filter((post: any) => post.category === activeCategory);

  const FEATURED_POST = formattedPosts.length > 0 ? formattedPosts[0] : null;
  const REMAINING_POSTS = activeCategory === 'All Articles'
    ? filteredPosts.filter((post: any) => post.id !== FEATURED_POST?.id)
    : filteredPosts;

  return (
    <main className="min-h-screen bg-gray-50/30">
      <BlogHero />

      <section className="container mx-auto px-4 py-12">

        {isLoading ? (
          <div className="mb-20">
            <HBCardSkeleton />
          </div>
        ) : FEATURED_POST && activeCategory === 'All Articles' ? (
          <div className="mb-20">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Featured Article</h2>
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-xl shadow-gray-200/50 transition-all hover:shadow-2xl">
              <div className="flex flex-col lg:flex-row">
                <div className="relative h-80 w-full overflow-hidden lg:h-[450px] lg:w-1/2">
                  <Image
                    src={FEATURED_POST.image}
                    alt={FEATURED_POST.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center p-8 lg:p-12">
                  <span className="mb-4 inline-block w-fit rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                    {FEATURED_POST.category}
                  </span>
                  <h3 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
                    {FEATURED_POST.title}
                  </h3>
                  <p className="mb-8 text-lg leading-relaxed text-gray-600">
                    {FEATURED_POST.excerpt}
                  </p>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-8">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20">
                        <Image
                          src={FEATURED_POST.author.avatar}
                          alt={FEATURED_POST.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{FEATURED_POST.author.name}</p>
                        <p className="text-sm text-gray-500">{FEATURED_POST.author.role}</p>
                      </div>
                    </div>
                    <Link
                      href={`/blogs/${FEATURED_POST.id}`}
                      className="flex items-center gap-2 font-bold text-primary transition-all hover:gap-3"
                    >
                      Read Article <Icons.chevronRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Categories and Filter */}
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => <HBCardSkeleton key={i} />)}
          </div>
        ) : REMAINING_POSTS.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {REMAINING_POSTS.map((post: any) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 text-gray-500">
            <Icons.activity className="mb-4 h-12 w-12 opacity-20" />
            <p>No articles found in this category.</p>
          </div>
        )}

      </section>

      <Newsletter />
    </main>
  );
};

export default Blogs;
