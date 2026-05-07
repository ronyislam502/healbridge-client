"use client";

import Image from "next/image";
import { Heart, Activity, Brain, Baby, Microscope, Pill } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const specialties = [
  {
    title: "Cardiology",
    doctors: "254 Doctors",
    image: "/spec-1.png",
    icon: Heart,
    color: "text-red-500",
  },
  {
    title: "Orthopedics",
    doctors: "151 Doctors",
    image: "/spec-2.png",
    icon: Activity,
    color: "text-blue-500",
  },
  {
    title: "Neurology",
    doctors: "176 Doctors",
    image: "/spec-3.png",
    icon: Brain,
    color: "text-purple-500",
  },
  {
    title: "Pediatrics",
    doctors: "124 Doctors",
    image: "/spec-4.png",
    icon: Baby,
    color: "text-yellow-500",
  },
  {
    title: "Psychiatry",
    doctors: "112 Doctors",
    image: "/spec-1.png",
    icon: Microscope,
    color: "text-green-500",
  },
  {
    title: "Endocrinology",
    doctors: "104 Doctors",
    image: "/spec-2.png",
    icon: Pill,
    color: "text-pink-500",
  },
  {
    title: "Gastroenterology",
    doctors: "98 Doctors",
    image: "/spec-3.png",
    icon: Activity,
    color: "text-orange-500",
  },
  {
    title: "Dermatology",
    doctors: "87 Doctors",
    image: "/spec-4.png",
    icon: Heart,
    color: "text-teal-500",
  },
];

const Specialties = () => {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
            Top Specialties
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Highlighting the Care & Support
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Connect with specialized medical experts for your specific health needs. Our platform brings you the best in healthcare.
          </p>
        </div>

        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {specialties.map((item, index) => (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/6">
                  <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      
                      <div className={cn(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform",
                        "bg-white"
                      )}>
                        <item.icon className={cn("w-8 h-8", item.color)} />
                      </div>
                    </div>
                    
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium">
                        {item.doctors}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg hover:bg-blue-600 hover:text-white transition-all z-10" />
            <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg hover:bg-blue-600 hover:text-white transition-all z-10" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Specialties;
