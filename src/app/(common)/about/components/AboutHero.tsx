"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="bg-blue-50/50 py-12 border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4 bg-white px-4 py-2 rounded-full shadow-sm">
            <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">About Us</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">About Us</h1>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
