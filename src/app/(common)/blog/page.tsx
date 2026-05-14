'use client';

import React, { useState } from 'react';
import BlogHero from '@/components/pages/blog/BlogHero';
import BlogCard from '@/components/pages/blog/BlogCard';
import CategoryFilter from '@/components/pages/blog/CategoryFilter';
import Newsletter from '@/components/pages/blog/Newsletter';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '@/components/shared/Icons';

const MOCK_POSTS = [
  {
    id: '1',
    title: 'Modern Healthcare: The Impact of AI in Diagnosis',
    excerpt: 'Artificial Intelligence is revolutionizing how we diagnose diseases, making it faster and more accurate than ever before. Explore the latest trends...',
    category: 'Technology',
    author: {
      name: 'Dr. Sarah Wilson',
      role: 'Chief Medical Officer',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop',
    },
    date: 'May 10, 2024',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop',
    readTime: '8 min read',
  },
  {
    id: '2',
    title: 'Top 10 Superfoods for a Healthy Heart',
    excerpt: 'Diet plays a crucial role in heart health. Discover which foods you should include in your daily meals to maintain a healthy cardiovascular system.',
    category: 'Nutrition',
    author: {
      name: 'Jane Doe',
      role: 'Nutritionist',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop',
    },
    date: 'May 08, 2024',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    readTime: '5 min read',
  },
  {
    id: '3',
    title: 'Understanding Mental Health: Breaking the Stigma',
    excerpt: 'Mental health is just as important as physical health. Learn how to identify common signs of mental fatigue and how to seek help effectively.',
    category: 'Mental Health',
    author: {
      name: 'Dr. Robert King',
      role: 'Psychiatrist',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop',
    },
    date: 'May 05, 2024',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop',
    readTime: '12 min read',
  },
  {
    id: '4',
    title: 'The Importance of Regular Dental Checkups',
    excerpt: 'Many people ignore dental health until it becomes painful. Find out why regular checkups are essential for preventing long-term oral health issues.',
    category: 'Dental Care',
    author: {
      name: 'Dr. Michael Chen',
      role: 'Dentist',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&h=200&auto=format&fit=crop',
    },
    date: 'May 02, 2024',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop',
    readTime: '6 min read',
  },
  {
    id: '5',
    title: 'Sleep Hygiene: How to Get Better Rest Tonight',
    excerpt: 'Struggling with sleep? These expert-backed tips on sleep hygiene will help you fall asleep faster and wake up feeling truly refreshed.',
    category: 'Wellness',
    author: {
      name: 'Dr. Emily Blunt',
      role: 'Sleep Specialist',
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&h=200&auto=format&fit=crop',
    },
    date: 'April 28, 2024',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop',
    readTime: '10 min read',
  },
  {
    id: '6',
    title: 'Telemedicine: The Future of Patient Care',
    excerpt: 'Virtual doctor visits are no longer a luxury but a necessity. Learn how telemedicine is making healthcare more accessible to remote areas.',
    category: 'Healthcare',
    author: {
      name: 'Dr. Sarah Wilson',
      role: 'Chief Medical Officer',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop',
    },
    date: 'April 25, 2024',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
    readTime: '7 min read',
  },
];

const FEATURED_POST = MOCK_POSTS[0];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All Articles');

  const filteredPosts = activeCategory === 'All Articles' 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(post => post.category === activeCategory);

  return (
    <main className="min-h-screen bg-gray-50/30">
      <BlogHero />

      <section className="container mx-auto px-4 py-12">
        {/* Featured Post */}
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
                    href={`/blog/${FEATURED_POST.id}`}
                    className="flex items-center gap-2 font-bold text-primary transition-all hover:gap-3"
                  >
                    Read Article <Icons.chevronRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories and Filter */}
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
          <CategoryFilter 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 text-gray-500">
            <Icons.activity className="mb-4 h-12 w-12 opacity-20" />
            <p>No articles found in this category.</p>
          </div>
        )}

        {/* Pagination Placeholder */}
        <div className="mt-20 flex justify-center">
          <button className="rounded-2xl border border-gray-200 bg-white px-8 py-4 font-semibold text-gray-600 transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary">
            Load More Articles
          </button>
        </div>
      </section>

      <Newsletter />
    </main>
  );
};

export default BlogPage;
