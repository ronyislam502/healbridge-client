'use client';


import { FieldValues, SubmitHandler } from "react-hook-form";
import { HBForm } from "@/components/form/HBForm";
import { HBInput } from "@/components/form/HBInput";
import { Icons } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/validations/auth";
import Image from "next/image";
import { setToken } from "@/redux/features/auth/authSlice";
import { TError } from "@/types/global";
import { useDispatch } from "react-redux";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { useEffect } from "react";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  // console.log("searc", { email, token });

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (!token) return;
    localStorage.setItem("accessToken", token);
  }, [token]);

  const onSubmit = async (data: FieldValues) => {
    if (!email || !token) {
      toast.error("Invalid reset link. Please request a new one.");
      return;
    }

    try {
      const resetData = {
        email,
        newPassword: data.password,
      };

      const res = await resetPassword(resetData).unwrap();


      if (res?.success) {
        toast.success(res?.message || "Password reset successfully!");
        dispatch(setToken(null));
        router.push("/login");
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 p-10 bg-slate-900/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10">
      <div className="text-center space-y-3">
        <Image
          src="https://res.cloudinary.com/dkk9lvbtf/image/upload/v1778161565/1778077513978_solqyp.png"
          alt='HealBridge logo'
          width={150}
          height={120}
          className="mx-auto h-auto w-auto rounded-lg mb-4"
        />
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
