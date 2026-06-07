"use client";

import React, { ReactNode } from "react";
import { 
  FormProvider, 
  FieldValues, 
  SubmitHandler, 
  useForm, 
  UseFormProps,
  UseFormReturn,
  DefaultValues
} from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormConfig<T extends FieldValues> {
  defaultValues?: DefaultValues<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolver?: any;
}

interface HBFormProps<T extends FieldValues> extends FormConfig<T> {
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods?: any;
  className?: string;
}

const HBForm = <T extends FieldValues>({ 
  children, 
  onSubmit, 
  defaultValues, 
  resolver, 
  methods: externalMethods,
  className
}: HBFormProps<T>) => {
  const formConfig: UseFormProps<T> = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const internalMethods = useForm(formConfig);
  const methods = externalMethods || internalMethods;

  const { reset } = methods;

  const defaultValuesRef = React.useRef(defaultValues);

  React.useEffect(() => {
    const prev = defaultValuesRef.current;
    if (JSON.stringify(prev) !== JSON.stringify(defaultValues)) {
      if (defaultValues) {
        reset(defaultValues);
      }
      defaultValuesRef.current = defaultValues;
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
