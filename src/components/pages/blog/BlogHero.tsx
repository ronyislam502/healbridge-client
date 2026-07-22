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
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
