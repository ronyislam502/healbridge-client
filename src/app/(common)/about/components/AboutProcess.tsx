"use client";

import React from "react";
import { Icons } from "@/components/shared/Icons";

const steps = [
  {
    title: "Search Doctor",
    description: "Search for doctors based on specialty, location, or availability.",
    icon: Icons.search,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "View Profile",
    description: "Read doctor profiles, ratings, and feedback from other patients.",
    icon: Icons.userCheck,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    title: "Book Appointment",
    description: "Select a convenient time slot and book your appointment instantly.",
    icon: Icons.calendar,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    title: "Get Treatment",
    description: "Visit the clinic or have a virtual consultation with your doctor.",
    icon: Icons.heartPulse,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const AboutProcess = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It <span className="text-blue-600">Works</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            HealBridge simplifies your healthcare journey in four easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-100 -z-10 -translate-x-1/2" />
              )}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                <div className={`${step.bg} w-24 h-24 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <step.icon className={`w-10 h-10 ${step.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
                <div className="mt-6 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutProcess;
