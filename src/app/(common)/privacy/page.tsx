import { Icons } from "@/components/shared/Icons";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | HealBridge",
  description: "Privacy Policy explaining how HealBridge collects, uses, and protects your data.",
};

const privacyData = [
  {
    id: "introduction",
    title: "1. Introduction",
    icon: <Icons.check className="w-5 h-5 text-teal-500" />,
    content: (
      <>
        <p className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
          At HealBridge, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our telemedicine platform.
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
        </p>
      </>
    )
  },
  {
    id: "information-collection",
    title: "2. Information We Collect",
    icon: <Icons.userCheck className="w-5 h-5 text-teal-500" />,
    content: (
      <>
        <p className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
          We may collect information about you in a variety of ways. The information we may collect on the platform includes:
        </p>
        <ul className="space-y-3 mb-4">
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-xs mr-3 mt-0.5">A</span>
            <span className="text-slate-600 dark:text-slate-400"><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the platform.</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-xs mr-3 mt-0.5">B</span>
            <span className="text-slate-600 dark:text-slate-400"><strong>Medical Data:</strong> Health history, prescriptions, and medical reports you choose to upload or share with healthcare professionals via our platform.</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-xs mr-3 mt-0.5">C</span>
            <span className="text-slate-600 dark:text-slate-400"><strong>Payment Data:</strong> Financial information necessary to process consultation payments. This data is securely handled by our third-party payment processors.</span>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "use-of-information",
    title: "3. How We Use Your Information",
    icon: <Icons.activity className="w-5 h-5 text-teal-500" />,
    content: (
      <>
        <p className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the platform to:
        </p>
        <ul className="space-y-3 mb-4">
          {[
            "Facilitate secure video consultations between patients and doctors.",
            "Process payments and refunds for medical services.",
            "Send you scheduling alerts, reminders, and confirmations.",
            "Monitor and analyze usage and trends to improve your experience."
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <Icons.checkCircle className="w-4 h-4 text-teal-500 mr-3 mt-1 shrink-0" />
              <span className="text-slate-600 dark:text-slate-400">{item}</span>
            </li>
          ))}
        </ul>
      </>
    )
  },
  {
    id: "data-security",
    title: "4. Data Security",
    icon: <Icons.shieldCheck className="w-5 h-5 text-teal-500" />,
    content: (
      <>
        <p className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
          We use administrative, technical, and physical security measures to help protect your personal and medical information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-4 rounded-r-xl mb-4">
          <p className="text-blue-700 dark:text-blue-400 text-sm font-medium">
            We encrypt all video calls end-to-end to ensure your consultations remain strictly confidential.
          </p>
        </div>
      </>
    )
  },
  {
    id: "third-party",
    title: "5. Third-Party Services",
    icon: <Icons.globe className="w-5 h-5 text-teal-500" />,
    content: (
      <>
        <p className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
          The platform may contain links to third-party websites and applications of interest, including advertisements and external services. Once you have used these links to leave the platform, any information you provide to these third parties is not covered by this Privacy Policy.
        </p>
      </>
    )
  }
];

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 dark:from-emerald-900/20 dark:via-teal-900/10 dark:to-cyan-900/20 pointer-events-none" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-pulse" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-pulse animation-delay-2000" />
        
        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Icons.shieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest">Privacy First</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight italic mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-600">Policy</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Learn how we collect, protect, and use your personal and medical data. Last updated on May 21, 2026.
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
                {privacyData.map((term) => (
                  <a 
                    key={term.id} 
                    href={`#${term.id}`}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 rounded-xl transition-all"
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
                {privacyData.map((term, index) => (
                  <div key={term.id} id={term.id} className="scroll-mt-32">
                    {index !== 0 && <hr className="my-10 border-slate-100 dark:border-slate-800" />}
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-6 flex items-center gap-3">
                      <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/20">
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
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black text-white italic tracking-tight mb-4">Have privacy concerns?</h3>
                <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                  If you have questions or comments about this Privacy Policy, please do not hesitate to contact our Data Protection Officer.
                </p>
                <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-500 px-8 text-sm font-black uppercase tracking-widest italic text-white shadow-lg hover:bg-emerald-400 hover:scale-105 transition-all">
                  Contact Privacy Team
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
