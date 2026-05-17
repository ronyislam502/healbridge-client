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


export const maritalStatus=[{ key: 'MARRIED', label: 'Married' }, { key: 'UNMARRIED', label: 'Unmarried' }]
export const options = [{ key: 'true', label: 'Yes' }, { key: 'false', label: 'No' }]
export const bloods=[
              { key: 'NONE', label: 'None / Unknown' },
              { key: 'A_POSITIVE', label: 'A+' },
              { key: 'A_NEGATIVE', label: 'A-' },
              { key: 'B_POSITIVE', label: 'B+' },
              { key: 'B_NEGATIVE', label: 'B-' },
              { key: 'AB_POSITIVE', label: 'AB+' },
              { key: 'AB_NEGATIVE', label: 'AB-' },
              { key: 'O_POSITIVE', label: 'O+' },
              { key: 'O_NEGATIVE', label: 'O-' },
            ]
