'use client';

import * as React from 'react';
import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const HealthApp = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-[#0eb0f0] rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between min-h-[600px] shadow-2xl">

          {/* Abstract Background Shapes */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/4 -left-10 w-48 h-64 bg-blue-600/20 rounded-[4rem] rotate-45 blur-xl" />
          <div className="absolute bottom-0 left-32 w-64 h-64 bg-white/10 rounded-full blur-2xl translate-y-1/2" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-600/20 rounded-[5rem] rotate-12 blur-2xl" />
          <div className="absolute top-10 right-20 w-32 h-32 border-4 border-white/10 rounded-full blur-[2px]" />

          {/* Left Content */}
          <div className="relative z-20 w-full lg:w-1/2 text-white space-y-6 mb-16 lg:mb-0">
            <h2 className="text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.1] tracking-tight">
              Download the HealBridge<br />App today!
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
              To download an app related to a doctor or medical services, you can typically visit the app store on your device.
            </p>
            <div className="flex flex-wrap gap-4 pt-6">
              {/* Google Play Button */}
              <Button variant="outline" className="bg-black hover:bg-slate-900 border-none text-white h-auto px-6 py-3 rounded-xl flex items-center gap-3 transition-transform hover:scale-105 shadow-xl hover:text-white">
                <svg viewBox="0 0 512 512" className="w-8 h-8" fill="currentColor">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" fill="url(#play-gradient)" />
                  <defs>
                    <linearGradient id="play-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00e676" />
                      <stop offset="50%" stopColor="#00b0ff" />
                      <stop offset="100%" stopColor="#ffea00" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-gray-300 tracking-wider leading-none">Get it on</div>
                  <div className="text-lg font-bold leading-none mt-1">Google Play</div>
                </div>
              </Button>

              {/* App Store Button */}
              <Button variant="outline" className="bg-black hover:bg-slate-900 border-none text-white h-auto px-6 py-3 rounded-xl flex items-center gap-3 transition-transform hover:scale-105 shadow-xl hover:text-white">
                <svg viewBox="0 0 384 512" className="w-8 h-8 text-white" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-gray-300 tracking-wider leading-none">Download on the</div>
                  <div className="text-lg font-bold leading-none mt-1">App Store</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Right Content - Phone Mockups */}
          <div className="relative z-10 w-full lg:w-1/2 h-[450px] lg:h-[600px] flex items-end justify-center lg:justify-end mt-8 lg:mt-0 lg:-mb-16">

            {/* Background Phone (Find Doctor) */}
            <div className="absolute bottom-0 right-4 lg:right-0 w-[260px] h-[520px] bg-white rounded-[2.5rem] shadow-2xl border-[6px] border-white overflow-hidden transform translate-x-12 -translate-y-8 z-10 hidden md:block">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-white rounded-b-xl z-20 flex justify-center items-center">
                <div className="w-10 h-1 rounded-full bg-slate-200"></div>
              </div>

              {/* Header */}
              <div className="bg-[#1b4e6b] text-white p-4 pt-8 h-24">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Icons.menu className="w-4 h-4" />
                    <span className="font-semibold text-sm">Find Doctor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.bell className="w-4 h-4" />
                    <Icons.moreVertical className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Search Box */}
              <Card className="mx-4 -mt-6 bg-white rounded-xl shadow-lg p-3 relative z-10 border border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 border-b pb-2">
                  <Icons.mapPin className="w-3 h-3" />
                  <span>Search Location</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <Icons.building className="w-3 h-3" />
                  <span>Hospital</span>
                </div>
                <Button className="w-full bg-[#0eb0f0] hover:bg-[#0da0da] text-white py-2 h-auto rounded-lg text-xs font-bold">Search Now</Button>
              </Card>

              {/* Content */}
              <div className="p-4 pt-6 bg-slate-50 min-h-full">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-slate-800">Specialities</span>
                  <span className="text-[10px] text-slate-500">View All</span>
                </div>
                <div className="flex justify-between mb-6">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white"><Icons.activity className="w-4 h-4" /></div>
                    <span className="text-[8px] font-medium text-slate-600">Urology</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white"><Icons.brain className="w-4 h-4" /></div>
                    <span className="text-[8px] font-medium text-slate-600">Neurology</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-[#0eb0f0] flex items-center justify-center text-white"><Icons.heart className="w-4 h-4" /></div>
                    <span className="text-[8px] font-medium text-slate-600">Cardiology</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white"><Icons.star className="w-4 h-4" /></div>
                    <span className="text-[8px] font-medium text-slate-600">Dentist</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-800">Find Doctors</span>
                  <span className="text-[10px] text-slate-500">View All</span>
                </div>

                {/* Doctor Card Mock */}
                <Card className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3">
                  <div className="w-12 h-12 bg-slate-200 rounded-lg shrink-0"></div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-800">Dr. Ruby Perrin</div>
                    <div className="text-[9px] text-slate-500 mb-1">MDS - Periodontology</div>
                    <div className="text-[10px] text-[#0eb0f0] font-medium">Dentist</div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Foreground Phone (Search by Doctor) */}
            <div className="absolute bottom-0 right-10 lg:right-32 w-[280px] h-[580px] bg-white rounded-[3rem] shadow-2xl shadow-black/40 border-[8px] border-white overflow-hidden z-20">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-white rounded-b-2xl z-20 flex justify-center items-center">
                <div className="w-12 h-1.5 rounded-full bg-slate-200"></div>
              </div>

              {/* Header */}
              <div className="bg-[#1b4e6b] text-white p-5 pt-10 h-28">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Icons.menu className="w-5 h-5" />
                    <span className="font-semibold">Search by Doctor</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icons.bell className="w-5 h-5" />
                    <Icons.moreVertical className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2 px-4 -mt-4 relative z-10 overflow-hidden">
                <div className="bg-white text-slate-700 text-[10px] font-semibold px-3 py-1.5 rounded-full shadow border border-slate-100 flex items-center gap-1">
                  <span className="text-yellow-400">★</span> Rating
                </div>
                <div className="bg-white text-slate-700 text-[10px] font-semibold px-3 py-1.5 rounded-full shadow border border-slate-100 flex items-center gap-1">
                  <Icons.activity className="w-3 h-3 text-slate-400" /> Stethoscope
                </div>
                <div className="bg-white text-slate-700 text-[10px] font-semibold px-3 py-1.5 rounded-full shadow border border-slate-100 flex items-center gap-1">
                  <Icons.briefcase className="w-3 h-3 text-orange-400" /> Purse
                </div>
              </div>

              {/* Content */}
              <div className="p-4 pt-6 bg-slate-50 min-h-full">

                {/* Doctor Card 1 */}
                <Card className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-4">
                  <div className="flex gap-3 mb-4">
                    <Avatar className="w-16 h-16 rounded-xl shrink-0">
                      <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Doctor" className="object-cover" />
                      <AvatarFallback className="rounded-xl">RP</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-800 leading-tight">Dr. Ruby Perrin</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">MDS - Periodontology, BDS</div>
                      <div className="flex justify-between items-end mt-1">
                        <div className="flex items-center gap-1 text-[#0eb0f0]">
                          <Icons.activity className="w-3 h-3" />
                          <span className="text-[11px] font-semibold">Dentist</span>
                        </div>
                        <div className="text-[10px] font-bold text-orange-500">9+ Exp</div>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex text-yellow-400 text-[8px]">★★★★★</div>
                        <span className="text-[10px] text-slate-400">(47)</span>
                        <div className="ml-auto flex items-center gap-1 text-slate-500">
                          <Icons.mapPin className="w-3 h-3" />
                          <span className="text-[9px]">Florida, USA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] border-t border-dashed pt-3 mb-3">
                    <div className="flex items-center gap-1 text-slate-600"><Icons.thumbsUp className="w-3 h-3" /> 98%</div>
                    <div className="flex items-center gap-1 text-slate-600"><Icons.dollarSign className="w-3 h-3" /> $300 - $1000</div>
                  </div>
                  <Button className="w-full bg-[#0eb0f0] hover:bg-[#0da0da] text-white py-2.5 h-auto rounded-xl text-xs font-bold transition-transform hover:scale-[1.02]">
                    Book Appointment
                  </Button>
                </Card>

                {/* Doctor Card 2 */}
                <Card className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex gap-3 mb-4">
                    <Avatar className="w-16 h-16 rounded-xl shrink-0">
                      <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="Doctor" className="object-cover" />
                      <AvatarFallback className="rounded-xl">KB</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-800 leading-tight">Dr. Katharine Berthold</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">MS, MBBS, M.Ch - Orthopaedics</div>
                      <div className="flex justify-between items-end mt-1">
                        <div className="flex items-center gap-1 text-[#0eb0f0]">
                          <Icons.activity className="w-3 h-3" />
                          <span className="text-[11px] font-semibold">Dentist</span>
                        </div>
                        <div className="text-[10px] font-bold text-orange-500">15+ Exp</div>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex text-yellow-400 text-[8px]">★★★★★</div>
                        <span className="text-[10px] text-slate-400">(16592)</span>
                        <div className="ml-auto flex items-center gap-1 text-slate-500">
                          <Icons.mapPin className="w-3 h-3" />
                          <span className="text-[9px]">Florida, USA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] border-t border-dashed pt-3 mb-3">
                    <div className="flex items-center gap-1 text-slate-600"><Icons.thumbsUp className="w-3 h-3" /> 98%</div>
                    <div className="flex items-center gap-1 text-slate-600"><Icons.dollarSign className="w-3 h-3" /> $300 - $1000</div>
                  </div>
                  <Button className="w-full bg-[#0eb0f0] hover:bg-[#0da0da] text-white py-2.5 h-auto rounded-xl text-xs font-bold transition-transform hover:scale-[1.02]">
                    Book Appointment
                  </Button>
                </Card>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthApp;

