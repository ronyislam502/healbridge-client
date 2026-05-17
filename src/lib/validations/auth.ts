import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const recoverSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type RecoverInput = z.infer<typeof recoverSchema>;

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;


export const patientRegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(1, "Phone number is required"),
  gender: z.enum(["MALE", "FEMALE"], "Gender is required"),
  avatar: z.any().optional(),
});


export type PatientRegisterInput = z.infer<typeof patientRegisterSchema>;

export const healthDataSchema = z.object({
  bloodGroup: z.string().optional(),
  dateOfBirth: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  hasAllergies: z.string().optional(),
  hasDiabetes: z.string().optional(),
  smokingStatus: z.string().optional(),
  pregnancyStatus: z.string().optional(),
  hasPastSurgeries: z.string().optional(),
  recentAnxiety: z.string().optional(),
  recentDepression: z.string().optional(),
  maritalStatus: z.string().optional(),
  dietaryPreferences: z.string().optional(),
  mentalHealthHistory: z.string().optional(),
  immunizationStatus: z.string().optional(),
});
