"use client";

import React, { ReactNode } from "react";
import { 
  FormProvider, 
  FieldValues, 
  SubmitHandler, 
  useForm, 
  UseFormProps,
  UseFormReturn
} from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormConfig {
  defaultValues?: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolver?: any;
}

interface HBFormProps extends FormConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods?: any;
  className?: string;
}

const HBForm = ({ 
  children, 
  onSubmit, 
  defaultValues, 
  resolver, 
  methods: externalMethods,
  className
}: HBFormProps) => {
  const formConfig: UseFormProps = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const internalMethods = useForm(formConfig);
  const methods = externalMethods || internalMethods;

  const { reset } = methods;

  React.useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const submitHandler = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <form 
        onSubmit={submitHandler(onSubmit)} 
        className={cn("space-y-4", className)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export { HBForm };
