import Image from 'next/image';
import { ResetPasswordForm } from '@/components/pages/auth/reset-password-form';


const ResetPassword = () => {
    
    return (
        <main className="relative h-full w-full flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/login-bg.png"
          alt="Medical Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 via-slate-950/80 to-slate-950" />
      </div>

      {/* Decorative Blur Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />

      {/* Form Section */}
      <ResetPasswordForm />

      {/* Floating Elements for Premium Feel */}
      <div className="absolute top-1/4 right-10 w-24 h-24 bg-teal-500/5 rounded-full blur-3xl animate-bounce-slow" />
      <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-bounce-slow delay-700" />
    </main>
    )
}

export default ResetPassword;