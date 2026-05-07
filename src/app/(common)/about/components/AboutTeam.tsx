"use client";

import React from "react";
import Image from "next/image";
import { Icons } from "@/components/shared/Icons";

const team = [
  {
    name: "Dr. Charles Scott",
    role: "Medical Director",
    image: "/doc-1.png",
    bio: "With over 15 years of experience in healthcare management.",
  },
  {
    name: "Dr. Michael Brown",
    role: "Chief Surgeon",
    image: "/doc-3.png",
    bio: "Specializing in advanced robotic-assisted surgeries.",
  },
  {
    name: "Dr. Sarah Johnson",
    role: "Head of Cardiology",
    image: "/doc-2.png",
    bio: "Pioneer in preventative heart health research.",
  },
  {
    name: "Dr. Emily Davis",
    role: "Lead Pediatrician",
    image: "/doc-4.png",
    bio: "Dedicated to providing compassionate care for children.",
  },
];

const AboutTeam = () => {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
            Our Leadership
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our <span className="text-blue-600">Expert</span> Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group border border-gray-100">
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
                  <div className="flex gap-4">
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                      <Icons.share2 className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-blue-400 transition-colors">
                      <Icons.mail className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
                      <Icons.globe className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-4">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
