"use client";

import React from "react";
import { Icons } from "@/components/shared/Icons";

const stats = [
  {
    label: "Happy Patients",
    value: "10K+",
    icon: Icons.users,
    color: "bg-blue-600",
  },
  {
    label: "Expert Doctors",
    value: "500+",
    icon: Icons.userCheck,
    color: "bg-teal-500",
  },
  {
    label: "Medical Clinics",
    value: "100+",
    icon: Icons.hospital,
    color: "bg-orange-500",
  },
  {
    label: "Awards Won",
    value: "25+",
    icon: Icons.award,
    color: "bg-purple-600",
  },
];

const AboutStats = () => {
  return (
    <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className={`${stat.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <stat.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-black mb-2 tracking-tight">{stat.value}</h3>
              <p className="text-gray-400 font-bold uppercase tracking-wider text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
