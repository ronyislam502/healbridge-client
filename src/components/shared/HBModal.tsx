'use client';

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface HBModalProps {
  title: string;
  description?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const HBModal = ({
  title,
  description,
  trigger,
  children,
  className,
  open,
  onOpenChange,
}: HBModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent className={cn(
        "sm:max-w-[600px] bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-0 overflow-hidden shadow-2xl flex flex-col",
        className
      )}>

        <div className="bg-slate-900 p-8 border-b border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-white italic uppercase tracking-wider">
              {title.split(' ').slice(0, -1).join(' ')} <span className="text-teal-400">{title.split(' ').pop()}</span>
            </DialogTitle>
            {description && (
              <DialogDescription className="text-slate-400 font-medium mt-2">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        </div>

        <div className="p-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
          {children}
        </div>

      </DialogContent>
    </Dialog>
  );
};

export { HBModal };
