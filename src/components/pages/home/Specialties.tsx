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

import { useGetAllSpecialtiesQuery } from "@/redux/features/specialties/specialtiesApi";
import { TSpecialty } from "@/types/specialty";

const Specialties = () => {
  const { data: specialtiesData, isLoading } = useGetAllSpecialtiesQuery({});
  const specialties = specialtiesData?.data || [];

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4 text-center">
           <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Icons.loader2 className="w-8 h-8 text-blue-600 animate-spin" />
           </div>
           <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic">Loading Specialties...</p>
        </div>
      </section>
    );
  }

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
              {specialties?.map((item: TSpecialty) => (
                <CarouselItem key={item?.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/6">
                  <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.icon || "/specialty-placeholder.png"}
                        alt={item.title}
                        width={500}
                        height={500}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      
                      <div className={cn(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform",
                        "bg-white"
                      )}>
                        <Icons.activity className={cn("w-8 h-8 text-blue-500")} />
                      </div>
                    </div>
                    
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest italic">
                         Explore Specialization
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
