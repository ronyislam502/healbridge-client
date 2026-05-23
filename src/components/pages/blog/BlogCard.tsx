import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@/components/shared/Icons';

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: {
      name: string;
      role: string;
      avatar: string;
    };
    date: string;
    image: string;
    readTime: string;
  };
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white transition-all hover:shadow-2xl hover:shadow-gray-200/50">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Icons.calendar className="h-3.5 w-3.5 text-primary" />
            {post.date}
          </div>
          <div className="flex items-center gap-1.5">
            <Icons.clock className="h-3.5 w-3.5 text-primary" />
            {post.readTime}
          </div>
        </div>

        <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary">
          <Link href={`/blogs/${post.id}`}>
            {post.title}
          </Link>
        </h3>

        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-600">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary/10">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{post.author.name}</p>
              <p className="text-xs text-gray-500">{post.author.role}</p>
            </div>
          </div>
          <Link 
            href={`/blogs/${post.id}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all hover:bg-primary hover:text-white"
          >
            <Icons.chevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
