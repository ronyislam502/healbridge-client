'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Icons } from '@/components/shared/Icons';
import { HBInput } from '@/components/shared/HBInput';
import { HBForm } from '@/components/shared/HBForm';
import { HBSelect } from '@/components/shared/HBSelect';
import { patientRegisterSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues } from 'react-hook-form';
import { useSignUpMutation } from '@/redux/features/user/userApi';

interface RegisterSectionProps {
  onSuccess: () => void;
}

export const RegisterSection = ({ onSuccess }: RegisterSectionProps) => {
  const [signUp, { isLoading: isRegisterLoading }] = useSignUpMutation();
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const onRegisterSubmit = async (data: FieldValues) => {
    const formData = new FormData();
    try {
      const registerData = {
        password: data.password,
        patient: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          gender: data.gender,
        }
      };

      formData.append("data", JSON.stringify(registerData));
      if (selectedImage) {
        formData.append("avatar", selectedImage);
      }

      const res = await signUp(formData).unwrap();
      if (res?.success) {
        toast.success("Registration successful! Please sign in.");
        onSuccess();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          Create Patient Account
        </h3>
        <p className="text-sm text-slate-500 mt-1">Join the HealBridge medical network today.</p>
      </div>

      <HBForm
        resolver={zodResolver(patientRegisterSchema)}
        onSubmit={onRegisterSubmit}
        className="space-y-6"
      >
        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-20 h-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all hover:border-blue-500 group cursor-pointer">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <Icons.user className="w-8 h-8 text-slate-400 group-hover:text-blue-500" />
            )}
            <input type="file" accept="image/*" onChange={handleImage} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Profile Photo</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <HBInput
            label="Full Name"
            name="name"
            placeholder="John Doe"
            className="h-12 rounded-xl focus:border-blue-600 focus:ring-blue-600/10"
          />
          <HBInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="name@example.com"
            className="h-12 rounded-xl focus:border-blue-600 focus:ring-blue-600/10"
          />
          <div className="grid grid-cols-2 gap-4">
            <HBInput
              label="Phone Number"
              name="phone"
              placeholder="+1..."
              className="h-12 rounded-xl focus:border-blue-600 focus:ring-blue-600/10"
            />
            <HBSelect
              label="Gender"
              name="gender"
              placeholder="Select"
              options={[
                { label: "Male", value: "MALE" },
                { label: "Female", value: "FEMALE" }
              ]}
              className="h-12 rounded-xl focus:border-blue-600"
            />
          </div>
          <HBInput
            label="Create Password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="h-12 rounded-xl focus:border-blue-600 focus:ring-blue-600/10"
          />
        </div>

        <Button
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-base font-bold transition-all shadow-lg shadow-blue-600/20 mt-2"
          type="submit"
          disabled={isRegisterLoading}
        >
          {isRegisterLoading ? <Icons.loader2 className="w-5 h-5 animate-spin" /> : "Register Account"}
        </Button>
      </HBForm>

      <p className="text-center text-sm text-slate-500">
        Already have an account? <span onClick={onSuccess} className="text-blue-600 font-bold cursor-pointer hover:underline">Sign In</span>
      </p>
    </div>
  );
};
