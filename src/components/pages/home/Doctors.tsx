"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Icons } from "@/components/shared/Icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { useGetAllDoctorsQuery } from "@/redux/features/doctor/doctorApi";
import { TDoctor } from "@/types/user";
import DoctorCard from "../doctors/DoctorCard";

const Doctors = () => {
  const { data: doctorsData, isLoading } = useGetAllDoctorsQuery({});
  const doctors = doctorsData?.data || [];

  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  if (isLoading) {
    return (
      <section className="py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 text-center">
           <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Icons.loader2 className="w-8 h-8 text-blue-600 animate-spin" />
           </div>
           <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic">Synchronizing Medical Staff...</p>
        </div>
      </section>
    );
  }


  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
            Featured Doctors
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Highlighted</span> Doctor
          </h2>
        </div>

        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-6">
            {doctors.map((doctor: TDoctor) => (
              <CarouselItem key={doctor.id} className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <DoctorCard doctor={doctor} />
              </CarouselItem>
            ))}

          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Doctors;
