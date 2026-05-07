"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Icons } from "@/components/shared/Icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";

const doctors = [
  {
    id: "1",
    name: "Dr. Charles Scott",
    specialty: "Neurologist",
    rating: "4.2",
    location: "Hamshire, TX",
    duration: "30 Min",
    fees: "$600",
    image: "/doc-1.png",
    available: true,
  },
  {
    id: "2",
    name: "Dr. Michael Brown",
    specialty: "Psychologist",
    rating: "5.0",
    location: "Minneapolis, MN",
    duration: "30 Min",
    fees: "$650",
    image: "/doc-2.png",
    available: true,
  },
  {
    id: "3",
    name: "Dr. Nicholas Tello",
    specialty: "Pediatrician",
    rating: "4.6",
    location: "Ogden, IA",
    duration: "60 Min",
    fees: "$350",
    image: "/doc-3.png",
    available: true,
  },
  {
    id: "4",
    name: "Dr. Harold Bryant",
    specialty: "Neurologist",
    rating: "4.8",
    location: "Winona, MS",
    duration: "30 Min",
    fees: "$500",
    image: "/doc-4.png",
    available: true,
  },
  {
    id: "5",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: "4.9",
    location: "Austin, TX",
    duration: "45 Min",
    fees: "$700",
    image: "/doc-2.png",
    available: true,
  },
];

const Doctors = () => {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

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
            {doctors.map((doctor, index) => (
              <CarouselItem key={index} className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
                  {/* Image Section */}
                  <Link href={`/doctors/${doctor.id}`} className="relative h-[300px] w-full overflow-hidden block">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
                      <Icons.star className="w-3 h-3 fill-current" />
                      {doctor.rating}
                    </div>
                    
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-md">
                      <Icons.heart className="w-5 h-5" />
                    </button>
                  </Link>

                  {/* Content Section */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
                        {doctor.specialty}
                      </span>
                      {doctor.available && (
                        <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-bold">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Available
                        </div>
                      )}
                    </div>

                    <Link href={`/doctors/${doctor.id}`}>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors cursor-pointer">
                        {doctor.name}
                      </h3>
                    </Link>

                    <div className="flex flex-col gap-2 mb-6">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Icons.mapPin className="w-4 h-4 text-gray-400" />
                        {doctor.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Icons.clock className="w-4 h-4 text-gray-400" />
                        {doctor.duration}
                      </div>
                    </div>

                    <div className="border-t border-dashed border-gray-200 pt-6 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-gray-400 text-xs font-medium uppercase mb-1">Consultation Fees</span>
                        <span className="text-2xl font-black text-orange-500">{doctor.fees}</span>
                      </div>
                      
                      <Link href={`/doctors/${doctor.id}`}>
                        <button className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all transform hover:rotate-6 shadow-lg shadow-gray-200">
                          <Icons.calendar className="w-6 h-6" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Doctors;
