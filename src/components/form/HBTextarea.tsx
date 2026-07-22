'use client';

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { IInput } from "@/types/global";
import { cn } from "@/lib/utils";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

interface HBTextareaProps extends IInput {
  labelRight?: React.ReactNode;
  icon?: React.ReactNode;
}

const HBTextarea = ({
  name,
  label,
  placeholder = "",
  disabled,
  labelRight,
  icon,
}: HBTextareaProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field className="w-full" data-invalid={!!error}>
          {(label || labelRight) && (
            <div className="flex items-center justify-between mb-1">
              {label && (
                <FieldLabel className="text-[12px] font-black text-success uppercase tracking-widest italic">
                  {label}
                </FieldLabel>
              )}
              {labelRight}
            </div>
          )}
          <div className="relative group">
            {icon && (
              <div className="absolute left-4 top-6 text-success group-focus-within:text-teal-400 transition-colors duration-300">
                {icon}
              </div>
            )}
            <Textarea
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              value={field.value ?? ""}
              className={cn(
                "w-full bg-success/5 border border-success/30 rounded-2xl py-4 transition-all duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed resize-none min-h-[120px]",
                "text-slate-900 dark:text-white font-bold placeholder:text-gray-500",
                "hover:border-teal-500/40 hover:bg-teal-500/5",
                "focus-visible:ring-0 focus-visible:border-teal-500/60 focus-visible:bg-teal-500/8",
                icon ? "pl-12" : "px-6",
                error && "border-error focus-visible:border-error"
              )}
            />
          </div>
          <FieldError className="text-error text-[10px] font-bold mt-2 uppercase tracking-wide animate-in fade-in slide-in-from-top-1" errors={[error as any]} />
        </Field>
      )}
    />
  );
};

export { HBTextarea };
