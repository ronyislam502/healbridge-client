"use client";

import React from "react";
import {
  useForm,
  UseFormReturn,
  SubmitHandler,
  DefaultValues,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import { cn } from "@/lib/utils";

interface HBFormProps<T extends FieldValues> {
  schema: ZodSchema<T>;
  onSubmit: SubmitHandler<T>;
  defaultValues?: DefaultValues<T>;
  children: (form: UseFormReturn<T>) => React.ReactNode;
  className?: string;
}

const HBForm = <T extends FieldValues,>({

  schema,
  onSubmit,
  defaultValues,
  children,
  className,
}: HBFormProps<T>) => {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className={cn("space-y-4", className)}
    >
      {children(form)}
    </form>
  );
};

export { HBForm };
