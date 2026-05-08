'use client';

import React, { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { Icons } from './Icons';
import Image from 'next/image';

interface HBFileUploadProps {
  name: string;
  label?: string;
  containerClassName?: string;
}

const HBFileUpload = ({ name, label, containerClassName }: HBFileUploadProps) => {
  const { control, formState: { errors } } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        // Handle local preview update
        useEffect(() => {
          if (value && value[0] instanceof File) {
            const objectUrl = URL.createObjectURL(value[0]);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
          }
        }, [value]);

        return (
          <Field className={cn("w-full", containerClassName)} data-invalid={!!error}>
            {label && (
              <FieldLabel className="text-[10px] font-black text-teal-600 uppercase tracking-widest italic mb-2 block">
                {label}
              </FieldLabel>
            )}
            <div className="relative group">
              <div className="flex flex-col items-center gap-4">
                <label
                  htmlFor={name}
                  className={cn(
                    "relative flex flex-col items-center justify-center w-full h-[58px] rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden",
                    "border border-dashed",
                    "bg-slate-50 dark:bg-slate-800/50 hover:bg-teal-50 dark:hover:bg-teal-900/20",
                    error ? "border-red-400 bg-red-50/50" : "border-slate-200 dark:border-slate-700 hover:border-teal-400 dark:hover:border-teal-500"
                  )}

                >
                  {value?.[0]?.name ? (
                    <div className="flex items-center justify-center gap-3 py-2 text-center px-4 w-full h-full bg-teal-50/50 dark:bg-teal-900/10 animate-in fade-in duration-300">
                      <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
                        <Icons.shieldCheck className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col items-start overflow-hidden">
                        <p className="text-sm font-bold text-teal-700 dark:text-teal-400 truncate w-full">
                          {value[0].name}
                        </p>
                        <p className="text-[10px] text-teal-600/70 uppercase font-medium">
                          File Selected
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3 py-2 text-center px-4">
                      <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform duration-300">
                        <Icons.upload className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col items-start">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                          Profile Picture
                        </p>
                      </div>
                    </div>
                  )}
                  <input
                    id={name}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        onChange(files);
                      }
                    }}
                    {...field}
                    value=""
                  />
                </label>
              </div>
            </div>

            <FieldError className="text-red-500 text-[10px] font-bold mt-2 uppercase tracking-wide animate-in fade-in slide-in-from-top-1" errors={[error as any]} />
          </Field>
        );
      }}
    />
  );
};

export { HBFileUpload };
