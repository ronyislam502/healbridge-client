'use client';

import React from 'react';
import Link from 'next/link';
import { Icons } from '@/components/shared/Icons';
import Image from 'next/image';

const footerLinks = [
  {
    title: 'For Patients',
    links: [
      { name: 'Search for Doctors', href: '/doctors' },
      { name: 'Login', href: '/login' },
      { name: 'Register', href: '/login?tab=register' },
      { name: 'Booking', href: '/booking' },
      { name: 'Patient Dashboard', href: '/patient/dashboard' },
    ],
  },
  {
    title: 'For Doctors',
    links: [
      { name: 'Appointments', href: '/doctor/appointments' },
      { name: 'Chat', href: '/doctor/chat' },
      { name: 'Login', href: '/login' },
      { name: 'Register', href: '/doctor/register' },
      { name: 'Doctor Dashboard', href: '/doctor/dashboard' },
    ],
  },
  {
    title: 'Contact Us',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo & About */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="https://res.cloudinary.com/dkk9lvbtf/image/upload/v1778161565/1778077513978_solqyp.png"
                alt='HealBridge logo' 
                width={150} 
                height={120} 
                className="h-auto w-auto rounded-lg"
              />
            </Link>
            <p className="text-slate-400 max-w-sm leading-relaxed text-lg">
              HealBridge is a comprehensive healthcare platform dedicated to connecting patients with world-class medical professionals effortlessly.
            </p>
            <div className="flex gap-4">
              {[Icons.facebook, Icons.twitter, Icons.instagram, Icons.globe].map((Icon, idx) => (
                <button key={idx} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all cursor-pointer border border-slate-700">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h4 className="text-white font-bold text-lg uppercase tracking-wider">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link href={link.href} className="hover:text-teal-400 transition-colors flex items-center gap-2 group">
                      <div className="w-1 h-1 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500 font-medium">
            © {new Date().getFullYear()} HealBridge. All rights reserved. Designed with ❤️ for better health.
          </p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Icons.phone className="w-4 h-4 text-teal-500" />
              <span className="text-white font-bold">+1 315 369 5943</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.mail className="w-4 h-4 text-teal-500" />
              <span className="text-white font-bold">support@healbridge.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
