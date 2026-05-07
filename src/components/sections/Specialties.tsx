"use client";

import Image from "next/image";
import { Icons } from "@/components/shared/Icons";
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
    image: "/specialties/cardiology.png",
    icon: Icons.heart,
    color: "text-red-500",
  },
  {
    title: "Orthopedics",
    doctors: "151 Doctors",
    image: "/specialties/orthopedics.png",
    icon: Icons.bone,
    color: "text-blue-500",
  },
  {
    title: "Neurology",
    doctors: "176 Doctors",
    image: "/specialties/neurology.png",
    icon: Icons.brain,
    color: "text-purple-500",
  },
  {
    title: "Pediatrics",
    doctors: "124 Doctors",
    image: "/specialties/pediatrics.png",
    icon: Icons.baby,
    color: "text-yellow-500",
  },
  {
    title: "Dentistry",
    doctors: "135 Doctors",
    image: "/specialties/dentistry.png",
    icon: Icons.tooth,
    color: "text-teal-500",
  },
  {
    title: "Ophthalmology",
    doctors: "89 Doctors",
    image: "/specialties/ophthalmology.png",
    icon: Icons.eye,
    color: "text-indigo-500",
  },
  {
    title: "Psychiatry",
    doctors: "112 Doctors",
    image: "/specialties/psychiatry.png",
    icon: Icons.userCheck,
    color: "text-green-500",
  },
  {
    title: "Pulmonology",
    doctors: "92 Doctors",
    image: "/specialties/pulmonology.png",
    icon: Icons.lungs,
    color: "text-cyan-500",
  },
  {
    title: "Oncology",
    doctors: "78 Doctors",
    image: "/specialties/oncology.png",
    icon: Icons.dna,
    color: "text-rose-500",
  },
  {
    title: "Endocrinology",
    doctors: "104 Doctors",
    image: "/specialties/endocrinology.png",
    icon: Icons.pill,
    color: "text-pink-500",
  },
  {
    title: "General Surgery",
    doctors: "142 Doctors",
    image: "/specialties/general_surgery.png",
    icon: Icons.stethoscope,
    color: "text-slate-600",
  },
  {
    title: "Urology",
    doctors: "67 Doctors",
    image: "/specialties/urology.png",
    icon: Icons.activity,
    color: "text-blue-600",
  },
  {
    title: "Gastroenterology",
    doctors: "98 Doctors",
    image: "/specialties/gastroenterology.png",
    icon: Icons.activity,
    color: "text-orange-500",
  },
  {
    title: "Dermatology",
    doctors: "87 Doctors",
    image: "/specialties/dermatology.png",
    icon: Icons.heart,
    color: "text-teal-500",
  },
  {
    title: "Radiology",
    doctors: "110 Doctors",
    image: "/specialties/radiology.png",
    icon: Icons.microscope,
    color: "text-slate-500",
  },
  {
    title: "Hematology",
    doctors: "56 Doctors",
    image: "/specialties/hematology.png",
    icon: Icons.heartPulse,
    color: "text-red-600",
  },
  {
    title: "Nephrology",
    doctors: "64 Doctors",
    image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=2070&auto=format&fit=crop", 
    icon: Icons.microscope,
    color: "text-blue-400",
  },

  {
    title: "Gynecology",
    doctors: "128 Doctors",
    image: "https://images.unsplash.com/photo-1579152276502-542301b70461?q=80&w=2070&auto=format&fit=crop", 
    icon: Icons.userPlus,
    color: "text-pink-600",
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
