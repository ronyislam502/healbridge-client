import React from 'react';
import { Icons } from '@/components/shared/Icons';

const Newsletter = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[3rem] bg-gray-900 px-6 py-16 text-center sm:px-12 sm:py-24">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 rounded-full bg-success/10 blur-3xl" />
          
          <div className="relative mx-auto max-w-2xl">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-xl">
              <Icons.mail className="h-8 w-8" />
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Subscribe to our newsletter
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-gray-400">
              Join our community of 10,000+ subscribers and get the latest health insights, tips, and medical updates delivered straight to your inbox.
            </p>
            
            <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-2xl bg-white/10 px-6 py-4 text-white placeholder:text-gray-500 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
              <button
                type="submit"
                className="rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-95"
              >
                Subscribe Now
              </button>
            </form>
            
            <p className="mt-6 text-xs text-gray-500">
              We care about your data. Read our <span className="text-gray-400 underline cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
