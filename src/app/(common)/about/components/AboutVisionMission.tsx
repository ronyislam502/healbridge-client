"use client";

import React from "react";
import { Icons } from "@/components/shared/Icons";

const AboutVisionMission = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950/40 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">
            Purpose & Values
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Driving the Future of Healthcare
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Our vision and mission guide every decision we make as we build a healthier, more connected tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vision Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-slate-100/50 dark:shadow-none hover:shadow-2xl dark:hover:border-teal-500/30 transition-all duration-300 group flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icons.globe className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  To create a globally connected healthcare ecosystem where every patient has instant, secure, and hassle-free access to top-tier medical care.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
              {[
                "Global accessibility without borders",
                "Seamless patient-doctor interactions",
                "Empowerment through digital health records"
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Icons.checkCircle className="w-5 h-5 text-teal-500 shrink-0" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-slate-100/50 dark:shadow-none hover:shadow-2xl dark:hover:border-blue-500/30 transition-all duration-300 group flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icons.heartPulse className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  To simplify healthcare scheduling, consulting, and management through intuitive technology, giving patients peace of mind and enabling doctors to deliver their best care.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
              {[
                "Secure, encrypted, and private health records",
                "Trustworthy, fully verified medical network",
                "Continuous platform innovation and support"
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Icons.checkCircle className="w-5 h-5 text-blue-500 shrink-0" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVisionMission;
