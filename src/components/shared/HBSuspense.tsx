'use client';

import * as React from 'react';
import { HBCardSkeleton, HBTableSkeleton } from './HBSkeletons';

interface HBSuspenseProps {
  children: React.ReactNode;
  variant?: 'card' | 'table';
  count?: number;
  isLoading?: boolean;
}

/**
 * HBSuspense: A wrapper that uses standard React Suspense with premium skeleton fallbacks.
 * Also supports manual isLoading state for compatibility with standard RTK Query patterns.
 */
const HBSuspense = ({ children, variant = 'card', count = 3, isLoading }: HBSuspenseProps) => {
  const Fallback = variant === 'card' ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 animate-in fade-in duration-500">
      {[...Array(count)].map((_, i) => (
        <HBCardSkeleton key={i} />
      ))}
    </div>
  ) : (
    <HBTableSkeleton rows={count} className="animate-in fade-in duration-500" />
  );

  if (isLoading) return Fallback;

  return (
    <React.Suspense fallback={Fallback}>
      {children}
    </React.Suspense>
  );
};

export { HBSuspense };
