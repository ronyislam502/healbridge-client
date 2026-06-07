'use client';

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { IInput } from "@/types/global";
import { cn } from "@/lib/utils";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

interface HBSelectProps extends IInput {
  options: {
    key?: string;
    value?: string;
    label: string;
  }[];
  labelRight?: React.ReactNode;
  containerClassName?: string;
  className?: string;
}

const HBSelect = ({
  name,
  label,
  placeholder,
  options = [],
  disabled,
  labelRight,
  containerClassName,
  className,
}: HBSelectProps) => {
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
                <FieldLabel className="text-[10px] font-black text-success uppercase tracking-widest italic">
                  {label}
                </FieldLabel>
              )}
              {labelRight}
            </div>
          )}

          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger
              className={cn(
                "w-full bg-success/5 border rounded-2xl py-6 px-6 transition-all duration-300 outline-none",
                "font-bold placeholder:text-gray-500",
                "hover:border-teal-500/40 hover:bg-teal-500/5",
                "focus:ring-0 focus:ring-offset-0 focus:border-teal-500/60 focus:bg-teal-500/8",
                field.value && field.value !== "all"
                  ? "border-teal-500 text-teal-400 bg-teal-500/8 shadow-[0_0_0_3px_rgba(20,184,166,0.15)]"
                  : "border-success/30 text-slate-900 dark:text-white",
                error && "border-error focus:border-error",
                className
              )}
            >
              <SelectValue placeholder={placeholder || `Select ${label}`} />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-800 text-white">
              {options.map((option, index) => (
                <SelectItem
                  key={option.key || option.value || index}
                  value={option.value || option.key || ""}
                  className={cn(
                    "cursor-pointer focus:bg-teal-600 focus:text-white",
                    // Highlight the currently selected item
                    field.value === (option.value || option.key || "") && "text-teal-400 font-bold"
                  )}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FieldError className="text-error text-[10px] font-bold mt-2 uppercase tracking-wide animate-in fade-in slide-in-from-top-1" errors={[error as any]} />
        </Field>
      )}
    />
  );
};

export { HBSelect };
