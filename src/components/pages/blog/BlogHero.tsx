import React from 'react';
import { Icons } from '@/components/shared/Icons';

const BlogHero = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-32">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-success/5 blur-3xl" />
      
      <div className="container relative mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary animate-in fade-in slide-in-from-bottom-4 duration-700">
            Insights & Health Tips
          </span>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Stay Informed with <span className="text-primary">HealBridge</span> Blog
          </h1>
          <p className="mb-10 text-lg leading-8 text-gray-600 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Discover the latest news in healthcare, wellness tips, and expert advice from our professional medical team to help you live a healthier life.
          </p>
          
          <div className="relative mx-auto max-w-lg animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="flex items-center rounded-2xl border border-gray-200 bg-white p-2 shadow-xl shadow-gray-200/50 backdrop-blur-xl transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-400">
                <Icons.search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search articles, health tips..."
                className="w-full bg-transparent px-4 py-2 text-slate-900 dark:text-white placeholder:text-gray-400 focus:outline-none"
              />
              <button className="hidden rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-95 sm:block">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
