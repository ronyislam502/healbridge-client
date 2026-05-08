'use client';

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { IInput } from "@/types/global";
import { cn } from "@/lib/utils";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

interface HBInputProps extends IInput {
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
  labelRight?: React.ReactNode;
  containerClassName?: string;
  className?: string;
}


const HBInput = ({
  name,
  label,
  type = "text",
  placeholder = "",
  disabled,
  icon,
  suffix,
  labelRight,
  containerClassName,
  className,
}: HBInputProps) => {

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
        <Field className={cn("w-full", containerClassName)} data-invalid={!!error}>
          {(label || labelRight) && (
            <div className="flex items-center justify-between mb-1">
              {label && (
                <FieldLabel className="text-[10px] font-black text-success uppercase tracking-widest italic group-hover:text-teal-400 transition-colors duration-300">
                  {label}
                </FieldLabel>
              )}
              {labelRight}
            </div>
          )}
          <div className="relative group">
            {icon && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-success group-focus-within:text-teal-400 transition-colors duration-300">
                {icon}
              </div>
            )}
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              value={field.value ?? ""}
              onChange={(e) => {
                const val = type === "number" ? (e.target.value === "" ? "" : Number(e.target.value)) : e.target.value;
                field.onChange(val);
              }}
              className={cn(
                "w-full bg-success/5 border border-success/30 rounded-2xl py-4 transition-all duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed",
                "text-slate-900 dark:text-white font-bold placeholder:text-gray-500",
                "hover:border-teal-500/40 hover:bg-teal-500/5",
                "focus:border-teal-500/60 focus:bg-teal-500/8",
                icon ? "pl-12" : "px-6",
                suffix ? "pr-12" : "pr-6",
                error && "border-error focus:border-error",
                className
              )}
            />
            {suffix && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {suffix}
              </div>
            )}
          </div>

          <FieldError className="text-error text-[10px] font-bold mt-2 uppercase tracking-wide animate-in fade-in slide-in-from-top-1" errors={[error as any]} />
        </Field>
      )}
    />
  );
};

export { HBInput };
