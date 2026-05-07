'use client';

import * as React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { HBForm } from "@/components/shared/HBForm";
import { HBInput } from "@/components/shared/HBInput";
import { Icons } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/validations/auth";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Reset Password Data:", data);
      toast.success("Password reset successful!");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 p-10 bg-slate-900/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-teal-500/10 border border-teal-500/20 mb-4 animate-bounce-slow">
          <Icons.lock className="w-10 h-10 text-teal-400" />
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight italic">
          Set New <span className="text-teal-400">Password</span>
        </h1>
        <p className="text-slate-400 font-medium">
          Choose a strong password to protect your account.
        </p>
      </div>

      <HBForm onSubmit={onSubmit} resolver={zodResolver(resetPasswordSchema)}>
        <div className="space-y-6">
          <HBInput
            label="New Password"
            name="password"
            type="password"
            placeholder="••••••••"
            icon={<Icons.lock className="h-4 w-4" />}
            required
          />

          <HBInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            icon={<Icons.shieldCheck className="h-4 w-4" />}
            required
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-lg uppercase tracking-widest shadow-lg shadow-teal-500/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <Icons.loader2 className="w-6 h-6 animate-spin" />
            ) : (
              "Update Password"
            )}
          </Button>

          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-teal-400 transition-colors group"
            >
              <Icons.arrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Login
            </Link>
          </div>
        </div>
      </HBForm>

      {/* Decorative inner glow */}
      <div className="absolute inset-0 rounded-[2.5rem] border border-teal-500/10 pointer-events-none" />
    </div>
  );
};

export { ResetPasswordForm };
