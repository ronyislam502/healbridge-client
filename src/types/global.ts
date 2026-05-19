import { BaseQueryApi } from "@reduxjs/toolkit/query";
import React from "react";


export type IInput = {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
};

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
  totalPages: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: string | React.Key;
};


export const bloodGroupOptions = [
    { value: 'A_POSITIVE', label: 'A+' },
    { value: 'B_POSITIVE', label: 'B+' },
    { value: 'O_POSITIVE', label: 'O+' },
    { value: 'AB_POSITIVE', label: 'AB+' },
    { value: 'A_NEGATIVE', label: 'A-' },
    { value: 'B_NEGATIVE', label: 'B-' },
    { value: 'O_NEGATIVE', label: 'O-' },
    { value: 'AB_NEGATIVE', label: 'AB-' },
  ];

 export const maritalStatusOptions = [
    { value: 'MARRIED', label: 'Married' },
    { value: 'UNMARRIED', label: 'Unmarried' },
  ];

export  const booleanOptions = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ];
