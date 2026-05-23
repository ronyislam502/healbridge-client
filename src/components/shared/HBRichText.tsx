'use client';

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { IInput } from "@/types/global";
import { cn } from "@/lib/utils";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface HBRichTextProps extends IInput {
  containerClassName?: string;
  className?: string;
}

const HBRichText = ({
  name,
  label,
  containerClassName,
  className,
}: HBRichTextProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  const modules = React.useMemo(() => ({
    toolbar: [
      [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }, { 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  }), []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field className={cn("w-full", containerClassName)} data-invalid={!!error}>
          {label && (
            <div className="flex items-center justify-between mb-2">
              <FieldLabel className="text-[10px] font-black text-success uppercase tracking-widest italic group-hover:text-teal-400 transition-colors duration-300">
                {label}
              </FieldLabel>
            </div>
          )}
          <div className="relative group flex flex-col">
            <div className={cn(
              "w-full bg-slate-100 dark:bg-slate-900 border border-success/30 rounded-xl transition-all duration-300 overflow-hidden",
              "text-slate-900 dark:text-slate-100",
              "focus-within:border-teal-500/60 focus-within:shadow-lg focus-within:shadow-teal-500/10",
              error && "border-error focus-within:border-error",
              className
            )}>
              <ReactQuill
                theme="snow"
                value={field.value || ''}
                onChange={field.onChange}
                modules={modules}
                className={cn(
                  "flex flex-col border-none min-h-[600px]",
                  // Toolbar Styling
                  "[&_.ql-toolbar]:sticky [&_.ql-toolbar]:top-0 [&_.ql-toolbar]:z-10",
                  "[&_.ql-toolbar]:bg-white dark:[&_.ql-toolbar]:bg-slate-800",
                  "[&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-slate-200 dark:[&_.ql-toolbar]:border-slate-700",
                  "[&_.ql-toolbar]:p-4 [&_.ql-toolbar]:shadow-sm",
                  // Toolbar Buttons & Controls
                  "[&_.ql-toolbar_button]:hover:text-teal-500",
                  "[&_.ql-toolbar_.ql-picker-label]:text-slate-700 dark:[&_.ql-toolbar_.ql-picker-label]:text-slate-300",
                  "[&_.ql-toolbar_.ql-stroke]:stroke-slate-700 dark:[&_.ql-toolbar_.ql-stroke]:stroke-slate-300",
                  "[&_.ql-toolbar_.ql-fill]:fill-slate-700 dark:[&_.ql-toolbar_.ql-fill]:fill-slate-300",
                  // Container & Page styling (MS Word Look)
                  "[&_.ql-container]:bg-slate-100 dark:[&_.ql-container]:bg-slate-950",
                  "[&_.ql-container]:border-none [&_.ql-container]:p-8 [&_.ql-container]:overflow-y-auto",
                  // Editor "Paper" styling
                  "[&_.ql-editor]:bg-white dark:[&_.ql-editor]:bg-slate-900",
                  "[&_.ql-editor]:min-h-[1056px] [&_.ql-editor]:w-full [&_.ql-editor]:max-w-[816px] [&_.ql-editor]:mx-auto", // 8.5x11 aspect ratio approx
                  "[&_.ql-editor]:p-16 [&_.ql-editor]:shadow-xl [&_.ql-editor]:border [&_.ql-editor]:border-slate-200 dark:[&_.ql-editor]:border-slate-800",
                  "[&_.ql-editor]:text-base [&_.ql-editor]:leading-relaxed"
                )}
              />
            </div>
          </div>

          <FieldError className="text-error text-[10px] font-bold mt-2 uppercase tracking-wide animate-in fade-in slide-in-from-top-1" errors={[error as any]} />
        </Field>
      )}
    />
  );
};

export { HBRichText };
