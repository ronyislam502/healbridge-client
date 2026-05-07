import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { ContactForm } from '@/components/sections/ContactForm';

export const metadata = {
  title: 'Contact Us | HealBridge',
  description: 'Get in touch with HealBridge for support, inquiries, or feedback.',
};

const contactInfo = [
  {
    icon: Icons.phone,
    title: 'Call Us',
    details: '+1 (315) 369-5943',
    subText: 'Mon-Fri from 8am to 6pm',
    color: 'bg-blue-500',
  },
  {
    icon: Icons.mail,
    title: 'Email Us',
    details: 'support@healbridge.com',
    subText: 'Online support 24/7',
    color: 'bg-teal-500',
  },
  {
    icon: Icons.mapPin,
    title: 'Visit Us',
    details: '123 Healthcare Plaza',
    subText: 'New York, NY 10001',
    color: 'bg-purple-500',
  },
];

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-black tracking-widest text-teal-400 uppercase bg-teal-400/10 rounded-full border border-teal-400/20">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight italic mb-6">
            We're Here to <span className="text-teal-400 text-glow">Help You</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            Have questions about our platform or need assistance with your healthcare journey? Our team is ready to support you.
          </p>
        </div>
      </section>

      {/* Info & Form Section */}
      <section className="py-24 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="group p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`w-16 h-16 ${info.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 transition-transform`}>
                    <info.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic mb-2">
                    {info.title}
                  </h4>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {info.details}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    {info.subText}
                  </p>
                </div>
              ))}
              
              {/* Social Connect */}
              <div className="p-8 rounded-[2.5rem] bg-teal-500 text-white shadow-2xl">
                <h4 className="text-xl font-black uppercase tracking-wider italic mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  {[Icons.facebook, Icons.twitter, Icons.instagram, Icons.globe].map((Icon, idx) => (
                    <button key={idx} className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center hover:bg-white hover:text-teal-500 transition-all cursor-pointer">
                      <Icon className="w-6 h-6" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="rounded-[3rem] overflow-hidden h-[500px] shadow-2xl border-8 border-white dark:border-slate-800 relative group">
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
               {/* Replace with real Google Map iframe if needed */}
               <div className="text-center">
                 <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                   <Icons.mapPin className="w-10 h-10 text-teal-500" />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider italic">
                   Our Headquarters
                 </h3>
                 <p className="text-slate-500 dark:text-slate-400 font-medium">
                   123 Healthcare Plaza, New York, NY 10001
                 </p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
