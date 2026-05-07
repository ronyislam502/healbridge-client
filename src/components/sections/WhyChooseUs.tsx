"use client";

import React from "react";
import { Icons } from "@/components/shared/Icons";
import { cn } from "@/lib/utils";

const reasons = [
  {
    title: "Follow-Up Care",
    description: "We ensure continuity of care through regular follow-ups and communication, helping you stay on track with health goals.",
    icon: Icons.messageSquare,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    title: "Patient-Centered",
    description: "We prioritize your comfort and preferences, tailoring our services to meet your individual needs and Care from Our Experts.",
    icon: Icons.heart,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    title: "Convenient Access",
    description: "Easily book appointments online or through our dedicated customer service team, with flexible hours to fit your schedule.",
    icon: Icons.clock,
    color: "text-teal-500",
    bg: "bg-teal-50",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
            Why Book With Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Compelling <span className="text-blue-600">Reasons</span> to Choose
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center mb-8 transition-transform group-hover:rotate-12",
                reason.bg
              )}>
                <reason.icon className={cn("w-10 h-10", reason.color)} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {reason.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
