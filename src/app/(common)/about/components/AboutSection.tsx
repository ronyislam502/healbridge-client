"use client";

import React from "react";
import Image from "next/image";
import { Icons } from "@/components/shared/Icons";

const AboutSection = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image Grid */}
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-72 rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src="/about-1.png"
                    alt="Medical Team"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src="/about-2.png"
                    alt="Doctor Consultation"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="pt-12 space-y-4">
                <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-center text-center h-48">
                  <span className="text-4xl font-bold mb-2">25+</span>
                  <span className="text-sm font-medium uppercase tracking-wider">Years of Experience</span>
                </div>
                <div className="relative h-72 rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src="/doc-1.png"
                    alt="Our Facility"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Background decoration */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full blur-3xl opacity-50" />
          </div>

          {/* Content */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">About Our Company</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                We Are Always Ensure Best Medical Treatment For Your Health
              </h2>
            </div>
            
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                At HealBridge, we understand the importance of accessible and convenient healthcare. Our mission is to simplify the process of finding and booking appointments with qualified healthcare professionals, ensuring that you receive the care you need when you need it.
              </p>
              <p>
                We envision a world where healthcare is easily accessible to everyone. Whether you're seeking routine check-ups, specialized consultations, or emergency care, we strive to connect you with the right medical professionals effortlessly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                "Expert Medical Professionals",
                "Advanced Health Solutions",
                "24/7 Patient Support",
                "Personalized Care Plans"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Icons.checkCircle className="w-6 h-6 text-blue-600 shrink-0" />
                  <span className="font-semibold text-gray-900">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t flex flex-col sm:flex-row items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <Icons.phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Need Emergency?</p>
                  <p className="text-xl font-bold text-gray-900">+1 315 369 5943</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
