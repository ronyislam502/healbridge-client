'use client';


import Link from 'next/link';
import { Icons } from '@/components/shared/Icons';
import Image from 'next/image';

const footerLinks = [
  {
    title: 'For Patients',
    links: [
      { name: 'Find a Doctor', href: '/doctors' },
      { name: 'Patient Login', href: '/login' },
      { name: 'Create Account', href: '/login?tab=register' },
      { name: 'How it Works', href: '/#process' },
    ],
  },
  {
    title: 'For Doctors',
    links: [
      { name: 'Doctor Login', href: '/login' },
      { name: 'Join as Specialist', href: '/doctor/register' },
      { name: 'Partner with Us', href: '/contact' },
      { name: 'Careers', href: '/about' },
    ],
  },
  {
    title: 'Legal & Support',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact Support', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="relative bg-slate-950 text-slate-300 pt-24 pb-12 overflow-hidden border-t border-slate-900">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">

          {/* Logo & About */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="inline-block relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100" />
              <Image
                src="https://res.cloudinary.com/dkk9lvbtf/image/upload/v1778161565/1778077513978_solqyp.png"
                alt='HealBridge logo'
                width={160}
                height={120}
                className="h-auto w-auto rounded-xl relative z-10 shadow-2xl"
              />
            </Link>

            <p className="text-slate-400 max-w-sm leading-relaxed text-sm font-medium">
              Transforming the future of healthcare. HealBridge seamlessly connects patients with world-class medical professionals through intelligent, digital-first experiences.
            </p>

            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Subscribe to Newsletter</h4>
              <div className="flex items-center gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-900/50 border border-slate-800 text-sm text-white px-4 py-3 rounded-xl w-full focus:outline-none focus:border-teal-500/50 transition-colors placeholder:text-slate-600"
                />
                <button className="bg-teal-500 hover:bg-teal-400 text-slate-950 px-4 py-3 rounded-xl font-bold transition-colors">
                  <Icons.send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-8">
              <h4 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link href={link.href} className="text-sm font-medium text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-3 group">
                      <Icons.chevronRight className="w-3 h-3 text-slate-700 group-hover:text-teal-500 transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-semibold text-slate-500 tracking-wide">
            © {new Date().getFullYear()} HEALBRIDGE INC. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              {[Icons.facebook, Icons.twitter, Icons.instagram, Icons.linkedin].map((Icon, idx) => (
                <button key={idx} className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 hover:bg-teal-500 hover:text-white hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] transition-all cursor-pointer border border-slate-800">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-slate-800 hidden md:block" />

            <div className="flex items-center gap-6 hidden md:flex">
              <a href="tel:+13153695943" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-teal-400 transition-colors">
                <Icons.phone className="w-3.5 h-3.5" />
                +1 315 369 5943
              </a>
              <a href="mailto:support@healbridge.com" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-teal-400 transition-colors">
                <Icons.mail className="w-3.5 h-3.5" />
                SUPPORT@HEALBRIDGE.COM
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
