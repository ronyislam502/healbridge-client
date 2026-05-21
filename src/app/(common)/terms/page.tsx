import { Icons } from "@/components/shared/Icons";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | HealBridge",
  description: "Terms of Service and conditions for using the HealBridge telemedicine platform.",
};

const termsData = [
  {
    id: "introduction",
    title: "1. Introduction",
    icon: <Icons.check className="w-5 h-5 text-teal-500" />,
    content: (
      <>
        <p className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
          Welcome to HealBridge. These Terms of Service ("Terms") govern your access to and use of our telemedicine platform, services, and website. By accessing or using HealBridge, you agree to be bound by these Terms and our Privacy Policy.
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          If you do not agree to these Terms, please do not use our services. We reserve the right to update these terms at any time, and continued use of the platform constitutes your acceptance of the new terms.
        </p>
      </>
    )
  },
  {
    id: "medical-disclaimer",
    title: "2. Medical Disclaimer",
    icon: <Icons.stethoscope className="w-5 h-5 text-teal-500" />,
    content: (
      <>
        <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-4 rounded-r-xl mb-4">
          <p className="text-red-700 dark:text-red-400 font-medium">
            <strong>IF YOU ARE EXPERIENCING A MEDICAL EMERGENCY, CALL YOUR LOCAL EMERGENCY SERVICES IMMEDIATELY.</strong>
          </p>
        </div>
        <p className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
          HealBridge provides a platform to connect patients with healthcare professionals. We do not provide medical advice, diagnosis, or treatment ourselves. The content on this platform is for informational purposes only and is not a substitute for professional medical judgment.
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Any advice or diagnosis provided by a doctor through our video consultation feature is strictly between the doctor and the patient. HealBridge holds no liability for the medical decisions made by the healthcare providers.
        </p>
      </>
    )
  },
  {
    id: "user-responsibilities",
    title: "3. User Responsibilities",
    icon: <Icons.userCheck className="w-5 h-5 text-teal-500" />,
    content: (
      <>
        <p className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
          As a user of HealBridge (whether a patient or a healthcare provider), you agree to:
        </p>
        <ul className="space-y-3 mb-4">
          {[
            "Provide accurate, current, and complete information during registration.",
            "Maintain the security and confidentiality of your account credentials.",
            "Not use the platform for any unlawful purpose or to solicit others to perform unlawful acts.",
            "Not harass, abuse, insult, harm, or discriminate against other users or our staff."
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-xs mr-3 mt-0.5">
                {index + 1}
              </span>
              <span className="text-slate-600 dark:text-slate-400">{item}</span>
            </li>
          ))}
        </ul>
      </>
    )
  },
  {
    id: "appointments-and-payments",
    title: "4. Appointments and Payments",
    icon: <Icons.creditCard className="w-5 h-5 text-teal-500" />,
    content: (
      <>
        <p className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
          Patients may book appointments with healthcare providers through our platform. By booking an appointment, you agree to pay the listed consultation fee.
        </p>
        <p className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong>Cancellations and Refunds:</strong> Appointments cancelled at least 24 hours in advance are eligible for a full refund. Cancellations made within 24 hours of the scheduled time may be subject to a cancellation fee or non-refundable, depending on the provider's policy.
        </p>
      </>
    )
  },
  {
    id: "privacy-and-data",
    title: "5. Privacy and Data Security",
    icon: <Icons.shieldCheck className="w-5 h-5 text-teal-500" />,
    content: (
      <>
        <p className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
          Your privacy is our utmost priority. We employ industry-standard encryption and security measures to protect your personal and medical data. For detailed information on how we collect, use, and protect your data, please refer to our <Link href="#" className="text-teal-600 hover:underline font-medium">Privacy Policy</Link>.
        </p>
      </>
    )
  }
];

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-blue-500/5 to-purple-500/10 dark:from-teal-900/20 dark:via-blue-900/10 dark:to-purple-900/20 pointer-events-none" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-pulse animation-delay-2000" />
        
        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Icons.shieldCheck className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest">Legal Information</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight italic mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Service</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Please read these terms carefully before using the HealBridge platform. Last updated on May 21, 2026.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar Navigation (Desktop) */}
          <aside className="hidden lg:block w-72 sticky top-24 shrink-0 animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-xl border border-slate-100 dark:border-slate-800">
              <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-sm mb-4">Table of Contents</h3>
              <nav className="space-y-1">
                {termsData.map((term) => (
                  <a 
                    key={term.id} 
                    href={`#${term.id}`}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/10 rounded-xl transition-all"
                  >
                    {term.icon}
                    {term.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content Sections */}
          <main className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="p-8 md:p-12">
                {termsData.map((term, index) => (
                  <div key={term.id} id={term.id} className="scroll-mt-32">
                    {index !== 0 && <hr className="my-10 border-slate-100 dark:border-slate-800" />}
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-6 flex items-center gap-3">
                      <div className="p-2.5 bg-teal-50 dark:bg-teal-900/10 rounded-xl border border-teal-100 dark:border-teal-900/20">
                        {term.icon}
                      </div>
                      {term.title}
                    </h2>
                    <div className="prose prose-slate dark:prose-invert max-w-none text-[15px] md:text-base">
                      {term.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black text-white italic tracking-tight mb-4">Still have questions?</h3>
                <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                  If you need any clarification on our Terms of Service or Privacy Policy, our support team is always here to help you.
                </p>
                <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-xl bg-teal-500 px-8 text-sm font-black uppercase tracking-widest italic text-white shadow-lg hover:bg-teal-400 hover:scale-105 transition-all">
                  Contact Support
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
