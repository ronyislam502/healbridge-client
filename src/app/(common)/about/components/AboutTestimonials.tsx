"use client";

import React from "react";
import { Icons } from "@/components/shared/Icons";
import Image from "next/image";

const testimonials = [
  {
    name: "Kelly Williams",
    role: "Patient",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    content: "HealBridge made it so easy to find a specialist for my condition. The booking process was seamless and the doctor was excellent.",
    rating: 5,
  },
  {
    name: "James Doe",
    role: "Patient",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    content: "I've been using this platform for all my family's medical needs. The convenience of seeing available slots in real-time is a game changer.",
    rating: 5,
  },
  {
    name: "Sarah Jenkins",
    role: "Patient",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    content: "Excellent service and very user-friendly. I highly recommend HealBridge to anyone looking for reliable healthcare services.",
    rating: 4,
  },
];

const AboutTestimonials = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-blue-600">Patients</span> Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-gray-50 p-10 rounded-[2.5rem] relative group hover:bg-blue-600 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200">
              <Icons.quote className="absolute top-8 right-8 w-12 h-12 text-blue-100 group-hover:text-blue-400/30 transition-colors" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-md">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-white transition-colors">{t.name}</h4>
                  <p className="text-sm text-gray-500 group-hover:text-blue-100 transition-colors">{t.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Icons.star key={i} className={`w-4 h-4 ${i < t.rating ? "text-orange-400 fill-current" : "text-gray-300"}`} />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed group-hover:text-white transition-colors text-lg italic">
                &quot;{t.content}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTestimonials;
